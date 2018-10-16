import React, { Component } from 'react';
import './App.scss';

import { Provider } from 'react-redux';
import store from './store';

import Spinner from './components/layout/Spinner';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          React App
          <Spinner/>
        </div>
      </Provider>
    );
  }
}

export default App;
