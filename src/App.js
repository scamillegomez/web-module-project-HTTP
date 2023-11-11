import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import AddMovieForm from "./components/AddMovieForm";
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import axios from 'axios';
import EditMovieForm from "./components/EditMovieForm";
import { getMovies } from "./actions/movies";

const App = (props) => {

  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    getData();
  }, [movies]);

  useEffect(()=>{
    if(movies){
      setFavoriteMovies(movies.filter(movie=> movie.favorite === true));
    }
  }, [movies])

  const getData = () => {
    getMovies()
      .then(res=>{
        setMovies(res);
      });
  }

  const deleteMovie = (id) => {
    setMovies(movies.filter(item=>(item.id !== Number(id))));
  }

  // const addToFavorites = (movie) => {
  //   setFavoriteMovies([...favoriteMovies,movie]);
  // }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies}/>}/>

            <Route path="/movies/add" element={<AddMovieForm setMovies={setMovies}/>}/>

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} setMovies={setMovies}/>}/>

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />

            <Route path=""/>
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
