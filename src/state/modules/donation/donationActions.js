/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/
// @flow
import * as types from './donationActionTypes';

type charity = {
  name: string,
  totalDonation: number,
  currency: string,
  id: any
}

export const updateCharities = (charities: Array<charity> ) => ({
  type: types.UPDATE_CHARITIES,
  charities,
});

export const updateCharity = (charity: charity ) => ({
  type: types.UPDATE_CHARITY,
  charity,
});

export const updateTotalDonate = (total: number ) => ({
  type: types.UPDATE_TOTAL_DONATE,
  totalAmount: total,
});

export const updateCurrency = (currency: string) => ({
  type: types.UPDATE_CURRENCY,
  currency,
})

