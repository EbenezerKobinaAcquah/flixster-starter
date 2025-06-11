export default function MovieCard(movie) {
    return (
        <>
        <div className="movieCard">
            <img src={movie.poster} alt= "Poster image" />
            <h2>{movie.title}</h2>
            <p>{movie.vote}</p>
            </div>
        </>

    )
}
