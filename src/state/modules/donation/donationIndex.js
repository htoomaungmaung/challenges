/* INDEX FILE

This file, from a module perspective, behaves as the donation file form the original proposal.
It exports as default the reducer function of the donation.
It exports as named export the selectors and the operations.
Optionally it exports the actions and types if they are needed in other modules.

*/
/* @flow */
import reducer from './donationReducers';

import * as donationOperations from './donationOperations';

export {
  donationOperations,
};

export default reducer;