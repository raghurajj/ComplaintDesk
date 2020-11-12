import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route} from 'react-router-dom';
import Header from './components/Header';
import Complaint from './components/Complaint';
import PastComplaints from './components/PastComplaints';
import Login from './components/Login';
import Signup from './components/Signup';
import RegisterEmployee from './components/RegisterEmployee';
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import Activate from './components/Activate';
import Default from './components/Default';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/newcomplaint" component={Complaint} />
          <Route exact path="/pastcomplaints" component={PastComplaints} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/reset_password' component={ResetPassword} />
          <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
          <Route exact path='/activate/:uid/:token' component={Activate} />
          <Route component={Default} />
          
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
