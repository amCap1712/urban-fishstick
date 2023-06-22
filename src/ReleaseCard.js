function ReleaseCard({album, artist, image, url, id}) {
    return (
        <div className="card" style={{width: "18rem", height: "100%"}}>
            <img src={image} className="card-img-top" alt={`Album art of ${album}`}/>
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title">{album}</h5>
                    <p className="card-text">{artist}</p>
                </div>
                <a href={url} className="btn btn-primary">Listen on Spotify</a>
            </div>
        </div>
    );
}

export default ReleaseCard;
