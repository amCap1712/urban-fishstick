import {useEffect, useState} from "react";

function Player({token, trackId}) {
    const [deviceId, setDeviceId] = useState();

    useEffect(() => {
        if (!token) {
            return;
        }
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

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);
    }, [token]);

    useEffect(() => {
        if (!trackId) {
            return;
        }

        async function playTrack() {
            await fetch(
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
        }
        playTrack();
    }, [token, deviceId, trackId]);

}

export default Player;
