import { Loader, Nav } from 'rsuite';
import Roomitem from './Roomitem';
import { useRooms } from '../../context/room.context';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function ChatRoomList({ height }) {
  const rooms = useRooms();
  const location = useLocation();

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${height}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical size="md" content="Loading" speed="slow" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            eventKey={`/chat/${room.id}`}
            key={room.id}
          >
            <Roomitem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
}
