import { Button, Modal } from 'rsuite';
import { useCurrRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/customHooks';
import { memo } from 'react';

export function RoomInfoBtn() {
  const { isOpen, open, close } = useModalState();
  const description = useCurrRoom(v => v.description);
  const name = useCurrRoom(v => v.name);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room info
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(RoomInfoBtn);
