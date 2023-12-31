import { memo } from 'react';
import { useCurrRoom } from '../../../context/current-room.context';
import { ButtonToolbar, Icon } from 'rsuite';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useMediaQuery } from '../../../misc/customHooks';
import RoomInfoBtn from './RoomInfoBtn';
import EditRoom from './EditRoom';

export function Top() {
  const name = useCurrRoom(v => v.name);
  const isMobile = useMediaQuery('(max-width:992px)');
  const isAdmin = useCurrRoom(v => v.isAdmin);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          {isAdmin && <EditRoom />}
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtn />
      </div>
    </div>
  );
}

export default memo(Top);
