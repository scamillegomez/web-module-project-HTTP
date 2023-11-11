import axios from "axios";

const baseURL = 'http://localhost:9000';
const moviesURL = baseURL + '/api/movies';

export const getMovies = () => {
    return (
        axios.get(moviesURL).then(res=>res.data)
    );
}

export const editMovie = (movie) => {
    return axios.put(`${moviesURL}/${movie.id}`, movie)
}

export const deleteMovie = (id) => {
    return axios.delete(`${moviesURL}/${id}`);
}