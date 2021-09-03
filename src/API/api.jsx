export const baseURL = 'https://cinema-project-4fe82-default-rtdb.europe-west1.firebasedatabase.app';

const API_KEY = 'AIzaSyBL3MwQDKQZloIl6PeZsfWZ7T6TNoPuMi0';
const LOG_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

export const API = {
    login: (data) => {
        return fetch(LOG_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
    },
    post: (data , url ) => {
        return fetch(`${baseURL}/${url}` , {
            method: 'POST',
            body: data
        })
    },
    get: (url) => {
        return fetch(`${baseURL}/${url}`)
    },
    delete: (url , id) => {
        return fetch(`${baseURL}/${url}/${id}` , {
            method: 'DELETE'
        })
    },
    patch: (data , url , id) => {
        return fetch(`${baseURL}/${url}/${id}` , {
            method: 'PATCH',
            body: data
        })
    }
}