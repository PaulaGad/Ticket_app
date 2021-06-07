import React, { useContext } from 'react';

import { StoreContext } from '../../../store/StoreProvider';
import { SELECT_SEAT } from '../../../store/actionTypes';

import SeatOutlook from '../SeatOutlook/SeatOutlook';
import { freeColor, reservedColor, selectedColor } from '../../Legend/Legend';

const SeatItemList = ({ id }) => {
  const { seats, dispatch } = useContext(StoreContext);
  
  const seat = seats.find(seat => seat.id === id);
  const { cords: { x, y }, reserved, selected } = seat;
  
  const handleSelectSeat = () => {
    try {
      dispatch({ type: SELECT_SEAT, payload: id });
      } catch (error){
        console.log(error);
      }
  };

  return (
    <SeatOutlook
      x={x}
      y={y}
      color={reserved ? reservedColor : (selected ? selectedColor : freeColor)}
      onClick={handleSelectSeat}
    />
  );
};
 
export default SeatItemList;