export default function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-left">
          <h1 className="hero-name disp">YEONJU</h1>

          <div className="hero-connector" aria-hidden="true">
            <span className="hero-connector-line" />
            <span className="hero-connector-arrow">↓</span>
          </div>

          <button
            type="button"
            className="hero-slogan-link"
            onMouseEnter={onOpenModal}
            onFocus={onOpenModal}
          >
            퍼센트가 아닌
            <br />
            사실로 증명하는
            <br />
            프론트엔드 개발자<span className="arrow">→</span>
          </button>
        </div>

        <div className="hero-right">
          <div className="stat-card stat-card-accent">
            <div className="stat-num disp">4+</div>
            <div className="stat-label">주요 참여 프로젝트</div>
          </div>

          <div className="stat-card">
            <div className="stat-num disp">3+</div>
            <div className="stat-label">핵심 개발스택</div>
          </div>
        </div>
      </div>
    </section>
  );
}