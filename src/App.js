import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route} from 'react-router-dom';
import Header from './components/Header';
import Complaint from './components/Complaint';
import PastComplaints from './components/PastComplaints';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import RegisterEmployee from './components/RegisterEmployee';
import Default from './components/Default';



function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/newcomplaint" component={Complaint} />
        <Route path="/pastcomplaints" component={PastComplaints} />
        <Route path="/login" component={Login} />
        <Route path="/uregister" component={RegisterUser} />
        <Route path="/eregister" component={RegisterEmployee} />
        <Route component={Default} />
        
      </Switch>
    </div>
  );
}

export default App;
