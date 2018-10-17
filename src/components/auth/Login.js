import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';

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

    const {firebase} = this.props;
    const {email, password} = this.state;

    firebase.login({
      email,
      password
    }).catch(err => alert('Invalid login credentials!'));
  }

  render() {
    const {email, password} = this.state;

    return (
      <div>
        <div className="card mt-4">
          <div className="card-header">
            <h1 className="text-center"><i className="fas fa-lock"/> Login</h1>
          </div>
          <div className="card-body">
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
}

export default compose(
  firebaseConnect(),
  connect()
)(Login);