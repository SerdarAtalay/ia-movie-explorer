import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchMovies, Movie } from "../services/api";
import { CombinedCellRenderer } from "../components/CellRenderer";
import { ColDef } from "ag-grid-community";
import DisplayGrid from "../components/DisplayGrid";
import { useNavigate, useSearchParams } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import TypeSelectMenu from "../components/TypeSelectMenu";

const MovieList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const effectiveSearchQuery = searchParams.get("search") || "Pokemon";
  const effectiveYear = searchParams.get("year") || "";
  const effectiveType = searchParams.get("type") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const [searchQuery, setSearchQuery] = useState<string>(effectiveSearchQuery);
  const [year, setYear] = useState<string>(effectiveYear);
  const [type, setType] = useState<string>(effectiveType);
  
  const [totalResults, setTotalResults] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchMovies(
          effectiveSearchQuery,
          effectiveYear,
          effectiveType,
          currentPage
        );
        setMovies(data.movies);
        setTotalResults(data.totalResults);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [effectiveSearchQuery, effectiveYear, effectiveType, currentPage]);

  useEffect(() => {
    setSearchQuery(effectiveSearchQuery);
    setYear(effectiveYear);
    setType(effectiveType);
  }, [effectiveSearchQuery, effectiveYear, effectiveType]);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Title",
        field: "Title",
        cellRenderer: CombinedCellRenderer,
        width: 420,
        flex: 1,
        resizable: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Year",
        field: "Year",
        width: 160,
        resizable: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Type",
        field: "Type",
        width: 160,
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

  const handleTypeSelect = useCallback(
    (selectedType: { value: React.SetStateAction<string> }) => {
      setType(selectedType.value);
    },
    []
  );

  const handleSearchMovies = useCallback(() => {
    setSearchParams({
      search: searchQuery,
      ...(year && { year }),
      ...(type && { type }),
      page: "1",
    });
  }, [searchQuery, year, type, setSearchParams]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setSearchParams({
        search: searchQuery,
        year,
        type,
        page: newPage.toString(),
      });
    }
  }, [currentPage, searchQuery, year, type, setSearchParams]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setSearchParams({
        search: searchQuery,
        year,
        type,
        page: newPage.toString(),
      });
    }
  }, [currentPage, totalPages, searchQuery, year, type, setSearchParams]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Movie Explorer</h2>

      <Toolbar className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 m-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-md"
          placeholder="Search a movie"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-full rounded-md"
          placeholder="Year"
        />
        <TypeSelectMenu onTypeSelect={handleTypeSelect} />
        <button
          onClick={handleSearchMovies}
          className="bg-blue-500 dark:bg-blue-900 border-gray-300 text-white p-2 rounded-md"
        >
          Search
        </button>
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
      {totalResults > 10 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded border border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
