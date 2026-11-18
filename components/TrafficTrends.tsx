import type { ReactNode } from "react";
import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function TrafficTrends({ labels, vehicles, speed }: { labels: string[]; vehicles: number[]; speed: number[] }) {
  const [period, setPeriod] = useState("Last 24 Hours");
  const width = 520, height = 190, left = 42, top = 12, chartW = 465, chartH = 145;
  const line = (values: number[]) => values.map((v, i) => `${left + i * chartW / (values.length - 1)},${top + chartH - v / 1500 * chartH}`).join(" ");
  return <section className="panel trends-panel">
    <div className="panel-heading"><h2><FaArrowTrendUp className="text-blue-600" />Traffic Trends</h2><select className="period-select" value={period} onChange={e => setPeriod(e.target.value)}><option>Last 24 Hours</option><option>Last 7 Days</option><option>Last 30 Days</option></select></div>
    <div className="chart-legend"><span><i className="bg-blue-600" />Vehicles</span><span><i className="bg-green-500" />Average Speed (km/h)</span></div>
    <svg viewBox={`0 0 ${width} ${height}`} className="trend-chart" role="img" aria-label={`Traffic trends: ${period}`}>
      {[0,500,1000,1500].map(v => { const y = top + chartH - v / 1500 * chartH; return <g key={v}><line x1={left} y1={y} x2={left + chartW} y2={y} stroke="#dce6fb" /><text x="30" y={y + 4} textAnchor="end" className="axis-text">{v.toLocaleString()}</text></g>; })}
      {labels.map((label, i) => <g key={label + i}><line x1={left + i * chartW / (labels.length - 1)} y1={top} x2={left + i * chartW / (labels.length - 1)} y2={top + chartH} stroke="#e7edfa" /><text x={left + i * chartW / (labels.length - 1)} y="178" textAnchor="middle" className="axis-text">{i % 2 === 0 ? label : ""}</text></g>)}
      <polyline points={line(vehicles)} fill="none" stroke="#1762ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={line(speed)} fill="none" stroke="#18c96d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </section>;
}
