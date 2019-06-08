import React, { Component } from 'react';
import Donation from './containers/donation';

class App extends Component {
  componentDidMount () {
    console.log('app did mount');
  }

  render () {
    return (
      <div>
        <Donation/>
      </div>
    );
  }
}

export default App;
