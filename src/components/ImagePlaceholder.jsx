import { useEffect, useState } from "react";

// "동작 줄이기" 설정이면 영상을 자동 재생하지 않고 컨트롤을 보여줍니다.
function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

// 작업물/프로필 이미지가 들어갈 자리. src를 넘기면 실제 이미지(또는 video)로 바뀝니다.
export default function ImagePlaceholder({ label, ratio = "4 / 3", src, video, className = "", alt = "" }) {
  const reduce = useReducedMotion();
  return (
    <div className={`gray-box ${className}`} style={{ aspectRatio: ratio }}>
      {video ? (
        <video src={video} poster={src} autoPlay={!reduce} loop={!reduce} muted playsInline controls={reduce} aria-label={alt || label} />
      ) : src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
