import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function QuickSummaryModal({ isOpen, onClose }) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal-scrim ${isOpen ? "open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label="한눈에 보기">
        <div className="drawer-head">
          <span>한눈에 보기</span>
          <button className="drawer-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className="drawer-body drawer-body-wide">
          <div className="drawer-main">
            <div className="drawer-photo">
              <div className="drawer-avatar-lg">K</div>
            </div>

            <div className="drawer-info">
              <h4>이연주</h4>
              <p className="drawer-role">디지털미디어디자인학과 / 프로그래밍 세부 전공</p>

              <div className="drawer-slogan">
                단순한 정보 전달을 넘어, 사용자가 직접 체감하는 경험을 코드로 설계하는 프론트엔드 개발자
              </div>

              {/* 아이콘 + 키워드로 한눈에 훑을 수 있는 요약 */}
              <div className="keyword-row">
                <span className="keyword-item">
                  <span className="keyword-icon" aria-hidden="true">🎨</span>디자인 기반
                </span>
                <span className="keyword-item">
                  <span className="keyword-icon" aria-hidden="true">💻</span>프론트엔드 구현
                </span>
                <span className="keyword-item">
                  <span className="keyword-icon" aria-hidden="true">🤖</span>AI 협업 투명성
                </span>
                <span className="keyword-item">
                  <span className="keyword-icon" aria-hidden="true">🧩</span>문제 해결 중심
                </span>
              </div>

              <p className="drawer-label">핵심 스택</p>
              <div className="chip-row">
                <span className="chip mono">React · 진행 중</span>
                <span className="chip mono">JavaScript · 1년+</span>
                <span className="chip mono">HTML/CSS · 1년+</span>
              </div>
            </div>
          </div>

          <p className="drawer-label">대표 프로젝트</p>
          <div className="mini-card-row">
            <Link to="/project/lookback" className="mini-card" onClick={onClose}>
              <span className="mini-thumb mini-thumb-dark" />
              <span>
                <h5>Look Back</h5>
                <p>대용량 리소스 최적화 및 1인칭 시야 인터랙션 구현</p>
              </span>
            </Link>
            <Link to="/project/nop" className="mini-card" onClick={onClose}>
              <span className="mini-thumb mini-thumb-accent" />
              <span>
                <h5>NOP!</h5>
                <p>미디어 쿼리 기반 반응형 레이아웃 및 모바일 뷰포트 대응</p>
              </span>
            </Link>
          </div>

          <a href="/pdf/yeonju.pdf" target="_blank" rel="noopener noreferrer">
            <button className="drawer-cta">자기소개서 PDF 보기</button>
          </a>
        </div>
      </div>
    </div>
  );
}