import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { AiFillStar } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

//const GENRE = { 28: "Action", 35: "Comedy", 12: "Adventure" };

function MovieCard({ movie, index, slideIndex, activeIndex, total }) {
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if(!genreData) return []
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  }

  const [show, setShow] = useState(false);
  const isHoverable = window.matchMedia("(hover: hover)").matches;

  useEffect(() => {
    if (slideIndex !== activeIndex) setShow(false);
  }, [activeIndex, slideIndex]); 

  const handleClick = () => {
    if (!isHoverable) setShow((p) => !p);
  };

  const posterUrl =
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;

  return (
    <div
      className="movie-card"
      style={{ backgroundImage: `url(${posterUrl})` }}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div
        className={`overlay ${show ? "show" : ""}`}
        onClick={handleClick}
      >
        <div className="overlay-header">
          <h5 className="movie-title">{movie.title}</h5>
          <hr />
          <div className="badge-wrap">
            {showGenre(movie.genre_ids).slice(0, 3).map((name) => (
              <Badge bg="danger" key={name}>
                {name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="overlay-footer">
          <span><AiFillStar /> {movie.vote_average.toFixed(1)}</span>
          <span><BsPeopleFill /> {Math.round(movie.popularity)}</span>
          <span className={movie.adult ? "adult" : "under18"}>
            {movie.adult ? "Over 18" : "Under 18"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
