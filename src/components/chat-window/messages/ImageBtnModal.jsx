import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/customHooks';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';

export default function ImageBtnModal({ src, fileName }) {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <input
        type="image"
        src={src}
        alt="file"
        onClick={open}
        className="mw-100 mh-100 w-auto"
      />
      <Modal show={isOpen} onHide={close}>
        <ModalHeader>
          <ModalTitle>{fileName}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div>
            <img src={src} height="100%" width="100%" alt="file" />
          </div>
        </ModalBody>
        <ModalFooter>
          <a href={src} target="_blank" rel="noopener noreferrer">
            <Button color="blue"> View Original</Button>
          </a>
        </ModalFooter>
      </Modal>
    </>
  );
}
