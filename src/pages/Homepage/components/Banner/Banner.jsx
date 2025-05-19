import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { Spinner } from 'react-bootstrap'
import { usePopularMovieQuery } from '../../../../hooks/usePopularMovies'
import "./Banner.style.css"

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMovieQuery();
    console.log("data", data);

    if(isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if(isError) {
      return (
        <Alert variant='danger'>{error.message}</Alert>
      );
    }


  return (
    <div style={{
      backgroundImage:
      "url("+
      `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path}`
      +")",
    }} 
    className='banner'
    >
      <div className='text-white banner-text-area'>
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner