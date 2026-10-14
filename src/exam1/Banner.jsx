// src/exam1/Banner.jsx
import { useState, useEffect } from "react";
import EventList from "./EventList";
import "./styles.css";



function Banner({ onSelectEvent }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 오늘 날짜(2026년 6월 8일 기준) 기준 D-60 이내 + 진행 중인 행사 필터링
  const bannerEvents = EventList.filter((event) => {
    const today = new Date("2026-06-08");
    const targetDate = new Date(event.startDate.replace(/\./g, "-"));
    const endDate = new Date(event.endDate.replace(/\./g, "-"));
    
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isOngoing = today >= targetDate && today <= endDate;
    const isWithin30Days = diffDays > 0 && diffDays <= 60;

    return isOngoing || isWithin30Days;
  });

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerEvents.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === bannerEvents.length - 1 ? 0 : prev + 1));
  };

  if (bannerEvents.length === 0) {
    return (
      <div className="main-banner-container empty">
        <p>지금은 진행 예정인 축제 광고가 없습니다. 🍊</p>
      </div>
    );
  }

  return (
    <div className="multi-banner-wrapper">
      <div className="main-banner-container">
        <div className="banner-showroom-container">
          {bannerEvents.map((event, idx) => (
            <div 
              key={event.id} 
              className={`ott-banner-box ${currentIndex === idx ? "active" : "inactive"}`}
              onClick={() => onSelectEvent(event)}
            >
              {/* 왼쪽 가장자리: 9:16 비율의 포스터 이미지 */}
              <div className="ott-poster-zone">
                <img src={event.url} alt={event.title} className="ott-poster-img" />
              </div>

              {/* 우측 가장자리 그라데이션 오버레이 & 텍스트 존 */}
              <div className="ott-gradient-overlay">
                <div className="ott-text-zone">
                  <span className="ott-tag">UPCOMING FESTIVAL</span>
                  <h2 className="ott-title">{event.title}</h2>
                  <p className="ott-date">📅 {event.startDate} ~ {event.endDate}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 하단 화살표 & 넘버링 조작바 */}
      <div className="banner-control-bar">
        <button className="control-arrow prev" onClick={handlePrev}>&lt;</button>
        <div className="control-page-num">
          <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="divider">/</span>
          <span className="total">{String(bannerEvents.length).padStart(2, '0')}</span>
        </div>
        <button className="control-arrow next" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
}

export default Banner;