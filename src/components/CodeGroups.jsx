import { useRef, useState } from "react";
import { asset } from "../utils/asset";
import "./CodeGroups.css";

// 코드를 "한 덩어리"가 아니라 기능 단위 묶음으로 보여주고, 묶음마다 출처(직접 작성 / AI 보완)를 표기합니다.
export default function CodeGroups({ groups }) {
  const [showAi, setShowAi] = useState(false);
  const aiCount = groups.filter((g) => g.ai).length;

  return (
    <div className="cgs">
      <div className="cgs__bar">
        <button
          type="button"
          className="cgs__toggle"
          aria-pressed={showAi}
          onClick={() => setShowAi((v) => !v)}
        >
          <span aria-hidden="true" />
          AI 보완 부분 강조
        </button>
        <p>
          코드 묶음 {groups.length}개 중 직접 작성 {groups.length - aiCount} · AI 보완 {aiCount}
        </p>
      </div>

      {groups.map((g, i) => (
        <CodeGroup key={g.title} g={g} index={i} showAi={showAi} />
      ))}
    </div>
  );
}

// 코드 패널(왼쪽)과 결과 영상(오른쪽 10%). 영상에 마우스를 올리거나 포커스하면 코드가 왼쪽으로 밀리고 영상이 넓어집니다.
// g.video 가 비어 있으면 회색 자리표시만 보이고, 파일 경로를 넣으면 영상이 재생됩니다. (예: video: "/video/code/nop-slider.mp4")
function CodeGroup({ g, index, showAi }) {
  const ref = useRef(null);
  const timer = useRef(null);

  // 마우스를 올리거나 포커스할 때만 재생합니다. 올릴 때마다 처음부터 보여 줍니다(어느 장면부터 시작하는지 헷갈리지 않도록).
  // 칸이 넓어지는 모션(약 0.5초)이 끝난 뒤 재생을 시작해, 앞부분을 놓치지 않게 합니다.
  const start = () => {
    const v = ref.current;
    if (!v) return;
    clearTimeout(timer.current);
    v.pause();
    v.currentTime = 0;
    timer.current = setTimeout(() => v.play().catch(() => {}), 500);
  };
  const stop = () => {
    clearTimeout(timer.current);
    if (ref.current) ref.current.pause();
  };
  // 마우스가 없는 기기(터치)에서는 눌러서 재생/정지합니다.
  const tapToggle = () => {
    const v = ref.current;
    if (!v || !window.matchMedia || !window.matchMedia("(hover: none)").matches) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <article className={`cg${g.ai && showAi ? " is-ai" : ""}`}>
      <header className="cg__head">
        <h3>
          <span>{index + 1}</span>
          {g.title}
        </h3>
        <span className={`chip ${g.ai ? "chip--ai" : "chip--ink"}`}>{g.ai ? "AI 보완" : "직접 작성"}</span>
      </header>
      <div className="cg__row">
        <div className="cg__panel">
          <pre className="cg__code" tabIndex={0} role="region" aria-label={`${g.title} 코드`}>
            <code>{g.lines.join("\n")}</code>
          </pre>
        </div>

        <div
          className="cg__vid"
          tabIndex={0}
          role="button"
          aria-label={`${g.title} 결과 영상 보기`}
          onMouseEnter={start}
          onMouseLeave={stop}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && start()}
          onBlur={stop}
          onClick={tapToggle}
        >
          <div className="cg__tab" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="21" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M18 14l12 8-12 8z" fill="currentColor" />
            </svg>
            <span>결과 영상</span>
          </div>
          <div className="cg__frame">
            {g.video ? (
              <video ref={ref} src={asset(g.video)} muted loop playsInline preload="metadata" />
            ) : (
              <p>결과 영상 준비 중</p>
            )}
          </div>
        </div>
      </div>
      {(g.why || g.limit) && (
        <dl className="cg__notes">
          {g.why && (
            <div>
              <dt>핵심 판단</dt>
              <dd>{g.why}</dd>
            </div>
          )}
          {g.limit && (
            <div>
              <dt>한계와 개선</dt>
              <dd>{g.limit}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}
