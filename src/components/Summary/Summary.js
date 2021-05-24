import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import './styles.css';

const Summary = () => {
  const history = useHistory();
  const { seats } = useContext(StoreContext);

  const handleBackToHomePage = () => {
    history.push('/');
  };

  const reservedSeats = seats.filter(seat => seat.reserved === true);

  const reservedSeatsMap = reservedSeats.map(seat => <p>rząd {seat.cords.x}, miejsce {seat.cords.y} ({seat.id})</p>)
  return (
    <div className='summary'>
    <h2>Twoja rezerwacja przebiegła pomyślnie!</h2>
    <h3>Wybrałeś miejsca:</h3>
      {reservedSeatsMap}
    <h4>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h4>
    <Button onClick={handleBackToHomePage} >Powrót do strony głównej</Button>
    </div>
  );
}
 
export default Summary;