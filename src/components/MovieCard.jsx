import LikeButton from "./LikeButton";
import WatchButton from "./Watched";

export default function MovieCard({ poster, title, vote, movieData, onClick, isWatched, onWatchToggle, isLiked, onLikeToggle }) {
    const handleMovieClick = () => {
        onClick(movieData);
    };

    return (
        <>
        <div className="movieCardContainer">
            <div className="movieCard" onClick={handleMovieClick}>
                <img src={poster} alt="Poster image" className="movieImage"/>
                <h2 className="movieTitle">{title}</h2>
                <p className="movieRating">Rating: {vote}</p>
                <div className="likeAndWatchButton">
<LikeButton isLiked={isLiked} onLikeToggle={onLikeToggle}/>
<WatchButton isWatched={isWatched} onWatchToggle={onWatchToggle}/>
</div>

            </div>
            </div>
        </>
    );
}
