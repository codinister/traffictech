import type { Metric } from '../types';
import {
  FaCarSide,
  FaClock,
  FaTrafficLight,
  FaTriangleExclamation,
} from 'react-icons/fa6';

const iconMap = {
  car: FaCarSide,
  clock: FaClock,
  cone: FaTrafficLight,
  alert: FaTriangleExclamation,
};

function Sparkline({ points, tone }: { points: number[]; tone: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points
    .map(
      (p, i) =>
        `${(i / (points.length - 1)) * 100},${28 - ((p - min) / (max - min || 1)) * 24}`,
    )
    .join(' ');
  const colors: Record<string, string> = {
    blue: '#1762ff',
    green: '#21c987',
    orange: '#ff9b00',
    red: '#ff3152',
  };
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="h-10 w-full"
    >
      <polyline
        points={coords}
        fill="none"
        stroke={colors[tone]}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MetricCard({ metric }: { metric: Metric }) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || FaCarSide;
  return (
    <article className="metric-card flex-1">
      <div className={`metric-icon ${metric.tone}`}>
        <Icon />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <strong className="metric-value">{metric.value}</strong>
        </div>
        <p className="metric-label">
          {metric.label} <span>{metric.detail}</span>
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          {metric.change ? (
            <span
              className={`metric-change ${metric.direction === 'down' ? 'text-emerald-600' : 'text-green-600'}`}
            >
              {metric.direction === 'down' ? '↓' : '↑'} {metric.change}
            </span>
          ) : (
            <span />
          )}
          <div className="w-2/3">
            <Sparkline points={metric.points} tone={metric.tone} />
          </div>
        </div>
      </div>
    </article>
  );
}
