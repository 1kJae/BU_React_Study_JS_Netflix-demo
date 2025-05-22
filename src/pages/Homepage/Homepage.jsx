import React, { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import MovieSlider from "../../common/MovieSlider/MovieSlider";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import ErrorBoundary from "../../common/ErrorBoundary/ErrorBoundary";  
import ErrorMessage  from "../../common/ErrorMessage/ErrorMessage";    

function Homepage() {
  return (
    <>
      <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <Banner />
          <MovieSlider title="Popular Movies" endpoint="/movie/popular" />
          <MovieSlider title="Top Rated Movies" endpoint="/movie/top_rated" />
          <MovieSlider title="Upcoming Movies"  endpoint="/movie/upcoming" />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Homepage;
