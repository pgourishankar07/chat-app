import { Alert, Icon } from 'rsuite';
import InputGroupButton from 'rsuite/lib/InputGroup/InputGroupButton';
import { ReactMic } from 'react-mic';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { storage } from '../../../misc/firebase';

export default function Audio({ afterUpload }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const { chatId } = useParams();

  const onClick = useCallback(() => {
    setIsRecording(p => !p);
  }, []);
  const onUpload = useCallback(
    async data => {
      setIsUpload(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, { cacheControl: `public,max-age=${3600 * 24 * 3}` });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        setIsUpload(false);
        afterUpload([file]);
      } catch (err) {
        setIsUpload(false);
        Alert.error(err.message);
      }
    },
    [chatId, afterUpload]
  );

  return (
    <>
      <InputGroupButton
        onClick={onClick}
        disabled={isUpload}
        className={isRecording ? 'animate-blink' : ''}
      >
        <Icon icon="microphone" />
        <ReactMic
          record={isRecording}
          className="d-none"
          onStop={onUpload}
          mimeType="audio/mp3 "
        />
      </InputGroupButton>
    </>
  );
}
