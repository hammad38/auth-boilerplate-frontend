import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";
import {notifyUser} from "../../actions/notifyActions";

import Alert from '../layout/Alert';

class ForgotPassword extends Component {
  state = {
    email: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    const {firebase, notifyUser} = this.props;
    const {email} = this.state;

    firebase
      .auth().sendPasswordResetEmail(email)
      .then(res => {
        notifyUser(`Password reset link sent to: ${email}`, 'success');
      })
      .catch(err => {
        let message = err.code.split("auth/").pop();
        notifyUser(message, 'error');
      });
  }

  render() {
    const {email} = this.state;
    const {message, messageType} = this.props.notify;

    return (
      <div>
        <div className="card mt-4">
          <div className="card-header">
            <h1 className="text-center"><i className="fas fa-key"/> Reset Password</h1>
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

              <button type="submit" className="btn btn-primary float-right">Rest Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify
  }), {notifyUser})
)(ForgotPassword);