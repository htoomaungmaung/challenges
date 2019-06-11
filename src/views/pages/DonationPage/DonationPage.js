// @flow
import React, { useEffect } from 'react';
import {donationOperations} from '../../../state/modules/donation/donationIndex';
import DonationList from '../../components/features/donation/DonationList';
import {PageErrorBoundary as ErrorBoundary} from '../../utils/errorBoundary';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";

const maxWidth = 800;
const Header = styled.div`
  font-family: "Arial";
  font-size: 1.5rem;
  text-align: center;
  @media all and (max-device-width: ${maxWidth}px)  {
    font-size: 2rem;
  }
  @media all and (max-width: ${maxWidth}px)  {
    font-size: 2rem;
  }
`;

const DonationPage = () => {

  const totalAmount = useSelector(state =>  state.donation.totalAmount);
  const currency = useSelector(state => state.donation.currency);
  const charities = useSelector(state => state.donation.charities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(donationOperations.fetchCharities());
    dispatch(donationOperations.fetchOverall())
  },[]);

  const handlePay = ( charityId: number, amount: number, currency: string ) => { 
    dispatch( donationOperations.handlePay( charityId, amount, currency));
  }

  return (
    <ErrorBoundary>
      <Header>          
        <p>Total amount raised: {totalAmount} {currency}</p>
      </Header>
      <DonationList
        charities={charities}
        paymentHandler={handlePay}
      />
    </ErrorBoundary>
  )

}

export default DonationPage;