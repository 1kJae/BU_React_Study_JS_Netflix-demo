import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../MovieCard/MovieCard";
import "../PopularMovieSlide/PopularMovieSlide.style.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
  tablet:  { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile:  { breakpoint: { max: 464,  min: 0   }, items: 1 },
};

const fetchMovies = async (endpoint) => {
 const TOKEN = process.env.REACT_APP_API_KEY;
 const url = `https://api.themoviedb.org/3${endpoint}?language=ko-KR&page=1`;
 const { data } = await axios.get(url, {
   headers: { Authorization: `Bearer ${TOKEN}` },
 });
  return data;
};

function MovieSlide({ title, endpoint }) {
  const { data, isLoading, isError, error } = useQuery({
   queryKey: ['movies', endpoint],
   queryFn:  () => fetchMovies(endpoint),
 });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)   return <Alert variant="danger">{error.message}</Alert>;
  if (!data || !data.results) return null;  
  return (
    <section className="movie-slide-wrapper">
      <h3 className="section-title">{title}</h3>
      <Carousel
        infinite
        centerMode
        containerClass="carousel-container"
        itemClass="movie-slider-item"
        responsive={responsive}
      >
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Carousel>
    </section>
  );
}

export default MovieSlide;
