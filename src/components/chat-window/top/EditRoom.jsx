import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../../misc/customHooks';
import EditInput from '../../EditInput';
import { useCurrRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { Icon } from 'rsuite';

function EditRoom() {
  const { isOpen, close, open } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width : 992px)');

  const name = useCurrRoom(v => v.name);
  const description = useCurrRoom(v => v.description);
  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.info('Updated Successfully', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  function onNameSave(newName) {
    updateData('name', newName);
  }
  function onDescriptionSave(newDescription) {
    updateData('description', newDescription);
  }

  return (
    <div>
      <Button className="br-circle" size="sm" color="blue" onClick={open}>
        <Icon icon="edit2" />
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditInput
            initialVal={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be empty"
          />
          <EditInput
            componentClass="textarea"
            rows={5}
            initialVal={description}
            onSave={onDescriptionSave}
            emptyMsg="Description cannot be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
}

export default memo(EditRoom);
