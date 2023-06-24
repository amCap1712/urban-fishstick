import {useEffect, useState} from "react";
import ReleaseCard from "./ReleaseCard";
import Track from "./Track";
import Player from "./Player";

function Main({token}) {
    const [releases, setReleases] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [selectedTrack, setSelectedTrack] = useState();

    useEffect( () => {
        if (!token) {
            return;
        }
        async function fetchData() {
            const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            const albums = data["albums"]["items"];
            setReleases(albums);
        }
        fetchData();
    }, [token]);

    useEffect(() => {
        if (!selectedAlbum || !token) {
            return;
        }

        async function fetchData() {
            const albumId = selectedAlbum.id;
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            const tracks = data["items"];
            setTracks(tracks);
        }
        fetchData();
    }, [token, selectedAlbum]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <div className="row d-flex flex-wrap">
                        {releases.map(item => (
                            <div className="col-4" style={{marginBottom: "18px"}} key={item.id} onClick={() => setSelectedAlbum(item)}>
                                <ReleaseCard album={item.name} artist={item["artists"][0]["name"]} image={item.images[0]["url"]} url={item["external_urls"]["spotify"]} id={item.id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-3">
                    <div className="row">
                        {tracks.map(item => (
                            <div onClick={() => setSelectedTrack(item)}>
                                <Track artist={item["artists"][0]["name"]} url={item["external_urls"]["spotify"]} id={item.id} preview_url={item.preview_url} duration_ms={item.duration_ms} name={item.name} />
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <Player token={token} trackId={selectedTrack?.uri} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
