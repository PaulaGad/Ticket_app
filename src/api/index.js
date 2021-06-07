import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export default API;

export const fetchSeats = () => API.get('/seats');
