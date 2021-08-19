import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWrapper from './RouteWrapper';

import SigninPage from '~/pages/signin';
import SignupPage from '~/pages/signup';
import HomePage from '~/pages/home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <RouteWrapper path="/signin" exact component={SigninPage} />
      <RouteWrapper path="/signup" exact component={SignupPage} />
      <RouteWrapper
        path="/"
        exact
        isPrivate
        redirectTo="/signin"
        component={HomePage}
      />
    </Switch>
  );
};

export default Routes;
