import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';

import { Button, Checkbox, Form, InputNumber } from 'antd';
import API from '../../api/index';
import { CLEAR_SELECTION_SEATS, SELECT_SEAT } from '../../store/actionTypes';

const FormSeats = () => {
  const history = useHistory();
  const { seats, dispatch } = useContext(StoreContext);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [seatsTogether, setSeatsTogether] = useState(true);
  const seatsUnreserved = seats.filter(seat => seat.reserved === false);
  const numberOfavailableSeats = seats ? seatsUnreserved.length : 99;
  const seatsSelected = [];
  const seatsSelectedToClear = seats.filter(seat => seat.selected === true);

  // const handleClearAllSelectionSeats = async () => {
  //   seatsSelectedToClear.map(seat => {
  //     return dispatch({ type: CLEAR_SELECTION_SEATS, payload: seat.id })
  //   } )
  // };
  // const handleClearSelection = async (seat) => {
  //   try {
  //     await API.patch(`/seats/${seat.id}`);
  //     dispatch({ type: CLEAR_SELECTION_SEATS, payload: seat.id });
  //     } catch (error){
  //       console.log(error)
  //     }
  // };

  // if(seatsSelectedToClear.length) {
  //   handleClearAllSelectionSeats();
  // };
  
  const handleChangeCheckbox = () => setSeatsTogether(prevChecked => !prevChecked);

  const handleChangeInput = (e) => {
    setNumberOfSeats(Number(e.target.value));
  };

  const handleSumbit = async () => {
    if (numberOfSeats) {
      if (numberOfSeats > 0 && numberOfSeats <= 5) {
        handleSeatsTogether();
      } else if (numberOfSeats > 5) {
        await handleSeatsSeparately();
      } 
    }
    history.push('/seats');
  };

  const handleSeatsTogether = async () => { 
    for (let x = 0; x < 10; x++) {
      let n = 0;
      for (let y = 0; y < 15; y++) {
        const id = `s${x}${y}`;
        const seat = seatsUnreserved.find(seat => seat.id === id);
        if (seat) {
          n += 1;
          if (n === numberOfSeats) {
            try {
              const response = await API.patch(`/seats/${seat.id}`, {...seat, selected: true});
              dispatch({type: SELECT_SEAT, payload: id, ...response.data });
            } catch (error) {
              console.warn(error);
            };
          }
        }

      }
    }
  };

  const handleSeatsSeparately = async () => { 
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 15; y++) {
        const id = `s${x}${y}`;
        const seat = seatsUnreserved.find(seat => seat.id === id);
        if (seat) {
          try {
            seatsSelected.push(seat)
            const response = await API.patch(`/seats/${id}`, { ...seat, selected: true });
            dispatch({type: SELECT_SEAT, payload: id, ...response.data });
          } catch (error) {
            console.warn(error);
          };
          if (seatsSelected.length === numberOfSeats) {
            return;
          }
        }
      }
    }
    console.log("dziala")
  };

  const validateMessages = {
    required: 'To pole jest wymagane',
    types: {
      number: 'Liczba miejsc musi być liczbą',
    },
    number: {
      range: `Liczba miejsc musi być w przedziale od 1 do ${numberOfavailableSeats}`,
    },
  };

  return (
    <Form
      className="form-wrapper"
      // onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
      initialValues={{
        seatsTogether: true,
      }}
    >
      <Form.Item
        onChange={e => handleChangeInput(e)}
        label="Liczba miejsc"
        name="numberOfSeats"
        rules={[
          {
            required: true,
            type: 'number',
            min: 1,
            max: 100,
          },
        ]}
      >
        <InputNumber
          autoFocus
          min={1}
          max={numberOfavailableSeats}
          onChange={setNumberOfSeats}
          value={numberOfSeats}
          />
      </Form.Item>
      <Form.Item name="seatsTogether">
        <Checkbox checked={seatsTogether} onChange={handleChangeCheckbox}>Czy miejsca mają być obok siebie?</Checkbox>
      </Form.Item>
        <Button onClick={handleSumbit}>Wybierz miejsca</Button>
    </Form>
  );  
};
 
export default FormSeats;
