import { Avatar } from 'rsuite';
import { nameInitials } from '../misc/helper';

export default function ProfileAvatar({ name, ...avatarProps }) {
  return (
    <Avatar style={{ color: '#F11A7B' }} {...avatarProps} circle>
      {nameInitials(name)}
    </Avatar>
  );
}
