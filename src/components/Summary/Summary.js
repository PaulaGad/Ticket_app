import React, { useContext } from 'react';

import { StoreContext } from '../../store/StoreProvider';
import './styles.css';

const Summary = () => {
  const { seats } = useContext(StoreContext);

  const selectedSeats = seats.filter(seat => seat.selected === true);
  const selectedSeatsLabel = selectedSeats.map(seat => {
    return <li key={seat.id}>rząd x{seat.cords.x}, miejsce y{seat.cords.y} ({seat.id})</li>});

  return (
    <div className='summary'>
      <h2>Twoja rezerwacja przebiegła pomyślnie!</h2>
      <h3>Wybrałeś miejsca:</h3>
      <ul>
        {selectedSeatsLabel}
      </ul>
      <h4 className='summary-text'>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h4>
    </div>
  );
};
 
export default Summary;