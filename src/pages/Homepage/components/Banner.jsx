import React from 'react'
import { usePopularMovieQuery } from '../../../hooks/usePopularMovies'

const Banner = () => {
    const { data } = usePopularMovieQuery();
    console.log("ddd", data?.data);
  return (
    <div>Banner</div>
  )
}

export default Banner