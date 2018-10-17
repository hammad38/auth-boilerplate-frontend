import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {UserIsAuthenticated} from './helpers/auth';
import {UserIsNotAuthenticated} from './helpers/auth';

import './App.scss';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
