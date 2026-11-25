import { Link } from "react-router-dom";
import "./Approach.css";

// Skill 섹션을 합친 "일하는 방식". 기획 · 설계 · 구현 · 개선 네 단계 카드에
// 단계별 역량(판단 · 실행 · 결과)과 근거 프로젝트를 담았습니다. slug 는 projects.js 와 같아야 합니다.
// caps[].parts : [라벨, 문장] 쌍. 한 줄씩 나뉘어 보입니다.
const STEPS = [
  {
    mark: "기획",
    title: "사용자와 목적을 먼저 정의한다",
    tagline: "화려함보다 서비스의 본질을 우선합니다",
    caps: [
      {
        name: "스토리텔링과 정보 구조 설계",
        parts: [
          ["판단", "기능 나열 대신 문제를 먼저 체감하는 스토리 흐름으로 소개하자고 제안했습니다."],
          ["실행", "스토리를 직접 작성했습니다."],
        ],
      },
      {
        name: "마이크로 인터랙션과 사용성",
        parts: [
          ["판단", "스캔 기능을 이미지와 글로만 설명하면 작동 흐름이 전달되지 않는다고 봤습니다."],
          ["실행", "버튼으로 단계가 바뀌는 시뮬레이션을 제안했습니다."],
        ],
      },
    ],
    evidence: [
      { slug: "oreum", label: "Oreum" },
      { slug: "nop", label: "NOP!" },
    ],
  },
  {
    mark: "설계",
    title: "정보 구조와 화면 흐름을 시각 체계로 옮긴다",
    tagline: "만들기 전에 구조와 톤을 먼저 정합니다",
    caps: [
      {
        name: "일관된 톤과 시각 규칙",
        parts: [
          ["판단", "디자인 일관성을 위해 스토리 페이지를 도트로 통일했습니다."],
          ["실행", "어두운 밤의 점에서 밝은 화면과 브랜드 오렌지로 색을 전환했습니다."],
        ],
      },
      {
        name: "웹 접근성",
        parts: [
          ["판단", "스크린 리더, 키보드, 색 대비 같은 접근성 기준을 이해하고, 다양한 환경의 사용자를 배려하는 설계가 공감의 기술적 실현이라고 생각했습니다."],
          ["실행", "서비스 디자인에서 색 대비 기준을 확인해 글자와 배경 색을 정했습니다."],
        ],
      },
    ],
    evidence: [
      { slug: "oreum", label: "Oreum" },
      { slug: "lookback", label: "LOOK BACK" },
    ],
  },
  {
    mark: "구현",
    title: "AI와의 역할 분담으로 개발 효율을 높인다",
    tagline: "메인 AI는 기능 구현, 보조 AI는 검토와 정리",
    caps: [
      {
        name: "AI 역할 분담",
        parts: [
          ["판단", "한 AI에게 수정을 한꺼번에 맡기면 일부가 누락됐습니다."],
          ["실행", "수정을 컴포넌트 단위로 나누고 보조 AI로 변경 범위를 정리해 메인 AI에 전달했습니다."],
        ],
      },
      {
        name: "로직과 표현의 분리",
        parts: [
          ["판단", "화면 전환까지 JS가 맡으면 시나리오가 늘 때마다 코드가 불어납니다."],
          ["실행", "JS는 상태 클래스만 바꾸고 전환은 CSS가 맡게 했습니다."],
        ],
      },
    ],
    evidence: [
      { slug: "nop", label: "NOP!" },
      { slug: "oreum", label: "Oreum" },
    ],
  },
  {
    mark: "개선",
    title: "사용자 입장에서 직접 써보고 고친다",
    tagline: "1차 구현에 안주하지 않고 끝까지 다듬습니다",
    caps: [
      {
        name: "사용자 시점 점검",
        parts: [
          ["실행", "AI에게 20대 은둔 청년 역할을 줘 사이트를 처음 본 느낌을 물었습니다."],
          ["결과", "리워드 사용법이 어렵다는 답을 받아 설명을 추가했습니다."],
        ],
      },
      {
        name: "입력 처리와 해상도 대응",
        parts: [
          ["판단", "트랙패드 관성으로 장면이 여러 칸 넘어가고, 노트북마다 화면 크기가 달랐습니다."],
          ["실행", "이벤트 간격으로 새 스크롤만 인식하고 상대 단위로 바꿨습니다."],
        ],
      },
    ],
    evidence: [
      { slug: "oreum", label: "Oreum · 휠 관성" },
      { slug: "bingsu", label: "氷水 · 해상도 대응" },
    ],
  },
];

const TOOLS = ["HTML / CSS", "JavaScript", "React", "p5.js", "Figma", "Git / GitHub", "AI 도구 (메인 · 보조)"];

export default function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container">
        <div className="approach__layout">
          <div className="approach__side">
            <h2 id="approach-title" className="sec-title">
              Approach <span>02</span>
            </h2>
            <p className="section-lead">
              기획에서 개선까지,
              <br />
              한 흐름으로 일합니다
            </p>
          </div>

          <ol className="approach__list">
            {STEPS.map((s, i) => (
              <li className="step card" key={s.mark} style={{ "--i": i }}>
                <span className="step__no" aria-hidden="true">
                  {s.mark}
                </span>
                <div>
                  <h3 className="step__title">
                    <span className="sr-only">{s.mark}. </span>
                    {s.title}
                  </h3>
                  <p className="step__tag">{s.tagline}</p>

                  <div className="step__caps">
                    {s.caps.map((c) => (
                      <div className="cap" key={c.name}>
                        <h4>{c.name}</h4>
                        {c.parts.map(([label, text]) => (
                          <p key={label}>
                            <b>{label}</b> {text}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="step__ev">
                    <span>근거 프로젝트</span>
                    {s.evidence.map((e) => (
                      <Link key={e.slug + e.label} to={`/project/${e.slug}`} className="step__chip">
                        {e.label} <i aria-hidden="true">↗</i>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            {/* 마지막 카드도 고정되도록 남겨 두는 스크롤 여유. 끝나면 제목과 카드가 함께 올라갑니다. */}
            <li className="approach__room" aria-hidden="true" />
          </ol>
        </div>

        <div className="approach__tools">
          <span>사용 도구</span>
          <ul>
            {TOOLS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
