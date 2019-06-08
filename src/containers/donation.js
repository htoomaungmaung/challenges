import React, {Component} from 'react';
import { connect } from 'react-redux';
import {donationOperations} from '../state/modules/donation/donationIndex';
import styled from 'styled-components';

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;


class Donation extends Component {
  state = {
    selectedAmount: 10,
    currency: 'THB',
  }



  componentDidMount() {
    console.log('component did mount and fetching charities');
    this.props.fetchCharities();
    this.props.fetchOverall();
  }

  render() {
    const paymentHandler = (id, currency) => {
      console.log(id+','+currency+','+this.state.selectedAmount);
      this.props.handlePay(id,this.state.selectedAmount,currency);
    }
    const amountChangeHandler = (event) => {
      const amount = event.target.value;
      this.setState({selectedAmount: amount});
    }
    const cards = this.props.charities.map(function(item, i) {
      const payments = [10, 20, 50, 100, 500].map((amount, j) => (
        <label key={j}>
          <input
            type="radio"
            name={item.name}
            value={amount}
            onChange={amountChangeHandler}
          />
          {amount}
        </label>

      ));
      return (
        <Card key={i}>
          <p>{item.name}</p>
          {payments}
          <button onClick={ event => paymentHandler(item.id,item.currency)} >Pay</button>
        </Card>
      );
    });

    const style = {
      color: 'red',
      margin: '1em 0',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
    };

    return (
      <div>
        <h1>Tamboon React</h1>
        <p>All donations: {this.props.totalAmount}</p>
        <p style={style}>{this.props.message}</p>
        {cards}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { totalAmount, message, charities } = state.donation;
  return {
    totalAmount, message, charities,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlePay: ( id, amount, currency ) => dispatch( donationOperations.handlePay( id, amount, currency)),
    fetchCharities: () => dispatch(donationOperations.fetchCharities()),
    fetchOverall: () => dispatch(donationOperations.fetchOverall()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Donation);