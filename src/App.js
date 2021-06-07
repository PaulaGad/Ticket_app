import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorPage from './components/ErrorPage/ErrorPage';
import FormSeats from './components/FormSeats/FormSeats';
import SeatList from './components/Seats/SeatList/SeatList';
import Summary from './components/Summary/Summary';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <main className="App-main">
          <Switch>
            <Route path="/" exact render={() => <FormSeats/>}/>
            <Route path="/seats" exact render={() => <SeatList />}/>
            <Route path="/summary" exact render={() => <Summary />}/>
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
