import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import {notifyUser} from "../../actions/notifyActions";

import Alert from '../layout/Alert';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();

    const {firebase, notifyUser} = this.props;
    const {email, password} = this.state;

    firebase.login({
      email,
      password
    }).catch(err => {
      let message = err.code.split("auth/").pop();
      notifyUser(message, 'error');
    });
  }

  render() {
    const {email, password} = this.state;
    const {message, messageType} = this.props.notify;

    return (
      <div>
        <div className="card mt-4">
          <div className="card-header">
            <h1 className="text-center"><i className="fas fa-lock"/> Login</h1>
          </div>
          <div className="card-body">
            {message ? (
              <Alert message={message} messageType={messageType}></Alert>
            ) : null}

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email"><i className="fas fa-envelope"/> Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.onChange}
                  value={email}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"><i className="fas fa-key"/> Password</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={password}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success float-right">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify
  }), {notifyUser})
)(Login);