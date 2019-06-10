// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import Charity from './charity/Charity';

import {ComponentErrorBoundary as ErrorBoundary} from '../../../utils/errorBoundary';

// aspect ratio 16:9 + extra 20% for displaying info
const maxWidth = 800;
const minHeight = 540;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

const Card = styled.div`
  flex: 50%;
  margin: 2rem;
  max-width: ${maxWidth}px;
  min-width: ${maxWidth}px;
  min-height: ${minHeight};
  max-height: ${minHeight};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.26);
  border-radius: 5px;
  @media all and (max-device-width: ${maxWidth}px)  {
    width: 100%;
    height: auto;
    min-width: 400px;
    min-height: 281px;
  }
  @media all and (max-width: ${maxWidth}px)  {
    width: 100%;
    height: auto;
    min-width: 400px;
    min-height: 281px;
  }
`;

type charity = {
  name: string,
  totalDonation: number,
  currency: string,
  id: any,
  image: any
}

type Props = {
  charities: Array<charity>,
  paymentHandler: any,
  
}

const DonationList = (props: Props) => {
  let donationList; 
    if(props.charities){
      donationList = props.charities.map((item, i) => (
        <Card key={i}>        
              <ErrorBoundary>
                    <Charity 
                    charityId = {item.id}
                    name={item.name} 
                    totalDonation={item.totalDonation} 
                    currency={item.currency}
                    image={item.image}
                    paymentHandler={props.paymentHandler} />         
              </ErrorBoundary>
          </Card>
      ));
    }
    return (
      <Container>        
        {donationList}        
      </Container>
    );
}


export default DonationList;