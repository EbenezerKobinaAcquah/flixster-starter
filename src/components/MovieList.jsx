
import MovieCard from "./MovieCard";

export default function MovieList({
  searchResults,
  movies,
  setPage,
  activeView,
  showNowPlaying,
  showSearch
}) {
  const loadMore = () => {
    setPage(prev => prev + 1);

  };

  // Style for the active button
  const activeButtonStyle = {
    backgroundColor: "#e50914",
    color: "white",
    fontWeight: "bold"
  };

  // Style for the inactive button
  const inactiveButtonStyle = {
    backgroundColor: "#333",
    color: "white"
  };

  return (
    <>
      <div className="view-toggle" style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        margin: "20px 0",

      }}>
        <button
          onClick={showNowPlaying}
          style={activeView === "nowPlaying" ? activeButtonStyle : inactiveButtonStyle}
          className="nowPlayingToggle"
        >
          Now Playing
        </button>
        <button
          onClick={showSearch}
          style={activeView === "search" ? activeButtonStyle : inactiveButtonStyle}
          disabled={searchResults.length === 0}
          className="searchToggle"
        >
          Search
        </button>
      </div>

      <article>
        <div className="cardContainer">
          {(activeView === "search" ? searchResults : movies).map(movie => (
            <MovieCard
              key={movie.id}
              vote={movie.vote_average}
              title={movie.original_title}
              poster={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            />
          ))}
        </div>
        {activeView === "nowPlaying" && (
          <button onClick={loadMore}>Load More</button>

        )}
      </article>
    </>
  );
}
