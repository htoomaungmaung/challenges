// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
const maxWidth = 800;

const PaymentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: ${maxWidth}px;
  min-width: ${maxWidth}px;
  height: 100%;
  position: absolute;
  opacity: 0.9;
  z-index: 1;
  background-color: white;
  border-style: none;
  padding: 1rem;
  box-sizing: border-box;
  p{
    font-family: "Arial";
    font-size: 2rem;
    @media all and (max-device-width: ${maxWidth}px)  {
      font-size: 1.5rem;
    }
    @media all and (max-width: ${maxWidth}px)  {
      font-size: 1.5rem;
    } 
  }
  @media all  and (max-device-width: ${maxWidth}px)  {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    padding: 0.5rem;
  }
  @media all  and (max-width: ${maxWidth}px)  {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    padding: 0.5rem;
  }
`;
const PaymentOptions = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1rem;
  font-family: "Arial";
  box-sizing: border-box;  
  label{
    padding: 0.4rem;
  }
`;

const Button = styled.button`
  color: blue;
  border: 2px solid;
  background: transparent;
  font-size: 1rem;
  border-radius: 3px;
  margin: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  box-sizing: border-box;
  cursor: pointer;
  &:hover{
    color: green;
  }
  @media all and (max-device-width: ${maxWidth}px) {
    margin: 0.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  }
  @media all and (max-width: ${maxWidth}px) {
    margin: 0.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  }
`;
const CloseButton = styled.button`
  position: absolute
  right: 1rem;
  top: 2rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    color: red;
  }

`;
type Props = {
  paymentOptions: any,
  paymentHandler: any,
  charityId: string,
  currency: string,
  donating: boolean,
  closeHandler: any
}

type State = {
  selectedAmount: number
}

const Payment = (props: Props) => {
  const [selectedAmount, setSelectedAmount] = useState(10); 

  const amountChangeHandler = (event: any) => {
    const amount = event.target.value;
    setSelectedAmount(amount);
  }

  let paymentOptions;
  if(props.paymentOptions){
    paymentOptions = props.paymentOptions.map((amount, j) => (
      <label key={j}>
        <input
          type="radio"
          value={amount}
          onChange={amountChangeHandler}
          checked={selectedAmount == amount}
        />
        {amount}
      </label>
    ));
  }

  let closeButton;
  if(props.donating){
    closeButton = <CloseButton  onClick={event => props.closeHandler()}>x</CloseButton>
  }

  return (
    <PaymentContainer >
      {closeButton}
      <p>Select the amount to donate {props.currency} </p>
      <PaymentOptions>         
        {paymentOptions}          
      </PaymentOptions>
      <Button onClick={ event => props.paymentHandler(props.charityId, selectedAmount, props.currency)} >Pay</Button>
    </PaymentContainer>
  )
}

export default Payment;