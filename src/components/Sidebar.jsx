import CreateRoom from './CreateRoom';
import DashboardToggle from './dashboard/DashboardToggle';

export default function Sidebar() {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
        <CreateRoom />
      </div>
    </div>
  );
}
