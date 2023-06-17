import './App.css';
import ReleaseCard from './ReleaseCard';
import data from './data/sample.json';
import Track from "./Track";
import {useState} from "react";

function App() {
  const [tracks, setTracks] = useState([]);

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
