import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { auth, database, storage } from '../../../misc/firebase';
import { convertToArr, groupDate } from '../../../misc/helper';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';

const msgRef = database.ref('/messages');

function shouldScrollToBottom(node, threshold = 30) {
  const percentage =
    (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;

  return percentage > threshold;
}

export default function Messages() {
  const [msg, setMsg] = useState(null);
  const { chatId } = useParams();
  const selfRef = useRef();
  const [renderTime, setRenderTime] = useState(0);

  const isChatEmpty = msg && msg.length === 0;
  const canShowMsg = msg && msg.length > 0;

  const loadMessages = useCallback(() => {
    const node = selfRef.current;
    msgRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = convertToArr(snap.val());
        setMsg(data);

        if (shouldScrollToBottom(node)) {
          node.scrollTop = node.scrollHeight;
        }
      });
  }, [chatId]);

  useEffect(() => {
    const node = selfRef.current;
    const startTime = performance.now();

    loadMessages();

    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      setRenderTime(timeTaken);
    }, renderTime + 500);

    return () => {
      msgRef.off('value');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMessages]);

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

  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const msgRef = database.ref(`/messages/${msgId}`);
    await msgRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
        }
      }
      return msg;
    });
  }, []);

  const handleDel = useCallback(
    async (msgId, file) => {
      if (!window.confirm('Do you want to Delete this message ?')) {
        return;
      }
      const isLastMsg = msg[msg.length - 1].id == msgId;
      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLastMsg && msg.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...msg[msg.length - 2],
          msgId: msg[msg.length - 2].id,
        };
      }

      if (isLastMsg && msg.length == 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted', 2000);
      } catch (error) {
        return Alert.error(error.message, 2000);
      }

      if (file) {
        try {
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (err) {
          Alert.error(err.message);
        }
      }
    },
    [chatId, msg]
  );

  const renderMsg = () => {
    const groups = groupDate(msg, item =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];

    Object.keys(groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          {date}
        </li>
      );

      const msgs = groups[date].map(m => (
        <MessageItem
          key={m.id}
          message={m}
          handleAdmin={handleAdmin}
          handleLike={handleLike}
          handleDel={handleDel}
        />
      ));
      items.push(...msgs);
    });
    return items;
  };

  return (
    <ul ref={selfRef} className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages yet</li>}
      {canShowMsg && renderMsg()}
    </ul>
  );
}
