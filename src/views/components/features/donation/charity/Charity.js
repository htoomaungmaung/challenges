// @flow
import React , { useState } from 'react';
import styled from 'styled-components';
import Payment from '../payment/Payment';

const maxWidth = 800;
const maxHeight = 450;
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 450px;
  font-family: "Arial";
  background-color: white;
  box-sizing: border-box;
  position: relative;
  img {
    position: absolute;
    height: 100%;
    width: auto;
    max-height: ${maxHeight}px;
    max-width: ${maxWidth}px
    @media all and (max-device-width: ${maxWidth}px) {
      height: 100%;
      width: auto;
      min-width: 300px;
      min-height: 169px;
      max-width: ${maxWidth}px;
      max-height: ${maxHeight}px;
    }
    @media all and (max-width: ${maxWidth}px) {
      height: auto;
      width: 100%;
      min-width: 300px;
      min-height: 169px;
      max-width: ${maxWidth}px;
      max-height: ${maxHeight}px;
    }
  }
  @media all  and (max-device-width: ${maxWidth}px)  {
    width: 100%;
    height: auto;
  }
  @media all  and (max-width: ${maxWidth}px)  {
    width: 100%;
    height: auto;
  }
`;
const CharityInfo = styled.div`
  display: flex;
  padding: 1em;
  align-items: center;
  justify-content: center;
  font-family: "Arial";
  box-sizing: border-box;
`;
const Div1 = styled.div`
  flex: 80%;
  padding: 0.4rem;
  box-sizing: border-box;
  font-size: 1rem;
  @media all and (max-device-width: ${maxWidth}px)  {
    font-size: 1.25rem;
  }
  @media all and (max-width: ${maxWidth}px)  {
    font-size: 1.25rem;
  } 
`;
const Div2 = styled.div`
  flex: 20%;
  padding: 0.4rem;
  box-sizing: border-box;
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
  float: right;
  &:hover{
    color: green;
  }
  @media all and (max-device-width: ${maxWidth}px) {
    margin: 0.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    font-size: 1.25rem;
  }
  @media all and (max-width: ${maxWidth}px) {
    margin: 0.5rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    font-size: 1.25rem;
  }
`;
type Props = {
  name: string,
  totalDonation: number,
  currency: string,
  name: any,
  charityId: string,
  paymentHandler: any,
  image: any
}

const Charity = (props: Props) => {
  const [donating, setDonating] = useState(false);
  const donateHandler = (event: any) => {
    console.log("clicked donate. state is",donating);
    setDonating(!donating)
  }
  return (
    <div>
      <ImgContainer>
        
        <img style={{ 'zIndex': donating ? '0': '2' }} src={`images/${props.image}`} />        
        <Payment
          paymentOptions={[10, 20, 50, 100, 500]}     
          paymentHandler={props.paymentHandler}
          charityId={props.charityId}
          currency={props.currency}
          closeHandler={donateHandler}
          donating={donating}
          />  
        
      </ImgContainer>
      <CharityInfo>
        <Div1>
          <p>{props.name}</p>
          {props.totalDonation > 0 ?           
          `${props.totalDonation} ${props.currency}`
          : '' }        
        </Div1>
        <Div2>
          <Button onClick={event=> donateHandler()} >Donate</Button>
        </Div2>
      </CharityInfo>
    </div>
  )
}

export default Charity;