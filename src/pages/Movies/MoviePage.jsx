import React, { useState, useMemo } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Spinner, Row, Col } from 'react-bootstrap';
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import FilterSidebar from "./components/FilterSidebar";
import SortDropdown from "./components/SortDropdown";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortKey, setSortKey] = useState("ratingDesc");

  const keyword = query.get("q") || "";
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genreList = [] } = useMovieGenreQuery();

  // ✅ useMemo는 무조건 컴포넌트 함수 본문 최상단에 있어야 함!
  const movies = data?.results ?? [];

  const filtered = useMemo(() => {
    if (selectedGenres.length === 0) return movies;
    return movies.filter(m =>
      m.genre_ids && selectedGenres.every(id => m.genre_ids.includes(id))
    );
  }, [movies, selectedGenres]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortKey) {
      case "ratingDesc": return arr.sort((a, b) => b.vote_average - a.vote_average);
      case "ratingAsc" : return arr.sort((a, b) => a.vote_average - b.vote_average);
      case "popularity": return arr.sort((a, b) => b.popularity - a.popularity);
      case "release"   : return arr.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      default: return arr;
    }
  }, [filtered, sortKey]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // ✅ 조건문은 useMemo 호출 이후에 해야 함
  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation='border' variant='danger' style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={3} xs={12} className="bg-dark text-light">
          <FilterSidebar
            genres={genreList}
            selected={selectedGenres}
            onToggle={(id) =>
              setSelectedGenres(prev =>
                prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
              )
            }
          />
        </Col>
        <Col lg={9} xs={12}>
          <SortDropdown value={sortKey} onChange={(k) => setSortKey(k)} />
          <Row>
            {sorted.map((movie, index) => (
              <Col key={index} lg={4} xs={12} className="mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
