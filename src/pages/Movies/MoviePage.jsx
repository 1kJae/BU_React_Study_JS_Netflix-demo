import React, { useState, useMemo, useEffect } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Spinner, Row, Col } from 'react-bootstrap';
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import FilterSidebar from "./components/FilterSidebar";
import SortDropdown from "./components/SortDropdown";
import { fetchDiscoveredMovies } from '../api/api';

const sortKeyMap = {
  ratingDesc: 'vote_average.desc',
  ratingAsc: 'vote_average.asc',
  popularity: 'popularity.desc',
  release: 'release_date.desc',
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetchDiscoveredMovies(page, selectedGenres, sortKeyMap[sortKey]);
      setMovies(response.data.results);
      setTotal(response.data.total_pages);
    } catch (err) {
      console.error("영화 데이터를 불러오는 중 오류 발생:", err);
    }
  };
  fetchData();
}, [page, selectedGenres, sortKey]);

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortKey, setSortKey] = useState("ratingDesc");

  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(1);

  const keyword = query.get("q") || "";
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genreList = [] } = useMovieGenreQuery();

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
          <FilterSidebar
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
            sortKey={sortKey}
            onSortChange={handleSortChange}
          />
          <Row>
            {movies.map(movie => (
              <Col key={movie.id} xs={6} md={3} lg={2}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center my-4">
            {page>1 && (
              <>
                <button className="btn btn-light me-1" onClick={()=>setPage(1)}>≪</button>
                <button className="btn btn-light me-3" onClick={()=>setPage(page-1)}>＜</button>
              </>
            )}

            <ReactPaginate
              pageCount={total}
              pageRangeDisplayed={7}      /* 현재±3 */
              marginPagesDisplayed={0}
              onPageChange={({selected})=>setPage(selected+1)}
              forcePage={page-1}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousLabel={null}
              nextLabel={null}
              breakLabel="…"
            />

            {page<total && (
              <>
                <button className="btn btn-light ms-3" onClick={()=>setPage(page+1)}>＞</button>
                <button className="btn btn-light ms-1" onClick={()=>setPage(total)}>≫</button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
