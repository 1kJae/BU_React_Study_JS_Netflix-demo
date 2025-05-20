import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import MovieCard from "../MovieCard/MovieCard";
import Indicators from "../Indicators/Indicators";
import responsive from "../../contents/responsive";
import "./MovieSlider.style.css";

const fetchMovies = async (endpoint) => {
  const TOKEN = process.env.REACT_APP_API_KEY;
  const url = `https://api.themoviedb.org/3${endpoint}?language=ko-KR&page=1`;
  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

function MovieSlider({ title, endpoint }) {
  const [active, setActive] = useState(0);  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", endpoint],
    queryFn: () => fetchMovies(endpoint),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)   return <Alert variant="danger">{error.message}</Alert>;
  if (!data?.results?.length) return null;

  return (
    <section className="movie-slide-wrapper">
      <h3 className="section-title">{title}</h3>

      <Carousel
        infinite
        centerMode
        containerClass="carousel-container"
        itemClass="movie-slider-item"
        responsive={responsive}
        afterChange={(prev, { currentSlide }) => setActive(currentSlide)}
      >
        {data.results.map((movie, idx) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                index={idx + 1}         
                slideIndex={idx}         
                activeIndex={active}       
                total={data.results.length}
            />
        ))}
      </Carousel>

      <Indicators
        total={data.results.length}
        current={active + 1}       
      />
    </section>
  );
}

export default MovieSlider;
