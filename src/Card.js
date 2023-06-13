function Card({track, artist, image, url, id}) {
    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={image} className="card-img-top" alt={`Album art of ${track}`}/>
            <div className="card-body">
                <h5 className="card-title">{track}</h5>
                <p className="card-text">{artist}</p>
                <a href={url} className="btn btn-primary">Listen on Spotify</a>
            </div>
        </div>
    );
}

export default Card;
