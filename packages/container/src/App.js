import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  createGenerateClassName,
  StylesProvider,
} from '@material-ui/core/styles';

import { Header } from './components/Header';
import { Progress } from './components/Progress';

const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSignIn = () => setIsSignedIn(true);
  const onSignOut = () => setIsSignedIn(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignedIn} onSignOut={onSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={onSignIn} />
              </Route>
              <Route path="/">
                <MarketingLazy onSignIn={onSignIn} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
}
