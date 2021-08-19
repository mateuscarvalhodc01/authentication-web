import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface RouterProps {
  redirectTo?: string;
  isPrivate?: boolean;
  exact?: boolean;
  path?: string;
  // eslint-disable-next-line
  component?: any;
}

const RouteWrapper: React.FC<RouterProps> = ({
  redirectTo = '/',
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const authenticated = sessionStorage.getItem('@AUTHENTICATION:JWT_TOKEN');

  if (!authenticated && isPrivate) return <Redirect to={redirectTo} />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouteWrapper;
