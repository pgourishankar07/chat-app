import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

export default function PublicRoute({ children, ...routeProps }) {
  const profile = useProfile();

  if (profile) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
}
