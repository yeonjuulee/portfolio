import { useState } from "react";

// lines: [{ text: string, ai: boolean }]
export default function CodeBlock({ lines, caption }) {
  const [showAi, setShowAi] = useState(false);

  return (
    <>
      <div className="code-toolbar">
        <button
          type="button"
          className="code-toggle"
          aria-pressed={showAi}
          onClick={() => setShowAi((v) => !v)}
        >
          <span className="dot" />
          AI 활용 부분 보기
        </button>
        <span className="hint">강조되는 부분이 AI와 함께 작성한 코드입니다.</span>
      </div>

      <div className={`code-block ${showAi ? "show-ai" : ""}`}>
        <div className="code-lines">
          {lines.map((line, i) => (
            <div key={i} className={`code-line ${line.ai ? "ai-line" : ""}`}>
              {line.text === "" ? "\u00A0" : line.text}
            </div>
          ))}
        </div>
      </div>

      {caption && <p className="code-caption">{caption}</p>}
    </>
  );
}