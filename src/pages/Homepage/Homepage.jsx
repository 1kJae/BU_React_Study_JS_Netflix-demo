import React from "react";
import Banner from "./components/Banner/Banner";
import MovieSlide from "./components/MovieSlide/MovieSlide";

const Homepage = () => (
  <div>
    <Banner />
    <MovieSlide title="Popular Movies" endpoint="/movie/popular" />
    <MovieSlide title="Top Rated Movies" endpoint="/movie/top_rated" />
    <MovieSlide title="Upcoming Movies" endpoint="/movie/upcoming" />
  </div>
);
export default Homepage;
