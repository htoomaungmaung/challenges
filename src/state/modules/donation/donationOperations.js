/* OPERATIONS = REDUX THUNKS

This file defines the public interface of the duck -- what can be dispatched from components
Simple operations are just about forwarding an action creator, ex: simpleQuack
Complex operations involve returning a thunk that dispatches multiple actions in a certain order, ex: complexQuack

*/

// @flow
import { type Dispatch} from 'redux';
import fetchUtil from '../../../utils/fetch';
import * as actions from './donationActions';
import { toast } from 'react-toastify';
const port = '3001';
const server = window.location.protocol + '//' +window.location.hostname;
const charityURL = `${server}:${port}/charities`;
const overallURL = `${server}:${port}/overall`;
const paymentURL = `${server}:${port}/payments`;
console.log(charityURL);
export const fetchCharities = () => (dispatch: Dispatch<any>) => {
  return fetchUtil( charityURL, 'GET', null ).then(
    res => {
      dispatch(actions.updateCharities(res)) 
    }    
  ).catch(
    err => { console.log(err) }
  )
}

export const fetchOverall = () => (dispatch: Dispatch<any>) => {
  return fetchUtil( overallURL, 'GET', null ).then(
    res => {
      dispatch(actions.updateTotalDonate(res.totalDonation))
      dispatch(actions.updateCurrency(res.currency))
    }
  ).catch(
    err => { console.log(err) }
  )
  
}

export const handlePay = (id: any, amount: number, currency: string) => (dispatch: Dispatch<any>) => {
  console.log('handle pay:'+id+','+amount+','+currency);
  const body = { charitiesId: id, amount, currency };
  fetchUtil( paymentURL, 'POST', body ).then(
    () => toast(`Thank you for donating ${amount} ${currency}`)
  ).then(
    () => dispatch(increaseAndSyncOverallTotal(amount))
  ).then(
    () => dispatch(increaseAndSyncCharity(amount,id)) 
  ).catch(
    err => { console.log(err) }
  )
  
}

const increaseAndSyncOverallTotal = (amount:number) => (dispatch: Dispatch<any>) => {
  fetchUtil( overallURL, 'GET', null ).then(
    overAllRes => {
      const updatedAmount = parseInt(overAllRes.totalDonation) + parseInt(amount);
      const updatedSt = { totalDonation: updatedAmount };
      const updatedBody = { ...overAllRes, ...updatedSt };
      fetchUtil( overallURL, 'PUT', updatedBody ).then(
        () => {
          console.log('updating total:'+updatedAmount);
          dispatch(actions.updateTotalDonate(updatedAmount)) 
        }        
      ).catch(
        err => { console.log(err) }
      )
    }
  ).catch(
    err => { console.log(err) }
  )
}

const increaseAndSyncCharity = (amount: number, charityId:any) => (dispatch: Dispatch<any>) => {
  fetchUtil( `${charityURL}/${charityId}`, 'GET', null).then(
    charityRes => {
      console.log('fetched charity:'+charityId);
      const updatedAmount = parseInt(charityRes.totalDonation) + parseInt(amount);
      const updatedSt = { totalDonation: updatedAmount };
      const updatedBody = { ...charityRes, ...updatedSt };
      fetchUtil( `${charityURL}/${charityId}`, 'PUT', updatedBody ).then(
        () => {
          console.log('Successfully updated charity:');
          dispatch(actions.updateCharity(updatedBody))
        }
      ).catch(
        err => { console.log(err) }
      )
    }
  ).catch(
    err => { console.log(err) }
  )
}
