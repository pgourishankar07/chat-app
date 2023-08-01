import { Alert, Button, Icon, Modal, Uploader } from 'rsuite';
import InputGroupButton from 'rsuite/lib/InputGroup/InputGroupButton';
import { useModalState } from '../../../misc/customHooks';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useState } from 'react';
import { storage } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

export default function Attachments({ afterUpload }) {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();
  const [fileList, setFileList] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const onChange = fileArr => {
    const filtered = fileArr
      .filter(f => f.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUpload = async () => {
    try {
      const uploaderPromises = fileList.map(f => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, { cacheControl: `public,max-age=${3600 * 24 * 3}` });
      });

      const uploadSnapShots = await Promise.all(uploaderPromises);
      const shapePromises = uploadSnapShots.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });
      const files = await Promise.all(shapePromises);
      await afterUpload(files);
      setIsLoad(false);
      close();
    } catch (err) {
      Alert.error(err.message, 2000);
    }
  };

  return (
    <>
      <InputGroupButton onClick={open}>
        <Icon icon="attachment" />
      </InputGroupButton>
      <Modal show={isOpen} onHide={close}>
        <ModalHeader>
          <ModalTitle>Upload Files</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Uploader
            autoUpload={false}
            action=""
            onChange={onChange}
            multiple
            listType="picture-text"
            fileList={fileList}
            className="w-100"
            disabled={isLoad}
          />
        </ModalBody>
        <ModalFooter>
          <Button block color="blue" disabled={isLoad} onClick={onUpload}>
            Send to chat
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5MB are allowed</small>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
