import React from "react";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => {
        if (movie.poster_path !== null) {
          return (
            <div key={index} className="movie-block">
              <img src={IMGPATH + movie.poster_path} alt="movie"></img>
              <p>{movie.title}</p>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default MovieList;
