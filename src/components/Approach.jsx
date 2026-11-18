import { Link } from "react-router-dom";
import "./Approach.css";

// 기획 · 설계 · 구현 · 개선 흐름으로 정리한 일하는 방식 네 단계입니다.
// evidence: 각 단계를 보여 주는 근거 프로젝트(slug 는 projects.js 와 같아야 합니다).
const STEPS = [
  {
    mark: "기획",
    title: "사용자와 목적을 먼저 정의한다",
    tagline: "화려함보다 서비스의 본질을 우선합니다",
    desc: "누가 어떤 문제를 겪는지, 서비스가 무엇을 전달해야 하는지부터 정리합니다. 단순한 시각적 효과보다 사용자가 기능과 메시지를 가장 직관적으로 이해할 수 있는 방향을 고민합니다.",
    evidence: [
      { slug: "oreum", label: "Oreum" },
      { slug: "lookback", label: "LOOK BACK" },
    ],
  },
  {
    mark: "설계",
    title: "정보 구조와 화면 흐름을 시각 체계로 옮긴다",
    tagline: "만들기 전에 구조와 톤을 먼저 정합니다",
    desc: "정리한 목적을 화면 구성, 사용자 흐름, 색과 서체 같은 시각 규칙으로 옮깁니다. Figma로 시안을 만들고, 개발 단계에서 구현할 수 있는 구조인지 함께 따져 봅니다.",
    evidence: [
      { slug: "canada-aurora", label: "CANADA AURORA" },
      { slug: "fruiting", label: "FRUITING" },
    ],
  },
  {
    mark: "구현",
    title: "AI와의 역할 분담으로 개발 효율을 높인다",
    tagline: "메인 AI는 기능 구현, 보조 AI는 검토와 정리",
    desc: "AI를 협업 도구로 활용해 메인 AI에는 컴포넌트 단위 구현을, 보조 AI에는 요구사항 검토를 맡기며 완성도 높은 구조를 체계적으로 만들어갑니다.",
    evidence: [
      { slug: "nop", label: "NOP!" },
      { slug: "oreum", label: "Oreum" },
    ],
  },
  {
    mark: "개선",
    title: "사용자 입장에서 직접 써보고 고친다",
    tagline: "1차 구현에 안주하지 않고 끝까지 다듬습니다",
    desc: "결과물을 직접 경험하며 몰입을 방해하거나 피로감을 주는 지점을 찾습니다. 시선 이동이나 스캔 과정처럼 전달력이 부족한 부분은 구현 방식을 망설임 없이 변경해 완성도를 극대화합니다.",
    evidence: [
      { slug: "oreum", label: "Oreum · 휠 관성" },
      { slug: "bingsu", label: "氷水 · 해상도 대응" },
    ],
  },
];

export default function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container">
        <div className="approach__layout">
          <div className="approach__side">
            <h2 id="approach-title" className="sec-title">
              Approach <span>03</span>
            </h2>
            <p className="section-lead">기획에서 개선까지, 한 흐름으로 일합니다</p>
          </div>

          <ol className="approach__list">
            {STEPS.map((s, i) => (
              <li className="step card" key={s.title} style={{ "--i": i }}>
                <span className="step__no" aria-hidden="true">
                  {s.mark}
                </span>
                <div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__tag">{s.tagline}</p>
                  <p className="step__desc">{s.desc}</p>
                  {s.evidence && s.evidence.length > 0 && (
                    <div className="step__ev">
                      <span>근거 프로젝트</span>
                      {s.evidence.map((e) => (
                        <Link key={e.slug + e.label} to={`/project/${e.slug}`} className="step__chip">
                          {e.label} <i aria-hidden="true">↗</i>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
