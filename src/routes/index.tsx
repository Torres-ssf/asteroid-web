import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Main from '../pages/Main';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <AppRoute path="/" exact component={SignIn} />
    <AppRoute path="/signup" component={SignUp} />

    <AppRoute path="/main" component={Main} isPrivate />
    <AppRoute path="/me" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
