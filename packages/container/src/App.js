import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  createGenerateClassName,
  StylesProvider,
} from '@material-ui/core/styles';

import { Header } from './components/Header';
import { Progress } from './components/Progress';

const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSignIn = () => setIsSignedIn(true);
  const onSignOut = () => setIsSignedIn(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignedIn} onSignOut={onSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={onSignIn} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
}
