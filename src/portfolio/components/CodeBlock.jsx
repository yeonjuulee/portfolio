import { useState } from "react";

export default function CodeBlock({ groups, caption }) {
  const [showAi, setShowAi] = useState(false);

  return (
    <div>
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

      {groups.map((group, i) => (
        <div className={`code-group${group.ai && showAi ? " show-ai" : ""}`} key={group.title}>
          <div className="code-group-head">
            <h4 className="code-group-title">{`${i + 1}. ${group.title}`}</h4>
            <span className={`code-group-tag${group.ai ? " ai" : ""}`}>
              {group.ai ? "AI 보완" : "직접 작성"}
            </span>
          </div>

          <pre className="code-block">
            <div className="code-lines">
              {group.lines.map((line, li) => (
                <div className="code-line" key={li}>
                  {line}
                </div>
              ))}
            </div>
          </pre>
        </div>
      ))}

      {caption && <p className="code-caption">{caption}</p>}
    </div>
  );
}