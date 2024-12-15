import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchMovies, Movie } from "../services/api";
import { PosterCellRenderer } from "../components/PosterCellRenderer";
import { ColDef } from "ag-grid-community";
import DisplayGrid from "../components/DisplayGrid";
import { useNavigate } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import TypeSelectMenu from "../components/TypeSelectMenu";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("Pokemon");
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<string>("");

  const [effectiveSearchQuery, setEffectiveSearchQuery] = useState<string>("Pokemon");
  const [effectiveYear, setEffectiveYear] = useState<string>("");
  const [effectiveType, setEffectiveType] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError("");
      try {
        //const data: Movie[] = dummyData;
        const data = await fetchMovies(effectiveSearchQuery, effectiveYear, effectiveType);
        setMovies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
}, [effectiveSearchQuery, effectiveYear, effectiveType]);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "",
        field: "Poster",
        cellRenderer: PosterCellRenderer,
        width: 100,
        resizable: true,
        sortable: false,
        filter: false,
      },
      {
        headerName: "Title",
        field: "Title",
        width: 200,
        resizable: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Year",
        field: "Year",
        width: 100,
        resizable: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Type",
        field: "Type",
        width: 100,
        resizable: true,
        sortable: true,
        filter: true,
      },
    ],
    []
  );

  const handleRowDoubleClick = useCallback(
    (data: Movie) => {
      navigate(`/movie/${data.imdbID}`);
    },
    [navigate]
  );

  const handleTypeSelect = useCallback((selectedType: { value: React.SetStateAction<string>; })=>{
    setType(selectedType.value);
  }, []);

  const handleSearchMovies = useCallback(() => {
    setEffectiveSearchQuery(searchQuery);
    setEffectiveYear(year);
    setEffectiveType(type);
  }, [searchQuery, year, type]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Movie Explorer</h2>

      <Toolbar>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Search a movie"
        />
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="border p-2 mb-4 w-full" placeholder="Year" />
        <TypeSelectMenu onTypeSelect={handleTypeSelect} />
        <button onClick={handleSearchMovies} className="bg-blue-500 text-white p-2 rounded">Search</button>

      </Toolbar>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <DisplayGrid
        rowData={movies}
        onDoubleClick={handleRowDoubleClick}
        columnDefs={columnDefs}
        gridApiRef={null}
        setSelectedRow={() => {}}
      />
    </div>
  );
};

export default MovieList;

const dummyData: Movie[] = [
    {
      Title: "Pokémon: Detective Pikachu",
      Year: "2019",
      imdbID: "tt5884052",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDU4Mzc3NzE5NV5BMl5BanBnXkFtZTgwMzE1NzI1NzM@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon",
      Year: "1997–2023",
      imdbID: "tt0168366",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMzE0ZDU1MzQtNTNlYS00YjNlLWE2ODktZmFmNDYzMTBlZTBmXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon: The First Movie - Mewtwo Strikes Back",
      Year: "1998",
      imdbID: "tt0190641",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDg0ZDk2N2QtZDQzYi00ZTljLWExODgtZWQ2Y2YzZTA1NjVjXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon the Movie 2000",
      Year: "1999",
      imdbID: "tt0210234",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOTE0NzY5MGUtZDdjMi00OTMyLThiYmEtOTc5NWY0NTE3NDA0XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon 3 the Movie: Spell of the Unown",
      Year: "2000",
      imdbID: "tt0235679",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTk0NzM3MDY1OV5BMl5BanBnXkFtZTYwNTkwODc5._V1_SX300.jpg",
    },
    {
      Title: "Pokemon 4Ever: Celebi - Voice of the Forest",
      Year: "2001",
      imdbID: "tt0287635",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNTFiNWM2ZTMtY2I1MS00Y2M1LWE5MTgtZTI5MTkxZGFiYzdhXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon the Movie: I Choose You!",
      Year: "2017",
      imdbID: "tt6595896",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTI5M2RmMWUtOGFlMC00M2YxLThiZjUtMjZkNjI3NWQ5NjkwXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon Heroes",
      Year: "2002",
      imdbID: "tt0347791",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWJlMGQxNDYtZTc5NC00MzlhLWI1MTItZmU1NjY1MTRlZjFjXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon: Mewtwo Strikes Back - Evolution",
      Year: "2019",
      imdbID: "tt8856470",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZDY0NmYyNmYtZDdjYy00M2IyLThiNjctZGYwN2EzNmIzN2I1XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      Title: "Pokémon: Lucario and the Mystery of Mew",
      Year: "2005",
      imdbID: "tt0875609",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTUxOTcwNjAwMl5BMl5BanBnXkFtZTgwMjc2MzQ2NjE@._V1_SX300.jpg",
    },
  ];