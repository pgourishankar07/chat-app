import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditInput from '../EditInput';
import { database } from '../../misc/firebase';

export function Dashboard({ onSignOut }) {
  const { profile } = useProfile();
  const onSave = async newData => {
    const nickNameRef = database.ref(`/profiles/${profile.uid}`).child('name');
    try {
      await nickNameRef.set(newData);
      Alert.success('Updated the Nickname', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditInput
          name="nickname"
          initialVal={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">NickName</h6>}
        />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
}
