import { useState, useEffect } from "react";
import WatchButton from "./Watched";
import "./Modal.css";

export default function Modal({ movie, onClose }) {
  const [modalDetails, setModalDetails] = useState("");
  const [trailerDetails, setTrailerDetails] = useState("");
  const [keys, setKeys] = useState("");
  // Close modal when Escape key is pressed
  const apiKey = import.meta.env.VITE_API_KEY;
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;

  const urlModal = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}language=en-US`;
  const urlTrailer = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  useEffect(() => {
    const fetchModalData = async () => {
      const response = await fetch(urlModal, options);
      const data = await response.json();
      setModalDetails(data);
    };

    fetchModalData();

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const fetchTrailerData = async (movieId) => {
      const response = await fetch(urlTrailer, options);
      const data = await response.json();
      setTrailerDetails(data);
      console.log("this is data for my trailer", data);
      const moviesWithTrailers = data.results.filter(
        (movie) => movie.type === "Trailer"
      );
      const firstTrailerKey = moviesWithTrailers[0].key;
      setKeys(firstTrailerKey);
    };
    fetchTrailerData(movie.id);

    document.addEventListener("keydown", handleEscKey);

    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Handle click outside the modal content to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!movie) return null;

  return (
    <div className="modalBackdrop" onClick={handleBackdropClick}>
      <div className="modalContent">
        <button className="modalClose" onClick={onClose}>×</button>

        <div className="modalHeader">
          <h2>{movie.original_title}</h2>
        </div>

        <div className="modalBody">
          <div className="modalPoster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
            />
          </div>

          <div className="modalDetails">
            <p>
              <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count}{" "}
              votes)
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Runtime:</strong> {modalDetails.id}
            </p>
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>

            {modalDetails.genres ? (
              <p>
                <strong>Genres:</strong>{" "}
                {modalDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
            ) : (
              <>
                {" "}
                <strong>Genres:</strong> <p>Genres:</p>
              </>
            )}
          </div>
          <div className="trailer">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${keys}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
