import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/customHooks';
import ProfileAvatar from '../../ProfileAvatar';

export default function ProfileInfoBtn({ profile, children, ...btnProps }) {
  const { isOpen, close, open } = useModalState();
  const shortName = profile.name.split(' ')[0];
  const { name, avatar, createdAt } = profile;
  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member Since {new Date(createdAt).toLocaleDateString()}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
