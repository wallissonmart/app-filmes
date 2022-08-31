import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const APIKey = 'e41caf202cf5b6e14bad4c5c6fad073f';

export default api;
