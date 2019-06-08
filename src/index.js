import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

const store = createStore(function(state, action) {
  const _state = state == null ? {
    donate: 0,
    message: '',
    currency: '',
    charities: []
  } : state;

  const updateCharity = () => {

    const updatedState = state.charities.map( charity => {
      if(charity.id == action.charity.id){
        charity.totalDonation = action.charity.totalDonation
      }
      return charity
    })
    return {...state, ...{charities: updatedState} }
  }

  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return { ..._state, ...{
        donate: action.amount,
      }};
    case 'UPDATE_MESSAGE':
      return {..._state, ...{
        message: action.message,
      }};
    case 'UPDATE_CHARITIES':
      return { ..._state, ...{charities: action.charities}};  
    case 'UPDATE_CHARITY':
      return updateCharity(_state, action);
    case 'UPDATE_CURRENCY':
      return {..._state, ...{currency: action.currency}};
    default: return _state;
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
