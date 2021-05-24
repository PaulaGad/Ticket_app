import React, { createContext, useEffect, useReducer } from 'react';
import API from '../api/index';
import { FETCH_ALL_SEATS } from './actionTypes';
import seatsReducer from './reducers';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  // const history = useHistory();
  const [seats, dispatch] = useReducer(seatsReducer, []);
  
  const fetchData = async () => { 
    try {
    const { data } = await API.get('/seats');
    dispatch({ type: FETCH_ALL_SEATS, payload: data });
    } catch (error){
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={{
    seats,
    dispatch
    }}>
    {children}
    </StoreContext.Provider>
  );
};
 
export default StoreProvider;