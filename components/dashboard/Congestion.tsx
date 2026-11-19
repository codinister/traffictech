import { FaLocationDot } from "react-icons/fa6";
import type { dashboardDataTypes } from "../../types/dashboardTypes";
import dashboard from '../../data/dashboard.json';

function Congestion() {

const data = dashboard as dashboardDataTypes

  return (
    <section className="panel congestion-panel">
      <div className="panel-heading">
        <h2>
          <FaLocationDot className="text-blue-600" />
          Top Congested Areas
        </h2>
      </div>
      {data.congestedAreas.map((area, i) => (
        <div className="congestion-row" key={area.name}>
          <span className="rank">{i + 1}</span>
          <strong>{area.name}</strong>
          <span
            className={`congestion-score ${area.level >= 90 ? 'critical' : area.level >= 75 ? 'warning' : 'normal'}`}
          >
            {area.level}%
          </span>
        </div>
      ))}
    </section>
  );
}

export default Congestion