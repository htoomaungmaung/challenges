import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

const maxWidth = 800;
const H1 = styled.div`
  font-family: Arial;
  font-size: 1.5rem;
  font-weith: bold;
  aligh-items: center;
  padding: 1rem;
  text-align: center;
  @media all and (max-device-width: ${maxWidth}px)  {
    font-size: 2.25rem;
  }
  @media all and (max-width: ${maxWidth}px)  {
    font-size: 2rem;
  } 
`;
class App extends Component {
  componentDidMount () {
    console.log('app did mount');
  }

  render () {
    return (
      <div>
        <H1>Omise Tamboon React</H1>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>        
        <ToastContainer autoClose={5000} position={`top-center`} />
      </div>
    );
  }
}

export default App;
