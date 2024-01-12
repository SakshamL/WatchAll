import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import options from "./APIAuth";
import MovieList from "./Components/MovieList";
import MovieSearchList from "./Components/MovieSearchList";
import Searchbar from "./Components/Searchbar";

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
    // const SEARCHAPI_1 = "https://api.themoviedb.org/3/search/movie?query=";

    // const SEARCHAPI_2 = "&include_adult=false&language=en-US&page=1";

    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`;

    const response = await fetch(SEARCHAPI, options);
    const responseJSON = await response.json();

    if (responseJSON.results) {
      const array = responseJSON.results.sort((a, b) => {
        if (a.release_date > b.release_date) {
          return -1;
        }
        return true;
      });

      setMovies(array);
    } else {
      <>
        <h3>No Search Results</h3>;
      </>;
    }

    // console.log(SEARCHAPI_1 + searchValue + SEARCHAPI_2);
    // console.log(array);
    // setMovies(responseJSON.results);
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

  // UseEffect without dependency---------------------------
  useEffect(() => {
    // total_pages();
  }, []);

  const nextPage = async () => {
    const APIURL =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=";
    if (movies.length > 0) {
      const response = await fetch(
        APIURL + (parseInt(default_page) + 1).toString(),
        options
      );
      const responseJSON = await response.json();
      setDefaultPage((parseInt(default_page) + 1).toString());

      // console.log(APIURL + (parseInt(default_page) + 1).toString());
      setMovies(responseJSON.results);
    } else {
      return null;
    }
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

  // const total_pages = async () => {
  //   const APIURL =
  //     "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  //   const response = await fetch(APIURL, options);
  //   const responsetotalJSON = await response.json();

  //   // console.log(responseJSON.total_pages);
  // };

  return (
    <>
      <div className="header">
        <span className="logo">WatchAll</span>
        <Searchbar searchValue={searchValue} onChange={changeSearch} />
        <div className="menu">
          <ul>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>Genre</li>
            <li>All</li>
          </ul>
        </div>
      </div>

      <div className="row-heading">
        <hr></hr>
        <h4>Now Playing</h4>
        <hr></hr>
      </div>
      <div className="pagination_row">
        <button onClick={backPage}>PEVIOUS PAGE</button>
        <span>{default_page}</span>
        <button onClick={nextPage}>NEXT PAGE</button>
      </div>
      <div className="container-fluid movie-row">
        <MovieSearchList movies={movies} />
        <MovieList movies={movies} />
      </div>
    </>
  );
}

export default App;
