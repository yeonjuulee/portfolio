import React, { useRef, useEffect, useState } from 'react';


export default function About() {
  const containerRef = useRef(null);
  const centerBoxRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  // SVG 커넥터 라인의 기본 좌표 (초기 렌더링용)
  const [lines, setLines] = useState({
    left: { x1: 172, y1: 100, x2: 252, y2: 135 },
    right: { x1: 408, y1: 228, x2: 475, y2: 215 },
  });

  // 브라우저 렌더링 후 실제 요소 위치를 기반으로 커넥터 좌표 동적 계산
  useEffect(() => {
    const updateLines = () => {
      if (
        !containerRef.current ||
        !centerBoxRef.current ||
        !leftCardRef.current ||
        !rightCardRef.current
      ) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const centerRect = centerBoxRef.current.getBoundingClientRect();
      const leftRect = leftCardRef.current.getBoundingClientRect();
      const rightRect = rightCardRef.current.getBoundingClientRect();

      // 좌측 카드의 우측 테두리 상단 부근 -> 중앙 박스의 좌측 상단 부근
      const leftX1 = leftRect.right - containerRect.left;
      const leftY1 = leftRect.top + leftRect.height * 0.35 - containerRect.top;
      const leftX2 = centerRect.left - containerRect.left;
      const leftY2 = centerRect.top + centerRect.height * 0.28 - containerRect.top;

      // 중앙 박스의 우측 테두리 하단 부근 -> 우측 카드의 좌측 테두리 상단/중간 부근
      const rightX1 = centerRect.right - containerRect.left;
      const rightY1 = centerRect.top + centerRect.height * 0.70 - containerRect.top;
      const rightX2 = rightRect.left - containerRect.left;
      const rightY2 = rightRect.top + rightRect.height * 0.38 - containerRect.top;

      setLines({
        left: { x1: leftX1, y1: leftY1, x2: leftX2, y2: leftY2 },
        right: { x1: rightX1, y1: rightY1, x2: rightX2, y2: rightY2 },
      });
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  return (
    <section>
      
      <div className="wrap about-page">
        {/* 1. 상단 슬로건 섹션 */}
        <div className="slogan-section">
          <span className="slogan-box wave-1">사용자의 경험을</span>
          <span className="slogan-box wave-2">고민하고</span>
          <span className="slogan-box wave-3">더 나은 방법을</span>
          <span className="slogan-box wave-4">끊임없이 찾습니다</span>
        </div>

        {/* 2. 중앙 프로필 다이어그램 섹션 */}
        <div className="profile-section" ref={containerRef}>
          {/* SVG 커넥터 라인 */}
          <svg className="connector-svg" aria-hidden="true">
            <line
              x1={lines.left.x1}
              y1={lines.left.y1}
              x2={lines.left.x2}
              y2={lines.left.y2}
              stroke="#2643ea"
              strokeWidth="1.5"
              />
            <line
              x1={lines.right.x1}
              y1={lines.right.y1}
              x2={lines.right.x2}
              y2={lines.right.y2}
              stroke="#2643ea"
              strokeWidth="1.5"
              />
          </svg>

          {/* 좌측 정보 카드 (이름) */}
          <div className="diagram-card left-card" ref={leftCardRef}>
            <div className="card-tag">이름</div>
            <div className="card-body">이연주</div>
          </div>

          {/* 중앙 프로필 카드 */}
          <div className="diagram-center" ref={centerBoxRef}>
            <div className="center-tag">WHO?</div>
            <div className="center-photo-frame">
              {/* 프로필 이미지 또는 회색 플레이스홀더 영역 */}
            </div>
          </div>

          {/* 우측 정보 카드 (전공) */}
          <div className="diagram-card right-card" ref={rightCardRef}>
            <div className="card-tag">전공</div>
            <div className="card-body multi-line">
              <span>디지털미디어디자인과</span>
              <span>프로그래밍 세부전공</span>
            </div>
          </div>
        </div>

        {/* 3. 소개 텍스트 */}
        <div className="intro-section">
          <p className="intro-line">
            1차 구현에 만족하지 않고<br/>사용자의 입장에서 결과물을 직접 바라보며 문제를 발견합니다.
          </p>
          <p className="intro-line">
            이후 새로운 기술과 AI를 적극적으로 활용하되,<br/>코드를 이해하고 스스로 수정·응용하며<br/>더 나은 경험을 만들어갑니다.
          </p>
        </div>

        {/* 4. 약력 및 이력 (타임라인) */}
        <div className="timeline-section">
          <h2 className="timeline-title">약력 및 이력</h2>
          <div className="timeline-container">
            <ul className="timeline-list">
              <li className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">2024 . 02</span>
                  <span className="timeline-text">유성여자고등학교 졸업</span>
                </div>
              </li>
              
              <li className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">2024 . 03</span>
                  <span className="timeline-text">디지털미디어디자인학과 입학</span>
                </div>
              </li>

              <li className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">2026 . 03</span>
                  <span className="timeline-text">프로그래밍 세부 전공 이수 시작</span>
                </div>
              </li>

              <li className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">2026 . 06</span>
                  <span className="timeline-text">학과 우수작 연합 PT <br/>Look Back — 시리어스 게임</span>
                </div>
              </li>

              <li className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">2026 . 07</span>
                  <span className="timeline-text">2026 커뮤니케이션디자인 국제공모전 입상 <br/>NOP! — 외국인 바가지 방지 서비스 웹 제작</span>
                </div>
              </li>
            </ul>
          </div>
        </div>


      
        {/* 5. 하단 PDF 다운로드 링크 */}
        <footer className="download-footer">
          <a href="/pdf/yeonju_CV.pdf" className="download-link">
            이력서 PDF 다운로드 &gt;
          </a>
          <a href="/pdf/yeonju_CL.pdf" className="download-link">
            자기소개서 PDF 다운로드 &gt;
          </a>
        </footer>
      </div>
     </section>
  );
}
