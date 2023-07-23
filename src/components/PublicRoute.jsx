import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

export default function PublicRoute({ children, ...routeProps }) {
  const { profile, isLoading } = useProfile();

  if (!profile && isLoading) {
    return (
      <Container>
        <Loader center vertical content="Loading" size="md" speed="slow" />
      </Container>
    );
  }
  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
}
