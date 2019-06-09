// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type, { Dispatch } from 'redux';
import {donationOperations} from '../../../state/modules/donation/donationIndex';
import DonationList from '../../components/features/donation/DonationList';
import styled from 'styled-components';

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

type charity = {
  name: string,
  totalDonation: number,
  currency: string,
  id: any
}

type Props={
  fetchCharities: any,
  fetchOverall: any,
  handlePay: any,
  totalAmount: number,
  currency: string,
  charities: Array<charity>

}

export const DonationPage = (props: Props) => {
  useEffect(() => {
    props.fetchCharities();
    props.fetchOverall();
  },[]);

  return (
    <div>
      <Header>          
        <p>Total amount raised: {props.totalAmount} {props.currency}</p>
      </Header>
      <DonationList
        charities={props.charities}
        paymentHandler={props.handlePay}
      />
    </div>
  )

}

const mapStateToProps = (state: any) => ({
  totalAmount : state.donation.totalAmount,
  currency : state.donation.currency,
  charities : state.donation.charities
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    handlePay: ( charityId: number, amount: number, currency: string ) => dispatch( donationOperations.handlePay( charityId, amount, currency)),
    fetchCharities: () => dispatch(donationOperations.fetchCharities()),
    fetchOverall: () => dispatch(donationOperations.fetchOverall()),

});

export default connect(mapStateToProps, mapDispatchToProps)(DonationPage);