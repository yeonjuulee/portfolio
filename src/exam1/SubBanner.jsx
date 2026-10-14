// src/exam1/SubBanner.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function SubBanner() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 💡 광고 배너 데이터 (총 2페이지, 클릭 시 이동할 주소와 감성 문구 세팅)
  const ads = [
    {
      id: 1,
      path: "/Recipe",
      tag: "COOKING GUIDE",
      title: "오늘 제철 과일로 어떤 요리가 가능할까?",
      desc: "지루한 식탁을 깨우는 프리미엄 과일 레시피 보러가기 👩‍🍳",
      bgColor: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", // 신뢰감을 주는 블루 톤
    },
    {
      id: 2,
      path: "/Curation",
      tag: "BODY BALANCE",
      title: "지금 내 몸에 딱 맞는 과일 처방전 💊",
      desc: "4가지 맛과 7가지 상태 분석으로 오늘의 비타민을 매칭해 드려요",
      bgColor: "linear-gradient(135deg, #115e59 0%, #14b8a6 100%)", // 싱그러운 딥그린 틸 톤
    }
  ];

  // 💡 3초마다 자동으로 가로 슬라이딩되는 타이머 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="sub-banner-wrapper">
      <div className="sub-banner-container">
        
        {/* 가로 슬라이드 롤링 트랙 */}
        <div 
          className="sub-banner-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="sub-banner-slide"
              style={{ background: ad.bgColor }}
              onClick={() => navigate(ad.path)} // 💡 클릭 시 바로 해당 페이지로 이동!
            >
              <div className="sub-banner-content">
                <span className="sub-ad-tag">{ad.tag}</span>
                <h3 className="sub-ad-title">{ad.title}</h3>
                <p className="sub-ad-desc">{ad.desc}</p>
              </div>
              <div className="sub-banner-arrow-hint">
                보러가기 <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 바형 인디케이터 (총 2칸짜리 모던한 막대 바) */}
        <div className="sub-banner-indicator-bar">
          {ads.map((_, idx) => (
            <div 
              key={idx} 
              className={`indicator-line ${currentIndex === idx ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default SubBanner;