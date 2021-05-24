import React, { useContext } from 'react';

import { StoreContext } from '../../../store/StoreProvider';

import Legend from '../../Legend/Legend';
import SeatItemList from '../SeatItemList/SeatItemList';
import './styles.css';

const SeatList = () => {
  const { seats } = useContext(StoreContext);

  const seatsList = seats.map(seat => (
    <SeatItemList key={seat.id} {...seat} />
  ));
  console.log(seatsList)
  return (
    <div className="seats-page-wrapper">
      <div className="seats-container">
        {seatsList}
      </div>
      <Legend />
    </div>
  );
};
 
export default SeatList;
