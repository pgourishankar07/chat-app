import React, { Suspense } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
// import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileContextProvider } from './context/profile.context';
import { ErrorBoundary } from './components/ErrorBoundary';

const SignIn = React.lazy(() => import('./pages/SignIn'));

function App() {
  return (
    <ErrorBoundary>
      <ProfileContextProvider>
        <BrowserRouter>
          <Switch>
            <PublicRoute path="/signin">
              <Suspense fallback={<div>Loading...</div>}>
                <SignIn />
              </Suspense>
            </PublicRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </ProfileContextProvider>
    </ErrorBoundary>
  );
}

export default App;
