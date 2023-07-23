import { Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModelState } from '../../misc/customHooks';
import { Dashboard } from './Index';

export default function DashboardToggle() {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        <span>Dashboard</span>
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
}
