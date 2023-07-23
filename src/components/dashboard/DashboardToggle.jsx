import { Alert, Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModelState } from '../../misc/customHooks';
import { Dashboard } from './Index';
import { useCallback } from 'react';
import { auth } from '../../misc/firebase';

export default function DashboardToggle() {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('Signed Out', 4000);
    close();
  }, [close]);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        <span>Dashboard</span>
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}
