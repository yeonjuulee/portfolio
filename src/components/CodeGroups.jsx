import { useState } from "react";
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
        <article key={g.title} className={`cg${g.ai && showAi ? " is-ai" : ""}`}>
          <header className="cg__head">
            <h3>
              <span>{i + 1}</span>
              {g.title}
            </h3>
            <span className={`chip ${g.ai ? "chip--ai" : "chip--ink"}`}>{g.ai ? "AI 보완" : "직접 작성"}</span>
          </header>
          <pre className="cg__code" tabIndex={0} role="region" aria-label={`${g.title} 코드`}>
            <code>{g.lines.join("\n")}</code>
          </pre>
        </article>
      ))}
    </div>
  );
}
