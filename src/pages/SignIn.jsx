import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';

export default function SignIn() {
  async function SignInWithProvider(provider) {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success('Signed In Successfully', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  }

  function onGoogleSignIn() {
    SignInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to ChatHub</h2>
                <p>Progressive chat platform for nerdy Devs</p>
              </div>
              <div className="mt-3">
                <Button block color="red" onClick={onGoogleSignIn}>
                  <Icon icon="google"> Continue with Google</Icon>
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}
