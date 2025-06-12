
import { useState } from "react";
import MovieCard from "./MovieCard";
import Modal from "./Modal";


export default function MovieList({
  searchResults,
  movies,
  setPage,
  activeView
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
            />
          ))}
        </div>
        {activeView === "nowPlaying" && (
          <button onClick={loadMore} className="loadMoreButton">Load More</button>
        )}
      </article>

      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal} />
      )}


    </>
  );
}
