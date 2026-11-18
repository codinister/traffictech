import { useState } from "react";
import YouTube from "react-youtube";
import { FaVideo, FaXmark } from "react-icons/fa6";
import type { CameraFeed } from "../types";

export default function CameraFeeds({ feeds, videoIds }: { feeds: CameraFeed[]; videoIds: string[] }) {
  const [video, setVideo] = useState<string | null>(null);
  return <>
    <section className="panel">
      <div className="panel-heading"><h2><FaVideo className="text-blue-600" />Live Camera Feeds</h2><button className="link-button" onClick={() => setVideo(videoIds[0])}>View All →</button></div>
      <div className="camera-grid">{feeds.map((feed, i) => <button className="camera-tile" key={feed.title} onClick={() => setVideo(videoIds[i % videoIds.length])}>
        <img src={feed.image} alt={`${feed.title} traffic camera`} loading="lazy" />
        <span className="camera-caption"><i />{feed.title}</span>
      </button>)}</div>
    </section>
    {video && <div className="modal-backdrop" onClick={() => setVideo(null)}><div className="video-modal" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between p-3"><strong>Traffic camera video</strong><button onClick={() => setVideo(null)} aria-label="Close video"><FaXmark /></button></div>
      <YouTube videoId={video} opts={{ width: "100%", height: "420", playerVars: { autoplay: 1 } }} />
      <p className="p-3 text-xs text-slate-500">Demo YouTube player. Replace the sample video IDs in <code>dashboard.json</code> with your approved live-stream IDs.</p>
    </div></div>}
  </>;
}
