import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtn from './ProfileInfoBtn';
import PresenceSymbol from '../../PresenceSymbol';
import { Button } from 'rsuite';
import { useCurrRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';
import { useHover } from '../../../misc/customHooks';
import IconBtn from './IconBtn';

function MessageItem({ message, handleAdmin, handleLike, handleDel }) {
  const { author, createdAt, text, likes, likeCount } = message;

  const [isHover, selfRef] = useHover();

  const isAdmin = useCurrRoom(v => v.isAdmin);
  const admins = useCurrRoom(v => v.admins);

  const isMsgAuthAdmin = admins.includes(author.uid);
  const isAuth = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuth;

  const isLikedByUser =
    likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHover ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
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
                ? 'Remove Admin permission'
                : 'Give Admin permission in this room'}
            </Button>
          )}
        </ProfileInfoBtn>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtn
          isVisible={isHover}
          iconName="heart"
          tooltip="Like"
          onClick={() => {
            handleLike(message.id);
          }}
          badgeContent={likeCount}
          {...(isLikedByUser ? { color: 'red' } : {})}
        />
        {isAuth && (
          <IconBtn
            isVisible={isHover}
            iconName="trash"
            tooltip="Delete"
            onClick={() => {
              handleDel(message.id);
            }}
          />
        )}
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
}

export default memo(MessageItem);
