import { memo } from 'react';
import { useCurrRoom } from '../../../context/current-room.context';

export function Top() {
  const name = useCurrRoom(v => v.name);

  return <div>{name}</div>;
}

export default memo(Top);
