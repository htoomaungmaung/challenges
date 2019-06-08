// @flow
import 'isomorphic-fetch';

export default ( url: string, method: string, body: any) => {
  const options = {
    method,
    headers: requestHeaders( ),
    body: method !== 'GET' ? JSON.stringify( body ) : null,
  };

  return fetch( url, options )
    .then( res => parseStatus( res.status, res.json() ) );
};

function parseStatus( status: any, res: any ) {
  return new Promise( ( resolve, reject ) => {
    if ( status >= 200 && status < 300 ) {
      res.then( response => resolve( response ) );
    } else {
      res.then( response => reject( { status, response } ) );
    }
  } );
}

function requestHeaders( ) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}
