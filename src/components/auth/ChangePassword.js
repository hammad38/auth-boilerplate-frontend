import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";
import {notifyUser} from "../../actions/notifyActions";

import Alert from '../layout/Alert';

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    const {auth, firebase, notifyUser} = this.props;
    const {oldPassword, newPassword, confirmPassword} = this.state;

    if(newPassword === confirmPassword) {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        auth.email,
        oldPassword
      );


      /*re-authenticate user with credentials*/
      user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        /*update new password in firebase*/
        user.updatePassword(newPassword).then(function() {
          notifyUser('Password updated successfully!', 'success');
        }).catch(err => {
          let message = err.code.split("auth/").pop();
          notifyUser(message, 'error');
        });

      }).catch(err => {
        notifyUser('Incorrect old password!', 'error');
      });

    } else {
      notifyUser('New Password & Repeat Password doesn\'t match!', 'error');
    }

  }

  render() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
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
                <label htmlFor="oldPassword"><i className="fas fa-key"/> Old Password</label>
                <input
                  className="form-control"
                  name="oldPassword"
                  type="password"
                  placeholder="Enter Old Password"
                  onChange={this.onChange}
                  value={oldPassword}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword"><i className="fas fa-key"/> New Password</label>
                <input
                  className="form-control"
                  name="newPassword"
                  type="password"
                  placeholder="Enter New Password"
                  onChange={this.onChange}
                  value={newPassword}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword"><i className="fas fa-key"/> Repeat Password</label>
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat Password"
                  onChange={this.onChange}
                  value={confirmPassword}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary float-right">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    notify: state.notify
  }), {notifyUser})
)(ChangePassword);