import { Avatar } from 'rsuite';
import { nameInitials } from '../misc/helper';

export default function ProfileAvatar({ name, ...avatarProps }) {
  return (
    <Avatar
      style={{ color: '#F11A7B' }}
      {...avatarProps}
      circle
      className="width-200 height-200 img-fullsize font-huge"
    >
      {nameInitials(name)}
    </Avatar>
  );
}
