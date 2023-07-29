import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { convertToArr } from '../../../misc/helper';
import MessageItem from './MessageItem';

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
  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages yet</li>}
      {canShowMsg && msg.map(m => <MessageItem key={m.id} message={m} />)}
    </ul>
  );
}
