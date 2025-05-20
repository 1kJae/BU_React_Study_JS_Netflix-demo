import React from "react";
import Banner from "./components/Banner/Banner";
import MovieSlider from "../../common/MovieSlider/MovieSlider";

function Homepage() {
  return (
    <>
      <Banner />
      <MovieSlider title="Popular Movies" endpoint="/movie/popular" />
      <MovieSlider title="Top Rated Movies" endpoint="/movie/top_rated" />
      <MovieSlider title="Upcoming Movies"  endpoint="/movie/upcoming" />
    </>
  );
}

export default Homepage;
