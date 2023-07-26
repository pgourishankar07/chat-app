import { Nav } from 'rsuite';
import Roomitem from './Roomitem';

export default function ChatRoomList({ height }) {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${height}px)`,
      }}
    >
      <Nav.Item>
        <Roomitem />
      </Nav.Item>
    </Nav>
  );
}
