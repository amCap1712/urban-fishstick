import './App.css';
import ReleaseCard from './ReleaseCard';
import Track from "./Track";
import {useEffect, useState} from "react";
import Player from "./Player";

//
function App() {
  const [releases, setReleases] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [selectedTrack, setSelectedTrack] = useState();

  const token = "BQDrvz4ck9mHz4QXAu3eLAZwdeNMBLBcGUeP-Gs8SgjwsjkrBsqz5HpcoRwT-xPh1VvxKmu_aLJmnuxppcpvDOzNQnEF9ryBewWkWgG1Q1ljWtX6ifOEz8d2JfV2sPH70hFSjquDS4XselgyVwxOH8_F3ya0L-G9RRnmrzJ9cez-9C0AoZY7rKNFtRTB15p_7_-44cnDHzKbP-5Ghcf1rXaJqbb25g";

  useEffect( () => {
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
  }, []);

  useEffect(() => {
      if (!selectedAlbum) {
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
  }, [selectedAlbum]);

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
                    <Player trackId={selectedTrack?.uri} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
