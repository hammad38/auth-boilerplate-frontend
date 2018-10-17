import React, {Component} from 'react';

import Spinner from './Spinner';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Spinner/>
      </div>
    );
  }
}

export default Home;