import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Utils
import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.getToken() !== null ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: 'auth/login',
        state: { from: props.location }
        }}
      />
    ):
  )} />
);

export default PrivateRoute;  
