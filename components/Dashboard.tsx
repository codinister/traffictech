import dashboard from "../data/dashboard.json";
import type { Metric, CameraFeed, CongestedArea, AlertItem } from "../types";
import MetricCard from "../components/MetricCard";
import TrafficMap from "../components/TrafficMap";
import CameraFeeds from "../components/CameraFeeds";
import TrafficTrends from "../components/TrafficTrends";
import { FaHouse, FaVideo, FaChartColumn, FaTriangleExclamation, FaFileLines, FaGear, FaUsers, FaArrowRightFromBracket, FaBell, FaLocationDot, FaBars, FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";

const data = dashboard as {
  admin: { name: string; role: string; avatar: string }; location: string; lastUpdated: string;
  metrics: Metric[]; cameraFeeds: CameraFeed[]; congestedAreas: CongestedArea[]; alerts: AlertItem[];
  trafficTrends: { labels: string[]; vehicles: number[]; speed: number[] };
  map: { image: string; markers: { label: string; left: string; top: string; kind: string }[] };
  youtubeVideoIds: string[];
};
const nav = [
  { label: "Dashboard", icon: FaHouse }, { label: "Live Cameras", icon: FaVideo },
  { label: "Traffic Analytics", icon: FaChartColumn }, { label: "Alerts", icon: FaTriangleExclamation },
  { label: "Reports", icon: FaFileLines }, { label: "Settings", icon: FaGear },
  { label: "Users", icon: FaUsers }, { label: "Logout", icon: FaArrowRightFromBracket }
];
function Sidebar({ active, setActive, open, close }: { active: string; setActive: (v: string) => void; open: boolean; close: () => void }) {
  return <><div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={close} />
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><span /><span /><span /></div><div className="brand-name">Traffic<span>Tech</span></div><p>Smarter Traffic. Safer City.</p></div>
      <nav>{nav.map(item => <button key={item.label} className={active === item.label ? "active" : ""} onClick={() => { setActive(item.label); close(); }}><item.icon />{item.label}</button>)}</nav>
      <div className="system-status"><span className="status-dot" /><strong>System Online</strong><p>Last update:<br />{data.lastUpdated}</p></div>
      <div className="sidebar-city" />
      <div className="sidebar-location"><FaLocationDot />{data.location}</div>
    </aside></>;
}
function Alerts() {
  const icons = { High: FaTriangleExclamation, Medium: FaTriangleExclamation, Info: FaCircleInfo };
  return <section className="panel alerts-panel"><div className="panel-heading"><h2><FaBell className="text-blue-600" />Recent Alerts</h2><button className="link-button">View All →</button></div>
    {data.alerts.map(alert => { const Icon = icons[alert.severity]; return <div className="alert-row" key={alert.title}><span className={`alert-icon ${alert.severity.toLowerCase()}`}><Icon /></span><div className="min-w-0 flex-1"><p className="alert-title">{alert.title}</p><p className="alert-time">{alert.time} • {alert.age}</p></div><span className={`severity ${alert.severity.toLowerCase()}`}>{alert.severity}</span></div>; })}
  </section>;
}
function Congestion() {
  return <section className="panel congestion-panel"><div className="panel-heading"><h2><FaLocationDot className="text-blue-600" />Top Congested Areas</h2></div>
    {data.congestedAreas.map((area, i) => <div className="congestion-row" key={area.name}><span className="rank">{i + 1}</span><strong>{area.name}</strong><span className={`congestion-score ${area.level >= 90 ? "critical" : area.level >= 75 ? "warning" : "normal"}`}>{area.level}%</span></div>)}
  </section>;
}
export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive} open={menuOpen} close={() => setMenuOpen(false)} />
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><FaBars /></button><div><h1>Welcome, Admin!</h1><p>Real-time traffic overview across Accra</p></div>
        <div className="profile-actions"><button className="notification-button" aria-label="Notifications"><FaBell /><span>3</span></button><img src={data.admin.avatar} alt="" /><div><strong>{data.admin.name}</strong><small>{data.admin.role}</small></div><span>⌄</span></div>
      </header>
      {active !== "Dashboard" && <div className="section-notice">You selected <strong>{active}</strong>. This starter currently presents the dashboard overview; connect this navigation item to its page when you build that module.</div>}
      <section className="metrics-grid">{data.metrics.map(metric => <MetricCard key={metric.label} metric={metric} />)}</section>
      <section className="overview-grid"><TrafficMap image={data.map.image} markers={data.map.markers} /><CameraFeeds feeds={data.cameraFeeds} videoIds={data.youtubeVideoIds} /></section>
      <section className="bottom-grid"><TrafficTrends {...data.trafficTrends} /><Congestion /><Alerts /></section>
      <footer className="mobile-footer">{data.location} · Dashboard demo</footer>
    </main>
  </div>;
}
