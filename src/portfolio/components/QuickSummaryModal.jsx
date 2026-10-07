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
        <div className="drawer-body">
          <div className="drawer-profile">
            <div className="drawer-avatar">K</div>
            <div>
              <h4>김OO</h4>
              <p>디지털미디어디자인 전공 (프로그래밍 세부 전공)</p>
            </div>
          </div>

          <div className="drawer-slogan">
            단순한 정보 전달을 넘어, 사용자가 직접 체감하는 경험을 코드로 설계하는 프론트엔드 개발자
          </div>

          <p className="drawer-label">핵심 스택</p>
          <div className="chip-row">
            <span className="chip mono">React · 진행 중</span>
            <span className="chip mono">JavaScript · 1년+</span>
            <span className="chip mono">HTML/CSS · 1년+</span>
          </div>

          <p className="drawer-label">대표 프로젝트</p>
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

          <button className="drawer-cta">이력서 PDF 다운로드</button>
        </div>
      </div>
    </div>
  );
}