import "./Approach.css";

// 기획 · 구현 · 개선 흐름으로 정리한 일하는 방식 세 단계입니다.
const STEPS = [
  {
    mark: "기획",
    title: "목적에 맞는 인터랙션을 설계한다",
    tagline: "화려함보다 서비스의 본질을 우선합니다",
    desc: "단순한 시각적 효과에 치중하기보다, 사용자가 서비스의 기능과 메시지를 가장 직관적으로 이해할 수 있는 최적의 인터랙션을 고민하고 설계합니다.",
  },
  {
    mark: "구현",
    title: "AI와의 역할 분담으로 개발 효율을 높인다",
    tagline: "메인 AI는 기능 구현, 보조 AI는 검토와 정리",
    desc: "AI를 협업 도구로 활용해 메인 AI에는 컴포넌트 단위 구현을, 보조 AI에는 요구사항 검토를 맡기며 완성도 높은 구조를 체계적으로 만들어갑니다.",
  },
  {
    mark: "개선",
    title: "사용자 입장에서 직접 써보고 고친다",
    tagline: "1차 구현에 안주하지 않고 끝까지 다듬습니다",
    desc: "결과물을 직접 경험하며 몰입을 방해하거나 피로감을 주는 지점을 찾습니다. 시선 이동이나 스캔 과정처럼 전달력이 부족한 부분은 구현 방식을 망설임 없이 변경해 완성도를 극대화합니다.",
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
            <p className="section-lead">일하는 방식은 세 줄로 정리됩니다</p>
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
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
