import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  MovieDetails as MovieDetailsType,
} from "../services/api";
import PokeBallLoader from "../components/PokeBallLoader";

const MovieDetails: React.FC = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError("");
      try {
        if (imdbID) {
          const data = await fetchMovieDetails(imdbID);
          setMovie(data);
        } else {
          setError("Invalid movie ID");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [imdbID]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>
      <div className="min-h-[50vh] relative">

      {loading ? (
        <PokeBallLoader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : movie ? (
        <div className="flex flex-col md:flex-row">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full md:w-1/3 object-cover mb-4 md:mb-0 md:mr-4"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/48x64?text=No+Image";
            }}
          />
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-2">
              {movie.Title} ({movie.Year})
            </h2>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Writer:</strong> {movie.Writer}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Language:</strong> {movie.Language}
            </p>
            <p>
              <strong>Country:</strong> {movie.Country}
            </p>
            <p>
              <strong>Awards:</strong> {movie.Awards}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </p>
            <p>
              <strong>Metascore:</strong> {movie.Metascore}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.Runtime}
            </p>
          </div>
        </div>
      ) : (
        <p>Movie not found!</p>
      )}
    </div>
        </div>

  );
};

export default MovieDetails;
