const API_URL = "https://www.omdbapi.com/";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export enum MediaType {
    Movie = "movie",
    Series = "series",
    Episode = "episode",
}

export const fetchMovies = async (search: string, year?: number, type?: MediaType): Promise<Movie[]> => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  try {
    const url = `${API_URL}?s=${search}&apikey=${apiKey}${year ? `&y=${year}` : ''}${type ? `&type=${type}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Fetch Movies Error:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  try {
    const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${apiKey}&plot=full`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Fetch Movie Details Error:", error);
    throw error;
  }
};