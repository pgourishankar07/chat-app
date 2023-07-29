import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/customHooks';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useProfile } from '../../context/profile.context';
import { database, storage } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';

const fileInputTypes = '.png,.jpeg,.jpg';
const acceptFile = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValid = file => acceptFile.includes(file.type);

function getBlob(canvas) {
  return new Promise((res, rej) => {
    canvas.toBlob(blob => {
      if (blob) {
        res(blob);
      } else {
        rej(new Error('File process error'));
      }
    });
  });
}

export default function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const [isLoading, setIsloading] = useState(false);

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

  async function onUploadClick() {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    try {
      setIsloading(true);
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');
      const uploadAvatarRes = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });
      const downloadURL = await uploadAvatarRes.ref.getDownloadURL();
      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');
      userAvatarRef.set(downloadURL);
      Alert.info('Avatar has been uploaded', 4000);
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      Alert.error(err.message, 4000);
    }
  }

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
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
                  ref={avatarEditorRef}
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
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
