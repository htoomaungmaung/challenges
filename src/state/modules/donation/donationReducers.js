/* REDUCER(S)

It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.

*/
// @flow
import * as actionTypes from './donationActionTypes';
import type { State } from './donationModel';
import { initialState } from './donationModel';

const updateCharity = (state: any, action: any) => {
  const updatedState = state.charities.map( charity => {
    if (charity.id == action.charity.id) {
      charity.totalDonation = action.charity.totalDonation
    }
    return charity
  })
  return {...state, ...{charities: updatedState} }
}


const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.UPDATE_TOTAL_DONATE:
      return { ...state, ...{totalAmount: action.totalAmount}};
    case actionTypes.UPDATE_CHARITIES:
      return {...state, ...{charities: action.charities}};
    case actionTypes.UPDATE_CHARITY:
      return updateCharity(state,action)
    case actionTypes.UPDATE_CURRENCY:
      return { ...state, ...{currency: action.currency}};
    case actionTypes.UPDATE_OVERALL:
      return { ...state, ...{currency: action.currency, totalAmount: action.totalAmount}}
    default:
      return state;
  }
}
export default reducer;