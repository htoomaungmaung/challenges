import React, { Component } from 'react';
import Donation from './containers/donation';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  componentDidMount () {
    console.log('app did mount');
  }

  render () {
    return (
      <div>
        <Donation/>
        <ToastContainer autoClose={5000} position={`top-center`} />
      </div>
    );
  }
}

export default App;
