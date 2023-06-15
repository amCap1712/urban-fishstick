import './App.css';
import Card from './Card';
import data from './data/sample.json';

function App() {
  return (
    <div className="container">
      <div className="row">
        {data.map(item => (
            <div className="col-4" style={{marginBottom: "18px"}} key={item.id}>
              <Card album={item.album} artist={item.artist} image={item.image} url={item.url} id={item.id} />
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
