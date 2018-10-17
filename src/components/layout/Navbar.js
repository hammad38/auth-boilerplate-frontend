import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

class Navbar extends Component {
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

  onLogout = e => {
    e.preventDefault();
    const {firebase} = this.props;
    firebase.logout();
  }

  render() {
    const {isAuthenticated} = this.state;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Brand</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="#!" className="nav-link" onClick={this.onLogout}>Logout</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);