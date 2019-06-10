import * as actions from './donationActions'
import * as types from './donationActionTypes'
import reducer from './donationReducers'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import { donationOperations } from './donationIndex';

describe('Testing actions', () => {
  it('should create an action to update total donate', () => {
    const total = 1;
    const expectedAction = {
      type: types.UPDATE_TOTAL_DONATE,
      totalAmount: total
    }
    expect(actions.updateTotalDonate(total)).toEqual(expectedAction)
  })
  it('should create an action to update currency', () => {
    const currency = "THB";
    const expectedAction = {
      type: types.UPDATE_CURRENCY,
      currency: currency
    }
    expect(actions.updateCurrency(currency)).toEqual(expectedAction)
  })
  it('should create an action to update single charity', () => {
    const charity = {};
    const expectedAction = {
      type: types.UPDATE_CHARITY,
      charity: charity
    }
    expect(actions.updateCharity(charity)).toEqual(expectedAction)
  })
  it('should create an action to update charities', () => {
    const charities = [];
    const expectedAction = {
      type: types.UPDATE_CHARITIES,
      charities: charities
    }
    expect(actions.updateCharities(charities)).toEqual(expectedAction)
  })
  it('should create an action to update overall', () => {
    const total = 1;
    const currency = '';
    const expectedAction = {
      type: types.UPDATE_OVERALL,
      totalAmount: total,
      currency: currency
    }
    expect(actions.updateOverall(total, currency)).toEqual(expectedAction)
  })
})

const initialState = {
  totalAmount : 0,
  currency : "",
  charities: []
};

describe('Testing reducer', () => {
  it('Reducer should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update total amount', () => {
    let state = reducer(initialState, { type: types.UPDATE_TOTAL_DONATE, totalAmount : 2});
    expect(state).toEqual(
      {
        totalAmount : 2,
        currency : "",
        charities: []
      } 
    )    
  })

  it('should update currency', () => {
    let state = reducer(initialState, { type: types.UPDATE_CURRENCY, currency : "THB"});
    expect(state).toEqual(
      {
        totalAmount : 0,
        currency : "THB",
        charities: []
      } 
    )    
  })
  it('should update currency and totalAmount', () => {
    let state = reducer(initialState, { type: types.UPDATE_OVERALL, totalAmount: 1, currency : "THB"});
    expect(state).toEqual(
      {
        totalAmount : 1,
        currency : "THB",
        charities: []
      } 
    )    
  })

  it('should update charities', () => {
    let charity = {
      "id": 1,
      "name": "Baan Kru Noi",
      "image": "baan-kru-noi.jpg",
      "currency": "THB",
      "totalDonation": 10
    };

    let state = reducer(initialState, { type: types.UPDATE_CHARITIES, charities: [charity]});
    expect(state).toEqual(
      {
        totalAmount : 0,
        currency : "",
        charities: [charity]
      } 
    )    
  })

  it('should update total donate amount for single charity', () => {
    let charity = {
      "id": 1,
      "name": "Baan Kru Noi",
      "image": "baan-kru-noi.jpg",
      "currency": "THB",
      "totalDonation": 10
    };
    let updatedCharity = {
      "id": 1,
      "name": "Baan Kru Noi",
      "image": "baan-kru-noi.jpg",
      "currency": "THB",
      "totalDonation": 999
    };
    initialState.charities = [charity];

    let state = reducer(initialState, { type: types.UPDATE_CHARITY, charity: updatedCharity });
    expect(state).toEqual(
      {
        totalAmount : 0,
        currency : "",
        charities: [updatedCharity]
      } 
    )    
  })




  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)
  describe('Test thunk action creator', () => {

    it('after fetched overall, should update total donate and currency. store value should be the same', () => {
      fetchMock.getOnce('http://localhost:3001/overall', {
        body: { totalDonation: 1, currency: "THB"},
        headers: { 'content-type': 'application/json' }
      })
      
      const expectedActions = [ 
          types.UPDATE_OVERALL
      ]
      let state = { totalDonation: 99, currency: "THB" };
      const store = mockStore(() =>state);
      
      // const store = mockStore(() => state);
      return store.dispatch(donationOperations.fetchOverall())
        .then( () => {

          const actionTypes = store.getActions().map(action => action.type)
          const actions = store.getActions();
          expect(actionTypes).toEqual(expectedActions)
          expect(actions[0]).toEqual({"totalAmount": 1, "currency":"THB", "type": types.UPDATE_OVERALL});
      })
  
    })
  
    it('after fetched charities, should update charities', () => {
      fetchMock.getOnce('http://localhost:3001/charities', {
        body: [
          {
            "id": 1,
            "name": "Baan Kru Noi",
            "image": "baan-kru-noi.jpg",
            "currency": "THB",
            "totalDonation": 30
          }],
        headers: { 'content-type': 'application/json' }
      })

      const expectedActions = [ 
          types.UPDATE_CHARITIES
      ]
      let state = {};
      const store = mockStore(() =>state);

      return store.dispatch(donationOperations.fetchCharities())
        .then(() => {
          const actualActions = store.getActions().map(action => action.type)          
          expect(actualActions).toEqual(expectedActions)

      })
  
    })

    it('when payment is submitted, should totalDonate and individual charity ', () => {
      fetchMock.get('http://localhost:3001/overall',  
      {
        body: { totalDonation: 1, currency: "THB"},
        headers: { 'content-type': 'application/json' }
      }, { overwriteRoutes: false }
      );
      fetchMock.get('http://localhost:3001/charities/1',  
      {
        body: {
          "id": 1,
          "name": "Baan Kru Noi",
          "image": "baan-kru-noi.jpg",
          "currency": "THB",
          "totalDonation": 30
        },
        headers: { 'content-type': 'application/json' }
      }, { overwriteRoutes: false }
      );
      fetchMock.post('http://localhost:3001/payments', {}, { overwriteRoutes: false });
      
      fetchMock.put('http://localhost:3001/overall', {} , { overwriteRoutes: false });

      fetchMock.put('http://localhost:3001/charities/1', {}, { overwriteRoutes: false });

      const expectedTotalUpdate = [ { type: types.UPDATE_TOTAL_DONATE, totalAmount: 11 } ]

      let state = { };
      const store = mockStore(() =>state);
      return store.dispatch(donationOperations.handlePay('1',10,'THB'))
      .then(() => {  
        expect(store.getActions()).toEqual(expectedTotalUpdate)
    })
    })

    
  })
})