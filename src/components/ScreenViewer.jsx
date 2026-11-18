import { useEffect, useRef, useState } from "react";
import { asset } from "../utils/asset";
import ImagePlaceholder from "./ImagePlaceholder";
import "./ScreenViewer.css";

const fmt = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

// 화면 시안. 영상(screenVideo)이 있으면 영상 하나 + 장면 버튼, 없으면 큰 화면 한 장 + 썸네일 목록으로 한 장씩 봅니다.
//  screenVideo: { src, poster?, chapters: [{ label, time(초) }] }
export default function ScreenViewer({ project }) {
  const video = project.screenVideo;
  return video && video.src ? <VideoView video={video} name={project.name} /> : <GalleryView project={project} />;
}

function VideoView({ video, name }) {
  const ref = useRef(null);
  const [now, setNow] = useState(0);
  const chapters = video.chapters || [];
  // 평소에는 재생바 없이 소리 없이 자동 반복 재생합니다. "동작 줄이기" 설정이면 자동 재생 대신 재생바를 보여 줍니다.
  const [reduce] = useState(() => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // 지금 재생 위치가 속한 장면 번호
  let active = 0;
  chapters.forEach((c, i) => {
    if (now >= c.time) active = i;
  });

  const jump = (t) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
    v.play().catch(() => {});
  };

  return (
    <div className="sv">
      <div className="gray-box sv__stage" style={{ aspectRatio: video.ratio || "16 / 9" }}>
        <video
          ref={ref}
          src={asset(video.src)}
          poster={video.poster ? asset(video.poster) : undefined}
          autoPlay={!reduce}
          loop
          controls={reduce}
          muted
          playsInline
          preload="metadata"
          aria-label={`${name} 화면 시안 영상`}
          onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)}
        />
      </div>
      {chapters.length > 0 && (
        <div className="sv__chapters" role="group" aria-label="장면 이동">
          {chapters.map((c, i) => (
            <button key={c.label} type="button" className={i === active ? "is-on" : ""} aria-pressed={i === active} onClick={() => jump(c.time)}>
              {c.label}
              <small>{fmt(c.time)}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryView({ project }) {
  const list = project.screens && project.screens.length > 0 ? project.screens : [null, null, null, null];
  const [idx, setIdx] = useState(0);
  const ratio = project.screenRatio || "16 / 10";

  useEffect(() => setIdx(0), [project.slug]);

  return (
    <div className="sv">
      <ImagePlaceholder
        className="sv__stage"
        ratio={ratio}
        src={list[idx] || undefined}
        alt={`${project.name} 화면 ${idx + 1}`}
        label={`SCREEN ${idx + 1}`}
      />
      {list.length > 1 && (
        <>
          <p className="sv__count" aria-live="polite">
            {idx + 1} / {list.length}
          </p>
          <div className="sv__thumbs" role="group" aria-label="화면 선택">
            {list.map((src, i) => (
              <button key={src || i} type="button" className={i === idx ? "is-on" : ""} aria-pressed={i === idx} aria-label={`화면 ${i + 1}`} onClick={() => setIdx(i)}>
                {src ? <img src={asset(src)} alt="" loading="lazy" /> : <span>{i + 1}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
