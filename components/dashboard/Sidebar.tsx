import { dashboardDataTypes } from "../../types/dashboardTypes";
import navLinks from "../../utils/navLinks";
import dashboard from '../../data/dashboard.json';
import { FaLocationDot } from "react-icons/fa6";

const Sidebar = ({
  active,
  setActive,
  open,
  close,
}: {
  active: string;
  setActive: (v: string) => void;
  open: boolean;
  close: () => void;
}) => {

const nav = navLinks()
const data = dashboard as dashboardDataTypes


  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'show' : ''}`}
        onClick={close}
      />
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
         <img src="/logo.png" alt="Logo" className="w-15 mx-auto" />
          <div className="brand-name">
            Traffic<span>Tech</span>
          </div>
          <p>Smarter Traffic. Safer City.</p>
        </div>
        <nav>
          {nav.map((item) => (
            <button
              key={item.label}
              className={active === item.label ? 'active' : ''}
              onClick={() => {
                setActive(item.label);
                close();
              }}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="system-status">
          <span className="status-dot" />
          <strong>System Online</strong>
          <p>
            Last update:
            <br />
            {data.lastUpdated}
          </p>
        </div>
        <div className="sidebar-city" />
        <div className="sidebar-location">
          <FaLocationDot />
          {data.location}
        </div>
      </aside>
    </>
  );
}

export default Sidebar