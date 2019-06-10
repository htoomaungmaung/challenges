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

export const fetchCharities = () => (dispatch: Dispatch<any>) => {
  return fetchUtil( charityURL, 'GET', null ).then(
    res => {
      dispatch(actions.updateCharities(res)) 
    }    
  ).catch(
    err => { toast.error(err)  }
  )
}

export const fetchOverall = () => (dispatch: Dispatch<any>) => {
  return fetchUtil( overallURL, 'GET', null ).then(
    res => {
      dispatch(actions.updateOverall(res.totalDonation, res.currency));
    }
  ).catch(
    err => { toast.error(err)  }
  )
  
}


/*
The current backend is not handling the calculating total amount.
Therefore, we need to do extra work here to keep the data integrity by dispatching 2 more methods "increaseAndSyncOverallTotal" and "increaseAndSyncCharity".
These 2 methods can be ignored if the backend API is capable of doing the data integrity process.
However, for demo purpose, we will keep it here. 
*/
export const handlePay = (id: any, amount: number, currency: string) => (dispatch: Dispatch<any>) => {
  const body = { charitiesId: id, amount, currency };
  return fetchUtil( paymentURL, 'POST', body ).then(
    () => toast(`Thank you for donating ${amount} ${currency}`)
  ).then(
    () => dispatch(increaseAndSyncOverallTotal(amount))
  ).then(
    () => dispatch(increaseAndSyncCharity(amount,id)) 
  ).catch(
    err => { toast.error(err) }
  )
  
}

const increaseAndSyncOverallTotal = (amount:number) => (dispatch: Dispatch<any>) => {
  return fetchUtil( overallURL, 'GET', null ).then(
    overAllRes => {
      const updatedAmount = parseInt(overAllRes.totalDonation) + parseInt(amount);
      const updatedSt = { totalDonation: updatedAmount };
      const updatedBody = { ...overAllRes, ...updatedSt };
      fetchUtil( overallURL, 'PUT', updatedBody ).then(
        () => {
          dispatch(actions.updateTotalDonate(updatedAmount)) 
        }        
      ).catch(
        err => { toast.error(err)  }
      )
    }
  ).catch(
    err => { toast.error(err)  }
  )
}

const increaseAndSyncCharity = (amount: number, charityId:any) => (dispatch: Dispatch<any>) => {
  return fetchUtil( `${charityURL}/${charityId}`, 'GET', null).then(
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
        err => { toast.error(err)  }
      )
    }
  ).catch(
    err => { toast.error(err)  }
  )
}
