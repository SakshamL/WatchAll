import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./Components/MovieList";
import Searchbar from "./Components/Searchbar";

function App() {
  const [movies, setMovies] = useState([]);

  const MovieCallAPI = async () => {
    const APIURL =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=10";

    const response = await fetch(APIURL);
    const responseJSON = await response.json();

    // console.log(responseJSON);
    setMovies(responseJSON.results);
  };

  useEffect(() => {
    MovieCallAPI();
  }, []);

  return (
    <>
      <div className="header-text">
        <span>WatchAll</span>
        <Searchbar />
      </div>
      <div className="container-fluid movie-row">
        <MovieList movies={movies} />
      </div>
    </>
  );
}

export default App;
