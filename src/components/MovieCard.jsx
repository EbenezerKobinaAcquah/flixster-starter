export default function MovieCard({ poster, title, vote, movieData, onClick }) {
    const handleClick = () => {
        onClick(movieData);
    };

    return (
        <>
        <div className="movieCardContainer">
            <div className="movieCard" onClick={handleClick}>
                <img src={poster} alt="Poster image" className="movieImage"/>
                <h2 className="movieTitle">{title}</h2>
                <p className="movieRating">Rating: {vote}</p>
            </div>
            </div>
        </>
    );
}
