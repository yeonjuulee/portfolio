// src/exam1/Event.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventList from "./EventList";
import "./styles.css";

function Event() {
  const location = useLocation(); 
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (location.state && location.state.autoSelectEvent) {
      const targetEvent = location.state.autoSelectEvent;
      
      // 목록을 건너뛰고 해당 행사 상세 화면을 즉시 활성화
      setSelectedEvent(targetEvent);
      
      // 즐겨찾기 별 상태 동기화
      const savedEvents = JSON.parse(localStorage.getItem("scrappedEvents")) || [];
      setIsFavorite(savedEvents.includes(targetEvent.id));

      // 사용한 state는 클리어해서 목록으로 돌아갔을 때 다시 상세로 강제 진입하는 버그 차단
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 페이지 진입 또는 상세 변환 시 스크롤 최상단 고정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedEvent]);

  // 7개 카테고리 메뉴 목록 배열
  const regions = ["전체", "서울/경기/인천", "충청", "경상", "강원", "전라", "제주"];

  // 선택한 권역에 맞는 행사 필터링
  const filteredEvents = selectedRegion === "전체"
    ? EventList
    : EventList.filter(event => event.region === selectedRegion);

  // D-Day 계산기 함수
  function getDDay(startDateStr) {
    const today = new Date();
    const targetDate = new Date(startDateStr.replace(/\./g, "-"));
    
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);
    
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "진행중";
    if (diffDays < 0) return "종료";
    return `D-${diffDays}`;
  }

  // 즐겨찾기 별 토글
  function handleToggleFavorite() {
    const savedEvents = JSON.parse(localStorage.getItem("scrappedEvents")) || [];
    let updatedEvents = [];

    if (isFavorite) {
        updatedEvents = savedEvents.filter(id => id !== selectedEvent.id);
    } else {
        if (!savedEvents.includes(selectedEvent.id)) {
          updatedEvents = [...savedEvents, selectedEvent.id];
        } else {
          updatedEvents = savedEvents;
        }
    }

    localStorage.setItem("scrappedEvents", JSON.stringify(updatedEvents));
    setIsFavorite(!isFavorite);
  }

  // 카드를 클릭해 상세 보기로 들어갈 때 실행하는 함수
  function handleSelectEvent(event) {
    setSelectedEvent(event);
    const savedEvents = JSON.parse(localStorage.getItem("scrappedEvents")) || [];
    setIsFavorite(savedEvents.includes(event.id));
  }

  // ─── [상세 페이지 뷰] ───────────────────────────────────────
  if (selectedEvent) {
    return (
      <div className="eventPage container">
        <button className="back-btn" onClick={() => setSelectedEvent(null)}>← 목록으로</button>

        {/* 타이틀 및 별표 토글 */}
        <div className="eventDetailHeader">
          <div className="title-wrapper">
            <h2>{selectedEvent.title}</h2>
            <button 
              className={`fav-star-btn ${isFavorite ? "active" : ""}`} 
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        </div>

        {/* 좌측 포스터 + 우측 아이콘 리스트 메인 섹션 */}
        <div className="eventMainFlexContainer">
          {/* 좌측: 포스터 이미지 영역 */}
          <div className="eventPosterWrapper">
            <img 
              src={selectedEvent.url} 
              alt={selectedEvent.title} 
              className="eventPosterImg"
              onError={(e) => { e.target.src = "https://placehold.co/300x400?text=No+Poster"; }}
            />
          </div>

          {/* 우측: 아이콘 상세 가이드 리스트 */}
          <div className="eventInfoMetaList">
            <div className="metaInfoRow">
              <span className="metaIcon">📅</span>
              <div className="metaText">
                <span className="metaLabel">기간 / 시간</span>
                <p>{selectedEvent.startDate} ~ {selectedEvent.endDate}</p>
                <p className="metaSub">{selectedEvent.time}</p>
              </div>
            </div>

            <div className="metaInfoRow">
              <span className="metaIcon">📍</span>
              <div className="metaText">
                <span className="metaLabel">장소</span>
                <p>{selectedEvent.location}</p>
              </div>
            </div>

            <div className="metaInfoRow">
              <span className="metaIcon">🪙</span>
              <div className="metaText">
                <span className="metaLabel">이용 요금</span>
                <p className="feeHighlight">{selectedEvent.fee}</p>
              </div>
            </div>

            {selectedEvent.num && (
              <div className="metaInfoRow">
                <span className="metaIcon">📞</span>
                <div className="metaText">
                  <span className="metaLabel">문의처</span>
                  <p>{selectedEvent.num.replace(/[\(\)\s]|문의:/g, "")}</p>
                </div>
              </div>
            )}

            {selectedEvent.web && (
              <div className="metaInfoRow">
                <span className="metaIcon">🔗</span>
                <div className="metaText">
                  <span className="metaLabel">공식 웹사이트</span>
                  <p>
                    <a href={selectedEvent.web} target="_blank" rel="noopener noreferrer" className="metaWebLink">
                      {selectedEvent.web}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {selectedEvent.organizer && (
              <div className="metaInfoRow">
                <span className="metaIcon">📢</span>
                <div className="metaText">
                  <span className="metaLabel">주최 / 주관</span>
                  <p>{selectedEvent.organizer}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 체험 / 행사 상세정보 설명 박스 */}
        <div className="wide-box eventDescriptionBox">
          <h3>체험 / 행사 상세정보</h3>
          <p>{selectedEvent.desc}</p>
        </div>

        {/* 주요 프로그램 안내 칸 배치 */}
        {selectedEvent.program && selectedEvent.program.length > 0 && (
          <div className="wide-box eventProgramBox">
            <h3>주요 프로그램</h3>
            <div className="programTagContainer">
              {selectedEvent.program.map((prog, index) => (
                <span key={index} className="programTagBadge">
                  ✨ {prog}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── [목록 페이지 뷰] ───────────────────────────────────────
  return (
    <div className="eventPage container">
      <h2 className="page-title">과일 행사 / 체험 정보</h2>

      <div className="category-tab-container">
        {regions.map((region, idx) => (
          <button
            key={idx}
            className={`category-tab-btn ${selectedRegion === region ? "active" : ""}`}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <p className="region-indicator">📍 {selectedRegion} 지역의 과일 체험 / 행사</p>

      <div className="eventGridList">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const dDayStatus = getDDay(event.startDate);
            return (
              <div 
                key={event.id} 
                className="eventCardItem"
                onClick={() => handleSelectEvent(event)}
              >
                <div 
                  className="card-img-placeholder" 
                  style={{ 
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${event.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <span className={`dday-badge ${dDayStatus === "진행중" ? "ongoing" : ""}`}>
                    {dDayStatus}
                  </span>
                  <span className="card-star-icon">☆</span>
                </div>
                <div className="card-info-content">
                  <strong className="card-title-text">{event.title}</strong>
                  <span className="card-date-text">{event.startDate} ~ {event.endDate}</span>
                  <span className="card-loc-text">{event.location.split(" ")[0]} {event.location.split(" ")[1]}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-result-text">현재 준비된 체험 행사가 없습니다. 😢</p>
        )}
      </div>
    </div>
  );
}

export default Event;