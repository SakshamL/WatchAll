import React from "react";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const languages = [
//   "hi",
//   "en",
//   "pa",
//   "ja",
//   "kn",
//   "sa",
//   "ml",
//   "bn",
//   "as",
//   "gu",
//   "ne",
//   "es",
//   "te",
//   "ko",
//   "ta",
//   "ur",
// ];

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => {
        if (
          movie.poster_path !== null &&
          (movie.original_language === "en" ||
            movie.original_language === "pa" ||
            movie.original_language === "ja" ||
            movie.original_language === "kn" ||
            movie.original_language === "sa" ||
            movie.original_language === "ml" ||
            movie.original_language === "bn" ||
            movie.original_language === "as" ||
            movie.original_language === "gu" ||
            movie.original_language === "ne" ||
            movie.original_language === "es" ||
            movie.original_language === "te" ||
            movie.original_language === "ko" ||
            movie.original_language === "ta" ||
            movie.original_language === "ur")
        ) {
          return (
            <div key={index} className="movie-block">
              <img src={IMGPATH + movie.poster_path} alt="movie"></img>
              <p className="movie-thumbnail-title">
                {movie.title}
                <br></br>
                <span>( {movie.release_date} )</span>
              </p>

              {/* <p>{movie.release_date}</p> */}
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
