import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/customHooks';
import TimeAgo from 'timeago-react';

function getText(presence) {
  if (!presence) {
    return 'Unknown state';
  }
  return presence.state === 'online' ? (
    'Online'
  ) : (
    <TimeAgo
      datetime={new Date(presence.last_changed)}
      className="font-normal  ml-2"
    />
  );
}
function getColor(presence) {
  if (!presence) {
    return 'gray';
  }

  switch (presence.state) {
    case 'online':
      return '#27E1C1';
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
}

export default function PresenceSymbol({ uid }) {
  const presence = usePresence(uid);

  return (
    <>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>{getText(presence)}</Tooltip>}
      >
        <Badge
          className="cursor-pointer"
          style={{ backgroundColor: getColor(presence) }}
        />
      </Whisper>
    </>
  );
}
