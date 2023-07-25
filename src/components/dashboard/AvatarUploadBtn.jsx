import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/customHooks';
import { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const fileInputTypes = '.png,.jpeg,.jpg';
const acceptFile = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValid = file => acceptFile.includes(file.type);

export default function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);

  function onFileTypeChange(event) {
    const currFiles = event.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValid(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong file format ${file.type}`, 4000);
      }
    }
  }

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            className="d-none"
            type="file"
            accept={fileInputTypes}
            onChange={onFileTypeChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload your new Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={50}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
