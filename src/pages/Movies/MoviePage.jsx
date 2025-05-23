import React, { useEffect, useState } from 'react';
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import MovieCard from '../../common/MovieCard/MovieCard';
import FilterSidebar from './components/FilterSidebar';
import { fetchDiscoveredMovies } from '../../utils/api';
import api from '../../utils/api';
import "./MoviePage.style.css";

const sortKeyMap = {
  ratingDesc: 'vote_average.desc',
  ratingAsc: 'vote_average.asc',
  popularity: 'popularity.desc',
  release: 'release_date.desc',
};

function MoviePage() {
  const [query] = useSearchParams();
  const keyword = query.get('q') || ''; 

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortKey, setSortKey] = useState('ratingDesc');
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { data: genreList = [] } = useMovieGenreQuery();

  useEffect(() => {
  const load = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      let res;
      if (keyword) {
        res = await api.get(
          `/search/movie?query=${encodeURIComponent(keyword)}&page=${page}&language=ko-KR`
        );
      } else {
        res = await fetchDiscoveredMovies(
          page,
          selectedGenres,
          sortKeyMap[sortKey]
        );
      }
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      setFetchError(err);
    } finally {
      setIsLoading(false);
    }
  };
  load();
}, [keyword, page, selectedGenres, sortKey]);

  const handleToggleGenre = (id) => {
    setPage(1); 
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleSortChange = (key) => {
    setPage(1);
    setSortKey(key);
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  if (fetchError) return <Alert variant="danger">{fetchError.message}</Alert>;

  return (
    <Container fluid>
      <Row>
        <Col lg={3} xs={12} className="bg-dark text-light">
          <FilterSidebar
            genres={genreList}
            selected={selectedGenres}
            onToggle={handleToggleGenre}
            sortKey={sortKey}
            onSortChange={handleSortChange}
          />
        </Col>

        <Col lg={9} xs={12}>
          <Row className="g-3 py-3">
            {movies.map((movie) => (
              <Col key={movie.id} xs={6} md={4} lg={3} xl={2}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center align-items-center my-4 flex-wrap gap-2">
            {page > 1 && (
              <>
                <button className="btn btn-light" onClick={() => setPage(1)}>≪</button>
                <button className="btn btn-light" onClick={() => setPage(page - 1)}>＜</button>
              </>
            )}

            <ReactPaginate
              pageCount={totalPages}            
              pageRangeDisplayed={7}
              marginPagesDisplayed={0}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName="pagination m-0"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousLabel={null}
              nextLabel={null}
              breakLabel="…"
            />

            {page < totalPages && (
              <>
                <button className="btn btn-light" onClick={() => setPage(page + 1)}>＞</button>
                <button className="btn btn-light" onClick={() => setPage(totalPages)}>≫</button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MoviePage;
