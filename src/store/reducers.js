// import * as api from '../api';
import { FETCH_ALL_SEATS, SELECT_SEAT, CLEAR_SELECTION_SEATS } from './actionTypes';

const seatsReducer = (seats = [], action) => {
 switch (action.type) {
  case FETCH_ALL_SEATS:
    return action.payload;
  case SELECT_SEAT:
    return seats.map(seat => {
      if (seat.id !== action.payload) {
        return seat
      }
      return {
        ...action.payload.seat
      }
    })
  case CLEAR_SELECTION_SEATS:
    return seats.map(seat => {
      if (seat.id !== action.payload.id) {
        return seat
      }
      return {
        ...seat, selected: true
      }
    })
  default:
    return seats;
  }
};

export default seatsReducer;