import React, {lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

const DonationPage = lazy(()=> import('./pages/DonationPage/DonationPage'));

const Routes = () => {
  return(
    <Suspense fallback={<div>Loading page ...</div>}>
      <Switch>
        <Route path="/" exact component={DonationPage} />
        <Redirect to="/" />        
      </Switch>
    </Suspense>
  )
}

export default Routes;