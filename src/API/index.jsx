import { API } from './api';
import { addNewMovie, addNewSnack, deleteMovieRoute, deleteSnackRoute, editMovieRoute, editSnackRoute, getMoviesRoute, getSnacksRoute } from './routes';

export const authLogin = (data) => {
    return API.login(JSON.stringify(data))
}

export const addNewMovieFunc = (data) => {
    return API.post(JSON.stringify(data) , `${addNewMovie}.json`)
}

export const getMovies = () => {
    return API.get(`${getMoviesRoute}.json`)
}

export const addNewSnackFunc = (data) => {
    return API.post(JSON.stringify(data) , `${addNewSnack}.json`)
}

export const getSnacks = () => {
    return API.get(`${getSnacksRoute}.json`)
} 

export const deleteMovieFunc = id => {
    return API.delete(`${deleteMovieRoute}` , `${id}.json`)
}

export const editMovieFunc = (data , id) => {
    return API.patch(JSON.stringify(data) , editMovieRoute , `${id}.json`)
}

export const editSnackFunc = (data , id) => {
    return API.patch(JSON.stringify(data) , editSnackRoute , `${id}.json`)
}

export const deleteSnackFunc = id => {
    return API.delete(`${deleteSnackRoute}` , `${id}.json`)
}