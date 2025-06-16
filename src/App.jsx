import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./components/Sidebar.css"

// API Key and Bearer Token
const apiKey = import.meta.env.VITE_API_KEY;
const bearerToken = import.meta.env.VITE_BEARER_TOKEN;

const App = () => {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeView, setActiveView] = useState("nowPlaying");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [watchedMovies, setWatchedMovies] = useState(new Set());
  const [likedMovies, setLikedMovies] = useState(new Set());
  const [activeTab, setActiveTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // API URLs
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  const url_search = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // Fetch initial movies on load and when page changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();

        setMovies((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [page]);

  // Function to search movies from API
  const searchMoviesFromAPI = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(url_search, options);

      if (!response.ok) {
        throw new Error("Error fetching search results");
      }

      const data = await response.json();

      setSearchResults(data.results);
      setActiveView("search");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to switch to Now Playing view
  const showNowPlaying = () => {
    setActiveView("nowPlaying");
  };

  // Function to switch to Search view
  const showSearch = () => {
    if (searchResults.length > 0) {
      setActiveView("search");
    }
  };

  // Function to handle watched and unwatched toggles
  const handleWatchToggle = (movieId, event) => {
    event.stopPropagation();
    setWatchedMovies((prev) => {
      const newWatchedMovies = new Set(prev);
      if (newWatchedMovies.has(movieId)) {
        newWatchedMovies.delete(movieId);
      } else {
        newWatchedMovies.add(movieId);
      }
      return newWatchedMovies;
    });
  };

  // Function to handle liked and unliked toggles
  const handleLikeToggle = (movieId, event) => {
    event.stopPropagation();
    setLikedMovies((prev) => {
      const newLikedMovies = new Set(prev);
      if (newLikedMovies.has(movieId)) {
        newLikedMovies.delete(movieId);
      } else {
        newLikedMovies.add(movieId);
      }
      return newLikedMovies;
    });
  };

  // Filter movies based on active tab
  let displayedMovies = movies;
  if (activeTab === "watched") {
    displayedMovies = movies.filter((movie) => watchedMovies.has(movie.id));
  } else if (activeTab === "liked") {
    displayedMovies = movies.filter((movie) => likedMovies.has(movie.id));
  } else {
    displayedMovies = movies;
  }
  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="App">
      <div>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveTab={setActiveTab}
      />
      </div>
      <div className="mainBody">
      <header>
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchMoviesFromAPI={searchMoviesFromAPI}
          setActiveView={setActiveView}
          displayedMovies={displayedMovies}
          setMovies={setMovies}
        />
      </header>
      <main>
        <MovieList
          searchResults={searchResults}
          displayedMovies={displayedMovies}
          setPage={setPage}
          activeView={activeView}
          showNowPlaying={showNowPlaying}
          showSearch={showSearch}
          watchedMovies={watchedMovies}
          handleWatchToggle={handleWatchToggle}
          likedMovies={likedMovies}
          handleLikeToggle={handleLikeToggle}
        />
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default App;
