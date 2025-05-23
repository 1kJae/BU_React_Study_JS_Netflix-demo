import React from 'react';
import './Banner.style.css';
import { usePopularMovieQuery } from '../../../../hooks/usePopularMovies';

const Banner = () => {
  const { data } = usePopularMovieQuery();
  const movie = data?.results?.[0];

  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="banner-dark-overlay" />
      <div className="banner-text-area">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
