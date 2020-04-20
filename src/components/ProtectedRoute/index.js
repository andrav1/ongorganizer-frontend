import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withStore } from '../helpers';

const PrivateRoute = ({
  component: Component,
  store: { authStore },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authStore.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default withStore(PrivateRoute);
