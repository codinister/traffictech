import { FaCamera, FaPlane, FaTriangleExclamation, FaPlus, FaMinus } from "react-icons/fa6";
import { useState } from "react";

type Marker = { label: string; left: string; top: string; kind: string };
export default function TrafficMap({ image, markers }: { image: string; markers: Marker[] }) {
  const [zoom, setZoom] = useState(1);
  return <section className="panel overflow-hidden">
    <div className="panel-heading"><h2><span className="heading-icon">▥</span>Live Traffic Map</h2><div className="flex items-center gap-2 text-sm"><span className="h-3 w-3 rounded-full bg-green-500" />Live <span className="text-slate-300">|</span> 10:15 AM <span className="ml-2">⟳</span></div></div>
    <div className="map-canvas">
      <div className="map-image" style={{ backgroundImage: `url(${image})`, transform: `scale(${zoom})` }} />
      <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
      <span className="map-city">Accra</span>
      {markers.map((m) => <div key={m.label} className={`map-marker ${m.kind}`} style={{ left: m.left, top: m.top }} title={m.label}>
        {m.kind === "camera" ? <FaCamera /> : m.kind === "plane" ? <FaPlane /> : <FaTriangleExclamation />}
      </div>)}
      {markers.map(m => <span key={`${m.label}-label`} className="map-label" style={{ left: m.left, top: `calc(${m.top} + 25px)` }}>{m.label}</span>)}
      <div className="map-legend"><span><i className="bg-green-500" />Free Flow</span><span><i className="bg-amber-400" />Moderate</span><span><i className="bg-red-500" />Heavy</span></div>
      <div className="map-zoom"><button onClick={() => setZoom(z => Math.min(1.5, z + .1))} aria-label="Zoom in"><FaPlus /></button><button onClick={() => setZoom(z => Math.max(1, z - .1))} aria-label="Zoom out"><FaMinus /></button></div>
    </div>
  </section>;
}
