import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./Components/MovieList";
import Searchbar from "./Components/Searchbar";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTcyYmZlOTVhNDUyNmJkYjBjYThkNGNlNmVjMDY3MyIsInN1YiI6IjViMGVlNTc3MGUwYTI2M2U0YzAwMTE4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3x2UM6pYq17iM47ZMKLWxoW1m1Bp0hCBsGyPLygLkjE",
  },
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [default_page, setDefaultPage] = useState("1");

  // const MovieCallAPI = async () => {
  //   const APIURL =
  //     "https://api.themoviedb.org/3/discover/movie?sort_by=date.desc&api_key=04c35731a5ee918f014970082a0088b1&page=20";

  //   const response = await fetch(APIURL);
  //   const responseJSON = await response.json();

  //   // console.log(responseJSON);
  //   setMovies(responseJSON.results);
  // };

  const MovieCallAPI = async () => {
    // Now Playing APi on TMDB ----------------------------------------------------
    const APIURL =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=";
    const response = await fetch(APIURL + default_page.toString(), options);
    const responseJSON = await response.json();

    // console.log(responseJSON);
    setMovies(responseJSON.results);
  };

  const GetMovieSearch = async () => {
    // const SEARCHAPI =
    //   "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const SEARCHAPI_1 = "https://api.themoviedb.org/3/search/movie?query=";

    const SEARCHAPI_2 = "&include_adult=false&language=en-US&page=1";

    const response = await fetch(
      SEARCHAPI_1 + searchValue + SEARCHAPI_2,
      options
    );
    const responseJSON = await response.json();

    // console.log(SEARCHAPI_1 + searchValue + SEARCHAPI_2);
    setMovies(responseJSON.results);
  };

  const changeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue === "") {
      MovieCallAPI();
    } else {
      GetMovieSearch();
    }
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextPage = async () => {
    const APIURL =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=";
    const response = await fetch(
      APIURL + (parseInt(default_page) + 1).toString(),
      options
    );
    const responseJSON = await response.json();
    setDefaultPage((parseInt(default_page) + 1).toString());

    // console.log(APIURL + (parseInt(default_page) + 1).toString());
    setMovies(responseJSON.results);
  };

  const backPage = async () => {
    const APIURL =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=";
    if (parseInt(default_page) >= 2) {
      const response = await fetch(
        APIURL + (parseInt(default_page) - 1).toString(),
        options
      );
      const responseJSON = await response.json();
      setDefaultPage((parseInt(default_page) - 1).toString());

      // console.log(APIURL + (parseInt(default_page) - 1).toString());
      setMovies(responseJSON.results);
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="header-text">
        <span>WatchAll</span>
        <Searchbar searchValue={searchValue} onChange={changeSearch} />
      </div>
      <div className="pagination_row">
        <button onClick={backPage}>PEVIOUS PAGE</button>
        <span>{default_page}</span>
        <button onClick={nextPage}>NEXT PAGE</button>
      </div>

      <div className="container-fluid movie-row">
        <MovieList movies={movies} />
      </div>
    </>
  );
}

export default App;
