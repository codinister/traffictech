import dashboard from '../data/dashboard.json';
import MetricCard from '../components/MetricCard';
import TrafficMap from '../components/TrafficMap';
import CameraFeeds from '../components/CameraFeeds';
import TrafficTrends from '../components/TrafficTrends';
import { FaBell, FaBars } from 'react-icons/fa6';
import { useState } from 'react';
import { logOutEndpoint } from '../service/endPoints';
import { Session } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import type { dashboardDataTypes } from '../types/dashboardTypes';
import Sidebar from './dashboard/Sidebar';
import Alerts from './dashboard/Alerts';
import Congestion from './dashboard/Congestion';
import AlertModal from './dashboard/AlertModal';

const data = dashboard as dashboardDataTypes;

export default function Dashboard() {
  const [active, setActive] = useState('Dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = Session();
  const [metricVal, setMetricVal] = useState('3');
  const [openAlert, closeAlert] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    const { data } = await logOutEndpoint('/logout');
    if (data?.message === 'Logout successfull!') {
      logout();
      navigate('/');
    }
  };

  const result = sessionStorage.getItem('users') || '';

  const user = JSON.parse(result);

  return (
    <>
      <div className="app-shell">
        <Sidebar
          active={active}
          setActive={setActive}
          open={menuOpen}
          close={() => setMenuOpen(false)}
        />

        <main className="main-content">
          <header className="topbar">
            <button
              className="mobile-menu"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
            <div>
              <h1>Welcome, {user?.firstname}!</h1>
              <p>Real-time traffic overview across Accra</p>
            </div>
            <div className="profile-actions">
              <button className="border border-red-500 bg-red-500 text-white py-1 px-4 rounded-2xl cursor-pointer flex items-center hover:bg-blue-950 hover:text-white" onClick={()=> closeAlert(true)}>
                Add Alert
              </button>
              <button
                className="border border-blue-950 text-blue-950 py-1 px-4 rounded-2xl cursor-pointer flex items-center hover:bg-blue-950 hover:text-white"
                onClick={handleClick}
              >
                Logout
              </button>
              <button
                className="notification-button"
                aria-label="Notifications"
              >
                <FaBell />
                <span>3</span>
              </button>
              <img src={data.admin.avatar} alt="" />
              <div>
                <strong>{user?.firstname} {user?.lastname}</strong>
                <small>{data.admin.role}</small>
              </div>
              <span>⌄</span>
            </div>
          </header>

          <section className="flex flex-col sm:flex-row gap-6 mb-6">
            <MetricCard metric={data.metrics[0]} />
            <MetricCard metric={data.metrics[1]} />
            <MetricCard metric={{ ...data.metrics[2], value: metricVal }} />
          </section>

          <section className="overview-grid">
            <TrafficMap image={data.map.image} markers={data.map.markers} />
            <CameraFeeds
              feeds={data.cameraFeeds}
              videoIds={data.youtubeVideoIds}
            />
          </section>

          <section className="bottom-grid">
            <TrafficTrends {...data.trafficTrends} />
            <Congestion />
            <Alerts />
          </section>

          <footer className="mobile-footer">
            {data.location} · Dashboard demo
          </footer>
        </main>
      </div>

      <AlertModal
        openAlert={openAlert}
        closeAlert={closeAlert}
        metricVal={metricVal}
        setMetricVal={setMetricVal}
      />
    </>
  );
}
