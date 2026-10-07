const TIMELINE = [
  { period: "2024.03", title: "계원예술대학교 디지털미디어디자인학과 입학" },
  { period: "20XX.09", title: "학력/이력" },
  { period: "20XX.03 – 20XX.06", title: "학력/이력" },
  { period: "20XX.07 – 20XX.10", title: "학력/이력" },
];

export default function About({ onResumeClick }) {
  return (
    <section id="about">
      <div className="wrap">
        <p className="eyebrow">About Me</p>
        <div className="about-grid">
          <div>
            <div className="avatar">K</div>
            <p className="avatar-name">이연주</p>
            <p className="avatar-role">
              디지털미디어디자인과
              <br />
              프로그래밍 세부전공
            </p>
          </div>

          <div>
            <p className="about-sub-label">개발 철학 및 목표</p>
            <div className="pill-sentence">
              <span className="pill outline">사용자의 경험을</span>
              <span className="pill fill">고민하고</span>
              <span className="pill outline">더 나은 방법을</span>
              <span className="pill fill">끊임없이 찾습니다.</span>
            </div>
            <p className="about-desc">
              1차 구현에 만족하지 않고 사용자의 입장에서 결과물을 직접 바라보며 문제를 발견합니다. 이후 새로운 기술과 AI를 적극적으로 활용하되, 코드를 이해하고 스스로 수정·응용하며 더 나은 경험을 만들어갑니다.
            </p>

            <p className="about-sub-label">학력 및 이력</p>
            <ul className="timeline">
              {TIMELINE.map((item) => (
                <li key={item.title}>
                  <span className="t-period mono">{item.period}</span>
                  <p className="t-title">{item.title}</p>
                </li>
              ))}
            </ul>

            <div className="doc-actions">
              <button className="btn btn-primary" onClick={onResumeClick}>
                이력서 PDF 다운로드
              </button>
              <button className="btn btn-ghost" onClick={onResumeClick}>
                포트폴리오 PDF 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}