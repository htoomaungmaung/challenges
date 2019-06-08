import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import { summaryDonations } from './helpers';


const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
        selectedAmount: 10,
      };
    }

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
          //self.setState({ charities: data }) 
          self.props.dispatch({
            type: 'UPDATE_CHARITIES',
            charities: data,
          });
        });

      // fetch('http://localhost:3001/payments')
      //   .then(function(resp) { return resp.json() })
      //   .then(function(data) {
      //     self.props.dispatch({
      //       type: 'UPDATE_TOTAL_DONATE',
      //       amount: summaryDonations(data.map((item) => (item.amount))),
      //     });
      //   })

      fetch('http://localhost:3001/overall')
      .then(function(resp) { return resp.json() })
      .then(function(data) {
        self.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: data.totalDonation,
        });
        self.props.dispatch({
          type: 'UPDATE_CURRENCY',
          currency: data.currency,
        });
      })
    }

    render() {
      const self = this;
      const cards = this.props.charities.map(function(item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label key={j}>
            <input
              type="radio"
              name="payment"
              onClick={function() {
                self.setState({ selectedAmount: amount })
              }} /> {amount}
          </label>
        ));

        return (
          <Card key={i}>
            <p>{item.name}</p>
            {payments}
            <button onClick={handlePay.call(self, item.id, self.state.selectedAmount, item.currency)}>Pay</button>
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
      const donate = this.props.donate;
      const message = this.props.message;
      const currency = this.props.currency;

      return (
        <div>
          <h1>Tamboon React</h1>
          <p>All donations: {donate} {currency} </p>
          <p style={style}>{message}</p>
          {cards}
        </div>
      );
    }
  }
);

function handlePay(id, amount, currency) {
  const self = this;
  return function() {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
      .then(function(resp) { return resp.json(); })
      .then(function() {
        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `Thanks for donate ${amount}!`,
        });

        setTimeout(function() {
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: '',
          });
        }, 2000);
      })
    .then(
      fetch('http://localhost:3001/overall')
      .then(function(resp) { return resp.json() })
      .then(function(data) {
        let updatedAmount = parseInt(data.totalDonation) + parseInt(amount);
        let updatedSt = { "totalDonation": updatedAmount };
        let updatedBody = { ...data, ...updatedSt };
        fetch('http://localhost:3001/overall', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBody),
        })
        .then(
          () => {
            self.props.dispatch({
              type: 'UPDATE_TOTAL_DONATE',
              amount: updatedAmount,
            });
          }        
        ).catch(
          err => { console.log(err) }
        )
      })
    )
    .then(
      fetch(`http://localhost:3001/charities/${id}`)
      .then(function(resp) { return resp.json() })
      .then(function(data) {
        let updatedAmount = parseInt(data.totalDonation) + parseInt(amount);
        let updatedSt = { "totalDonation": updatedAmount };
        let updatedBody = { ...data, ...updatedSt };  
        fetch(`http://localhost:3001/charities/${id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBody),
        })
        .then(
          () => {
            self.props.dispatch({
              type: 'UPDATE_CHARITY',
              amount: updatedBody,
            });
          }
        ).catch(
          err => { console.log(err) }
        )
      })
    )

    
  }
}
