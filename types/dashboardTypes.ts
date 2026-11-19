import type { AlertItem, CameraFeed, CongestedArea, Metric } from '../types';

export type dashboardDataTypes = {
  admin: { name: string; role: string; avatar: string };
  location: string;
  lastUpdated: string;
  metrics: Metric[];
  cameraFeeds: CameraFeed[];
  congestedAreas: CongestedArea[];
  alerts: AlertItem[];
  trafficTrends: { labels: string[]; vehicles: number[]; speed: number[] };
  map: {
    image: string;
    markers: { label: string; left: string; top: string; kind: string }[];
  };
  youtubeVideoIds: string[];
};
