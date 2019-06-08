// Actions
import fetch from 'isomorphic-fetch';

const UPDATE_CHARITIES = 'donation/UPDATE_CHARITIES';
const UPDATE_CHARITY = 'donation/UPDATE_CHARITY';
const UPDATE_TOTAL_DONATE = 'donation/UPDATE_TOTAL_DONATE';
const UPDATE_MESSAGE = 'donation/UPDATE_MESSAGE';
const UPDATE_CURRENCY = 'donation/UPDATE_CURRENCY';
// Action creators
function updateTotalDonate(amount) {
  return {
    type: UPDATE_TOTAL_DONATE,
    totalAmount: amount
  }
}
function updateCurrency(currency){
  return {
    type: UPDATE_CURRENCY,
    currency: currency
  }
}
function updateCharities(charities){
  return{
    type: UPDATE_CHARITIES,
    charities
  }
}
function updateMessage(message){
  return{
    type: UPDATE_MESSAGE,
    message: message
  }
}
function updateSingleCharity(charity){
  return{
    type: UPDATE_CHARITY,
    charity: charity
  }
}

function fetchCharities(){
  return dispatch => {
    fetch('http://localhost:3001/charities')
      .then(function(resp) { return resp.json(); })
      .then(function(data) {
        dispatch(updateCharities(data)) });
  }  
}
function fetchOverall(){
  return dispatch => {
    fetch('http://localhost:3001/overall')
      .then(function(resp) { return resp.json(); })
      .then(function(data) {
        dispatch(updateTotalDonate(data.totalDonation));
        dispatch(updateCurrency(data.currency));
      });
  }
}
function handlePay(id, amount, currency) {
  
  return dispatch => {
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
        dispatch(updateMessage(`Thanks for donate ${amount}!`));
        
        setTimeout(function() {
          dispatch(updateMessage(''));
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
            dispatch(updateTotalDonate(updatedAmount));           
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
            dispatch(updateSingleCharity(updatedBody));
          }
        ).catch(
          err => { console.log(err) }
        )
      })
    )

    
  }
}


const updateCharity = (state,action) => {
  const updatedState = state.charities.map( charity => {
    if(charity.id == action.charity.id){
      charity.totalDonation = action.charity.totalDonation
    }
    return charity
  })
  return {...state, ...{charities: updatedState} }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOTAL_DONATE:
      return {...state, ...{totalAmount: action.totalAmount}};
    case UPDATE_MESSAGE:
      return { ...state, ...{message: action.message}};
    case UPDATE_CHARITIES:
      return { ...state, ...{charities: action.charities}};
    case UPDATE_CHARITY:
      return updateCharity(state,action);
    case UPDATE_CURRENCY:
      return {...state, ...{currency: action.currency}}
    default:
      return state;
  }
}

// Reducer
const initialState = {
  totalAmount : 0,
  message : '',
  charities: [],
  currency: ''
};

const actionCreators = {
  handlePay,
  fetchCharities,
  fetchOverall,  
  updateTotalDonate
};

const actionTypes = {
  UPDATE_TOTAL_DONATE,
  UPDATE_MESSAGE,
  UPDATE_CHARITIES,
  UPDATE_CHARITY,
  UPDATE_CURRENCY
};

export {
  actionCreators,
  actionTypes,
};

export default reducer;