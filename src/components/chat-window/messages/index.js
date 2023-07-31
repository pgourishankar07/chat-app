import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { convertToArr } from '../../../misc/helper';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';

export default function Messages() {
  const [msg, setMsg] = useState(null);
  const { chatId } = useParams();
  const isChatEmpty = msg && msg.length === 0;
  const canShowMsg = msg && msg.length > 0;

  useEffect(() => {
    const msgRef = database.ref('/messages');
    msgRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = convertToArr(snap.val());
        setMsg(data);
      });
    return () => {
      msgRef.off('value');
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMsg;
      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin Permission Removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin Permission Granted';
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages yet</li>}
      {canShowMsg &&
        msg.map(m => (
          <MessageItem key={m.id} message={m} handleAdmin={handleAdmin} />
        ))}
    </ul>
  );
}
