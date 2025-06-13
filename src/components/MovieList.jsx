
import { useState } from "react";
import MovieCard from "./MovieCard";
import Modal from "./Modal";


export default function MovieList({
  searchResults,
  movies,
  setPage,
  activeView,
  watchedMovies,
  handleWatchToggle,
  likedMovies,
  handleLikeToggle,
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  return (
    <>
      <article>
        <div className="cardContainer">
          {(activeView === "search" ? searchResults : movies).map((movie) => (
            <MovieCard
              key={movie.id}
              vote={movie.vote_average}
              title={movie.original_title}
              poster={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              movieData={movie}
              onClick={handleMovieClick}
              isWatched={watchedMovies.has(movie.id)}
              onWatchToggle={(event) => handleWatchToggle(movie.id, event)}
              isLiked={likedMovies.has(movie.id)}
              onLikeToggle={(event) => handleLikeToggle(movie.id, event)}

            />

          ))}

        </div>



      </article>
      <button onClick={loadMore} className="loadMoreButton">Load More</button>

      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal}  />
      )}


    </>
  );
}
