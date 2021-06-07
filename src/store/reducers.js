import { FETCH_ALL_SEATS, SELECT_SEAT } from './actionTypes';

const seatsReducer = (seats = [], action) => {
  switch (action.type) {
    case FETCH_ALL_SEATS:
      return action.payload;
    case SELECT_SEAT:
      return seats.map(seat => {
        if (seat.id !== action.payload) {
          return seat;
        }
        return {
          ...seat,
          selected: !seat.selected,
        }
      })
    default:
      return seats;
    }
};

export default seatsReducer;