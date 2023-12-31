import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Bottom from '../../components/chat-window/bottom';
import Messages from '../../components/chat-window/messages';
import { Top } from '../../components/chat-window/top';
import { useRooms } from '../../context/room.context';
import { Loader } from 'rsuite';
import { CurrRoomProvider } from '../../context/current-room.context';
import { convertArr } from '../../misc/helper';
import { auth } from '../../misc/firebase';

export default function Chat() {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currRoom = rooms.find(room => room.id === chatId);

  if (!currRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }
  const { name, description } = currRoom;

  const admins = convertArr(currRoom.admins);

  const isAdmin = admins.includes(auth.currentUser.uid);
  const currRoomData = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrRoomProvider data={currRoomData}>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </CurrRoomProvider>
  );
}
