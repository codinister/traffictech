export interface Metric {
  label: string;
  value: string;
  detail?: string;
  change?: string;
  direction?: "up" | "down";
  tone: "blue" | "green" | "orange" | "red";
  icon: string;
  points: number[];
}
export interface CameraFeed {
  title: string;
  image: string;
  youtubeId?: string;
}
export interface CongestedArea {
  name: string;
  level: number;
}
export interface AlertItem {
  title: string;
  time: string;
  age: string;
  severity: "High" | "Medium" | "Info";
}
