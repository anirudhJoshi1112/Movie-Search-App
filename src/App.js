import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "a1a68c71"; // Replace with your OMDB API key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Please enter a movie title.");
      return;
    }
    setError("");
    
    try {
      const response = await axios.get(API_URL + searchTerm);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || "No movies found.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Movie Search App 🎬</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
            <h3>{movie.Title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
