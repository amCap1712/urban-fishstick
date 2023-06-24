import {useEffect, useState} from "react";

function Player({trackId}) {
    const [deviceId, setDeviceId] = useState();
    const token = "BQDeuIc_PLBWOUXYHPnf8xEJiCBYCanJJxhtUSVRvXbPRfvx7Ua-J5xICbmUD5s0AIABcTdRu4RRdSpH-tEjCdBVawkGHIM1B2eifvSO9dkYl0bpKigOWIg5yNLbfoFzzmEHWn7sa3gzMkopyGe4PIMkIRAQX3k-fI91YtzI21fqVdP8mGpOEtxyBRmbcbjUElzjCF-RwCpfyA6G1GwTVdnpBehrEuJRslWt07Ah6vzYoRvJi1-74mdmKX9eXfW7oCIh3l61lL1rMyqDjIKZlrGclE4rlP-T";
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => {
                cb(token);
            },
            volume: 0.5
        });

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id);
        });

        player.connect();
    };

    useEffect(() => {
        if (!trackId) {
            return;
        }

        async function playTrack() {
            const response = await fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ uris: [trackId] }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            console.log(data);
        }
        playTrack();
    }, [deviceId, trackId]);

}

export default Player;
