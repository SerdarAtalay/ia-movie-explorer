import React, { useEffect, useState } from 'react';
import { fetchMovies, Movie } from '../services/api';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('Pokemon');

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError('');
      try {
        //const data: Movie[] = [];
       const data = await fetchMovies(search);
        setMovies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Film Listesi</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Filmler için arama yapın..."
      />
      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 mb-2" />
            <h3 className="text-lg font-semibold">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;