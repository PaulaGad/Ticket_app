import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import SeatOutlook from '../Seats/SeatOutlook/SeatOutlook';
import './styles.css';
import API from '../../api';
import { SELECT_SEAT } from '../../store/actionTypes';

export const freeColor = 'white';
export const reservedColor = 'darkblue';
export const selectedColor = 'darkorange';

const Legend = () => {
  const history = useHistory();
  const { seats, dispatch } = useContext(StoreContext);

  const legendSeats = [
    {
      id: "s00",
      color: freeColor,
      text: 'Miejsce dostępne'
    },
    {
      id: "s01",
      color: reservedColor,
      text: 'Miejsce zarezerwowane'
    },
    {
      id: "s02",
      color: selectedColor,
      text: 'Twój wybór'
    }
  ];

  const handleBookingClick = async () => {
    try {
      const selectedSeats = seats.filter(seat => seat.selected)
      console.log(selectedSeats)
      selectedSeats.forEach(seat => {
        const response = API.patch(`/seats/${seat.id}`, { ...seat, reserved: true });
        return  dispatch({type: SELECT_SEAT, payload: seat.id, ...response.data })
      })
    } catch (error) {
      console.warn(error);
    };
    history.push('/summary');
  };

  const legendList = legendSeats.map(seat => (
    <div className="seat-wrapper" key={seat.id}>
      <SeatOutlook className="legend-seat" color={seat.color}/><p className="legend-text">{seat.text}</p>
    </div>
  ));

  return (
    <div className="legend-wrapper">
      <div className="legend-seats" >
        {legendList}
      </div>
        <Button className="btnBooking" onClick={handleBookingClick}>Zarezerwuj</Button>
    </div>
  );
};
 
export default Legend;