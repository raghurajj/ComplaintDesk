import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route} from 'react-router-dom';
import Header from './components/Header';
import Complaint from './components/Complaint';
import PastComplaints from './components/PastComplaints';




function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/newcomplaint" component={Complaint} />
        <Route path="/pastcomplaints" component={PastComplaints} />
      </Switch>
    </div>
  );
}

export default App;
