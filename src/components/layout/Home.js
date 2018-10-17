import React, {Component} from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

import Spinner from './Spinner';

class Home extends Component {
  state = {
    isAuthenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    const {auth} = props;

    if(auth.uid) {
      return {isAuthenticated: true}
    } else {
      return {isAuthenticated: false}
    }
  }

  render() {
    const {isAuthenticated} = this.state;

    return (
      <div>
        {isAuthenticated ? (
          <h1>Home Page Admin</h1>
        ) : (
          <h1>Home Page Anonymous</h1>
        )}
        <Spinner/>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Home);