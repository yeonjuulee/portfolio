import { Link } from "react-router-dom";

const STACKS = [
  {
    name: "JavaScript",
    note: "(Vanilla JS)",
    period: "6개월+",
    level: "실무 활용 가능",
    scope: [
      "대사 스크립트 및 UI 데이터의 배열 객체화와 동적 DOM 렌더링 추상화",
      "Event Listener 기반 사용자 인터랙션 및 좌표 제어 (마우스/터치 대응)",
      "Image 객체 기반 에셋 사전 로딩(Preload) 및 비동기 파이프라인 제어",
    ],
    projects: [{ slug: "lookback", label: "Look Back" }],
  },
  {
    name: "React",
    note: "",
    period: "6개월+",
    level: "학습 및 적용 중",
    scope: [
      "컴포넌트 단위 UI 설계 및 상태(state) 기반 화면 갱신",
      "Open API 연동을 통한 실시간 데이터 fetch 및 렌더링",
      "props/state 흐름을 고려한 컴포넌트 구조 설계",
    ],
    projects: [{ slug: "fruit", label: "실시간 과일 시세 웹" }],
  },
  {
    name: "HTML / CSS",
    note: "(Responsive)",
    period: "1년+",
    level: "실무 활용 가능",
    scope: [
      "미디어 쿼리 기반 브레이크포인트 수립 및 반응형 레이아웃 대응",
      "유연한 단위(rem, %, vh/vw)와 Flex/Grid로 화면 깨짐 · 오버플로우 방지",
      "트랜지션 및 페이드인 애니메이션을 통한 사용자 경험 개선",
    ],
    projects: [
      { slug: "nop", label: "NOP!" },
      { slug: "lookback", label: "Look Back" },
    ],
  },
];

const TOOL_SCOPE = [
  "Figma 기반 디자인 시안 검토 및 퍼블리싱 매핑",
  "Git / GitHub을 통한 버전 관리 및 협업",
  "AI 도구를 활용한 개발 생산성 및 트러블슈팅 보조",
];

function CheckIcon() {
  return (
    <svg className="ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

export default function Skills({ onExternalSkillClick }) {
  return (
    <section id="skills">
      <div className="wrap">
        <p className="eyebrow">Tech Stack</p>
        <h2 className="sec-title">퍼센트가 아닌, 실제로 구현할 수 있는 범위로 기술을 설명합니다</h2>
        <p className="sec-note">역량 수준은 추정이 아닌 실제 프로젝트 투입 이력을 기준으로 표기합니다.</p>

        <div className="stack-grid">
          {STACKS.map((stack) => (
            <div className="stack-card" key={stack.name}>
              <div className="stack-head">
                <h3>
                  {stack.name} {stack.note && <span className="stack-note">{stack.note}</span>}
                </h3>
              </div>
              <div className="stack-meta">
                <span>
                  사용 기간 · <b>{stack.period}</b>
                </span>
                <span>
                  역량 · <b>{stack.level}</b>
                </span>
              </div>
              <p className="stack-label">구현 가능 범위</p>
              <ul className="stack-list">
                {stack.scope.map((line) => (
                  <li key={line}>
                    <CheckIcon />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="stack-label">활용 프로젝트</p>
              <div className="stack-tags">
                {stack.projects.map((p) => (
                  <Link key={p.slug} to={`/project/${p.slug}`} className="stack-tag">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="stack-card">
            <div className="stack-head">
              <h3>협업 및 도구</h3>
            </div>
            <p className="stack-label">구현 가능 범위</p>
            <ul className="stack-list">
              {TOOL_SCOPE.map((line) => (
                <li key={line}>
                  <CheckIcon />
                  {line}
                </li>
              ))}
            </ul>
            <button className="skill-external" onClick={onExternalSkillClick}>
              디자인 · 기획 역량 더 보기
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}