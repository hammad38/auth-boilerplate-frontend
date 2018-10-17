import React, {Component} from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="card mt-4">
          <div className="card-header">
            <h1 className="text-center"><i className="fas fa-lock"/> Login</h1>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="email"><i className="fas fa-envelope"/> Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"><i className="fas fa-key"/> Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
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

export default Login;