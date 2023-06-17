import './App.css';
import ReleaseCard from './ReleaseCard';
import data from './data/sample.json';
import Track from "./Track";
import {useEffect, useState} from "react";

//
function App() {
  const [tracks, setTracks] = useState([]);

  useEffect( () => {
      async function fetchData() {
          const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
              headers: {
                  "Authorization": "Bearer BQBCwr2DpC4UMMLVQjukXZaKvn22LTUKnf-lvkWXfIDwxuwBeSqbFkZJwJnPx53FOPXV7-hqyqFYvU6i0nRt6IxU70Qj9fQtGT5RTy3_0T_y4Xxljss-Fz6Ftuo0j70gaVDKg6pSJ5EevmGvqSHiKZW_RmFaeaxDWWhL4zMI_ed8UgIgSchWmoJWJLP0SHj6veXd3VGFNs41QHk"
              }
          });
          const albums = await response.json();
          console.log(albums);
      }
      fetchData();
  }, []);

  return (
    <div className="container">
        <div className="row">
            <div className="col-9">
                <div className="row">
                    {data.map(item => (
                        <div className="col-4" style={{marginBottom: "18px"}} key={item.id} onClick={() => setTracks(item["tracks"])}>
                            <ReleaseCard album={item.album} artist={item.artist} image={item.image} url={item.url} id={item.id} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-3">
                <div className="row">
                    {tracks.map(item => (
                        <Track artist={item.artist} url={item.url} id={item.id} preview_url={item.preview_url} duration_ms={item.duration_ms} name={item.name} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
