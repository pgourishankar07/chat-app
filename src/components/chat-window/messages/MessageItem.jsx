import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtn from './ProfileInfoBtn';
import PresenceSymbol from '../../PresenceSymbol';
import { Button } from 'rsuite';
import { useCurrRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';

function MessageItem({ message, handleAdmin }) {
  const { author, createdAt, text } = message;

  const isAdmin = useCurrRoom(v => v.isAdmin);
  const admins = useCurrRoom(v => v.admins);

  const isMsgAuthAdmin = admins.includes(author.uid);
  const isAuth = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuth;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceSymbol uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          size="sm"
          className="ml-1"
        />
        <ProfileInfoBtn profile={author}>
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthAdmin
                ? 'Remove admin permission'
                : 'Give admin permission in this room'}
            </Button>
          )}
        </ProfileInfoBtn>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
}

export default memo(MessageItem);
