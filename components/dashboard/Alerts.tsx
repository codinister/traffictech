import { FaBell, FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6";
import type { dashboardDataTypes } from "../../types/dashboardTypes";
import dashboard from '../../data/dashboard.json';

function Alerts() {
  const icons = {
    High: FaTriangleExclamation,
    Medium: FaTriangleExclamation,
    Info: FaCircleInfo,
  };

  const data = dashboard as dashboardDataTypes



  return (
    <section className="panel alerts-panel">
      <div className="panel-heading">
        <h2>
          <FaBell className="text-blue-600" />
          Recent Alerts
        </h2>
        <button className="link-button">View All →</button>
      </div>
      {data.alerts.map((alert) => {
        const Icon = icons[alert.severity];
        return (
          <div className="alert-row" key={alert.title}>
            <span className={`alert-icon ${alert.severity.toLowerCase()}`}>
              <Icon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="alert-title">{alert.title}</p>
              <p className="alert-time">
                {alert.time} • {alert.age}
              </p>
            </div>
            <span className={`severity ${alert.severity.toLowerCase()}`}>
              {alert.severity}
            </span>
          </div>
        );
      })}
    </section>
  );
}

export default Alerts