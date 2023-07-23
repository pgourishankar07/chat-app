import { Switch, BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileContextProvider } from './context/profile.context';

function App() {
  return (
    <ProfileContextProvider>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProfileContextProvider>
  );
}

export default App;
