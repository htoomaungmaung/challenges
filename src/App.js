import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Donation from './views/pages/DonationPage/DonationPage';

class App extends Component {

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
