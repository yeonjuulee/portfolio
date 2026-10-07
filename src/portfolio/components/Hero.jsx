export default function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-top">
          <p className="hero-intro">
            <b>보는 사람의 입장에서 포트폴리오를 설계합니다.</b>필요한 정보를 빠르게 찾고, 결과물과 개발 과정을 직접 경험할 수 있도록 구성했습니다.
          </p>
          <h1 className="hero-title disp">
            퍼센트가 아닌 사실로<span className="dash" />
            증명하는 프론트엔드 개발자
            <br />
            사용자가 <span className="arrow">→</span>직접 체감하는 경험을 코드로 설계합니다
          </h1>
        </div>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            프로젝트 보기
          </a>
          <button type="button" className="btn btn-ghost" onClick={onOpenModal}>
            한눈에 보기
          </button>
        </div>

        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-num">
              3<span>+</span>
            </div>
            <div className="stat-label">참여 프로젝트</div>
          </div>
          {/* <div className="stat-card">
            <div className="stat-num">
              2<span>+</span>
            </div>
            <div className="stat-label">트러블슈팅 해결 사례</div>
          </div> */}
          <div className="stat-card">
            <div className="stat-num">
              4<span>+</span>
            </div>
            <div className="stat-label">핵심 기술 스택</div>
          </div>
        </div>
      </div>

      <a href="#projects" className="cta-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
        VIEW ALL PROJECTS
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </a>
    </section>
  );
}