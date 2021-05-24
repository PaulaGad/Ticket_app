import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  validateStatus: false,
});

export default API;

// const filters = '/seats/filters';
const seats = '/seats';

export const fetchSeats = () => API.get(seats);
export const clearSelectionOfSeats = (id, seat) => API.patch(`${seats}/${id}`, seat);
export const selectSeat = (id) => API.patch(`${seats}/${id}`);