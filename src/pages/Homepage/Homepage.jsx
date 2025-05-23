import React, { Suspense } from 'react';
import Banner from './components/Banner/Banner';
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

function Homepage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Banner />
      <MovieSlider title="Popular Movies" endpoint="/movie/popular" />
      <MovieSlider title="Top Rated Movies" endpoint="/movie/top_rated" />
      <MovieSlider title="Upcoming Movies" endpoint="/movie/upcoming" />
    </Suspense>
  );
}
export default Homepage;
