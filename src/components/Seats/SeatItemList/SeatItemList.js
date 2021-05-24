import React, { useContext } from 'react';

import { StoreContext } from '../../../store/StoreProvider';

import SeatOutlook from '../SeatOutlook/SeatOutlook';
import { freeColor, reservedColor, selectedColor } from '../../Legend/Legend';
import API from '../../../api';
import { SELECT_SEAT } from '../../../store/actionTypes';

const SeatItemList = ({ id, cords: { x, y }, reserved, selected }) => {
  const { dispatch} = useContext(StoreContext);
  const seat = {
    id,
    cords: {x, y},
    reserved,
    selected: !selected
  };
  
  const handleSelectSeat = async () => {
    try {
      const response = await API.patch(`/seats/${id}`, seat);
      dispatch({type: SELECT_SEAT, payload: id, ...response.data });
    } catch (error) {
      console.warn(error);
    };
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