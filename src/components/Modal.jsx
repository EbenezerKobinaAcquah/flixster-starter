import { useState, useEffect } from "react";

export default function Modal({ movie, onClose}) {
    const [modalDetails, setModalDetails] = useState('')
  // Close modal when Escape key is pressed
  const apiKey = import.meta.env.VITE_API_KEY;
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;

  const urlModdal = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}language=en-US`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  };

  useEffect(() => {

    const fetchModalData = async () => {
      const response = await fetch(urlModdal, options);
      const data = await response.json();
      setModalDetails(data)
    }

    fetchModalData();

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

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
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>{movie.title || movie.original_title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title || movie.original_title}
            />
          </div>

          <div className="modal-details">
            <p><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Runtime:</strong> {modalDetails.id}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>

            {modalDetails.genres ? (
              <p>
                <strong>Genres:</strong> {modalDetails.genres.map(genre => genre.name).join(", ")}
              </p>
            ): <> <strong>Genres:</strong> <p>Genres:</p></>}
          </div>
        </div>
      </div>
    </div>
  );
}
