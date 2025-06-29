import { useState, useEffect } from "react";
import "./Header.css";

export default function Header({
  displayedMovies,
  setMovies,
  handleSort,
  setSearchQuery,
  searchQuery,
  searchMoviesFromAPI,
  setActiveView,
}) {
  const [sort, setSort] = useState("name");

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchButton() {
    searchMoviesFromAPI();
  }
  function handleClearButton() {
    setSearchQuery("");
    setActiveView("nowPlaying");
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      searchMoviesFromAPI();
    }
  }

  function methodOfSort(event) {
    let sortedMovies = [...displayedMovies];
    if (event.target.value === "Name") {
      sortedMovies.sort((a, b) =>
        a.original_title.localeCompare(b.original_title)
      );
      setMovies(sortedMovies);
      setSort(event.target.value);
    } else if (event.target.value === "Vote") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sortedMovies);
      setSort(event.target.value);
    } else {
      sortedMovies.sort((a, b) => b.release_date.localeCompare(a.release_date));
      setMovies(sortedMovies);
      setSort(event.target.value);
    }
  }

  return (
    <>
      <header className="headerContainer">
        <h1>Flixster 🎥</h1>
        <div className="searchSort">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e)}
              placeholder="Search"
              className="searchBox"
              onKeyDown={(e) => {
                handleEnterKey(e);
              }}
            />
            <button className="searchButton" onClick={handleSearchButton}>
              Search
            </button>
            <button className="clearButton" onClick={handleClearButton}>
              Clear
            </button>
          </div>
          <select className="sort" onChange={methodOfSort} value={sort}>
            <option value="1">Sort by</option>
            <option value="Name">Name</option>
            <option value="Vote">Vote</option>
            <option value="Date">Date</option>
          </select>
        </div>
      </header>
    </>
  );
}
