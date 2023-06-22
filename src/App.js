import './App.css';
import ReleaseCard from './ReleaseCard';
import Track from "./Track";
import {useEffect, useState} from "react";

//
function App() {
  const [releases, setReleases] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState();

  const token = "BQC0F1qnCPmwSQjnOtHzgZYRSVosEwsn1DNIhWnbzWl-OkQ2SG4HBdYEb8gewDg75eAIJDo1_PG_erfTzxeQMLqT-NFXGPOBP87_KSQCmpPjhpvtjA7Q6dYZ31UsOoLpg4olfszeiqz-Xp6aXodYhozuvdz8bwf0Jci7GsdZSS1FK7yWtxJxC_nR5WHgwPApW0Y563N5nIBa7aM";

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
                        <Track artist={item["artists"][0]["name"]} url={item["external_urls"]["spotify"]} id={item.id} preview_url={item.preview_url} duration_ms={item.duration_ms} name={item.name} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
