import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { usePopularMovieQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'react-bootstrap';
import MovieCard from '../MovieCard/MovieCard';
import "./PopularMovieSlide.style.css"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,

  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

const PopularMovieSlide = () => {
    const {data, isLoading, isError, error} = usePopularMovieQuery()

    if(isLoading) {
        return <h1>Loading...</h1>;
    }
    if(isError) {
        return <Alert variant='danger'>{error.message}</Alert>;
    }

  return (
    <section className="movie-slide-wrapper">
      <h3 className="section-title">Popular Movies</h3>
      <Carousel
        infinite
        centerMode
        containerClass="carousel-container"
        itemClass="movie-slider-item"
        responsive={responsive}
      >
        {data.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Carousel>
    </section>
  );
};

export default PopularMovieSlide