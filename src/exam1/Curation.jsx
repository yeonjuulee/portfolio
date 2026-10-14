// src/exam1/Curation.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FruitList from "./FruitList";
import CurationList from "./CurationList";
import "./styles.css";

function Curation() {
  const navigate = useNavigate();

  useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  //  사용자의 다중 선택을 기록할 useState 2개
  const [selectedTaste, setSelectedTaste] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  // 시안 가이드라인의 고정 선택지 배열 (useState, map 활용을 위해 매핑 배열화)
  const tastes = ["달콤한", "새콤한", "아삭한", "부드러운"];
  
  const conditions = [
    { text: "면역력이 필요해요", emoji: "💪" },
    { text: "기력이 없어요", emoji: "😑" },
    { text: "소화가 잘 안돼요", emoji: "🤢" },
    { text: "식단 관리 중이에요", emoji: "🥬" },
    { text: "피부관리 중이에요", emoji: "👑" },
    { text: "더위를 많이 타요", emoji: "🔥" }
  ];

  // 💡 [핵심 알고리즘] 맛과 상태가 모두 일치하는 결과 과일 1개 찾아내기 (AND 연산)
  const recommendedFruit = CurationList.find(
    (item) => item.taste === selectedTaste && item.condition === selectedCondition
  );

  // 💡 결과 카드 클릭 시 원본 도감 상세 페이지로 데이터 전달 및 이동
  function handleGoToDetail(fruitId) {
    const originalFruit = FruitList.find((fruit) => fruit.id === fruitId);
    if (originalFruit) {
      navigate("/Fruit", { state: { fruit: originalFruit } });
    }
  }

  return (
    <div className="curationPage container">
      {/* 타이틀 헤더 */}
      <div className="curation-header">
        <h2 className="page-title">맞춤 과일 추천</h2>
        <p>선호하는 과일 유형, 현재 상태에 따라 맞춤 과일을 추천해드려요</p>
      </div>

      {/* 1. 선호하는 과일 유형 선택 섹션 (가로 정렬 칩 버튼) */}
      <div className="curation-section">
        <h3>선호하는 과일 유형은?</h3>
        <div className="category-tab-container">
          {tastes.map((taste, idx) => (
            <button
              key={idx}
              className={`category-tab-btn ${selectedTaste === taste ? "active" : ""}`}
              onClick={() => setSelectedTaste(taste)}
            >
              {taste}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 현재 상태 선택 섹션 (시안의 3열 이모지 그리드 배치) */}
      <div className="curation-section">
        <h3>현재 상태는?</h3>
        <div className="condition-grid">
          {conditions.map((cond, idx) => (
            <button
              key={idx}
              className={`condition-grid-btn ${selectedCondition === cond.text ? "active" : ""}`}
              onClick={() => setSelectedCondition(cond.text)}
            >
              <span className="cond-emoji">{cond.emoji}</span>
              <span className="cond-text">{cond.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 동적 추천 결과 바텀 뷰 (조건 충족 시에만 렌더링) */}
      <div className="curation-result-section">
        <h3>오늘의 추천 과일 결과</h3>
        
        {selectedTaste && selectedCondition ? (
          recommendedFruit ? (
            // 💡 결과가 존재할 때 띄우는 시안 속 카드 UI
            <div 
              className="curation-result-card" 
              onClick={() => handleGoToDetail(recommendedFruit.fruitId)}
              title="클릭 시 도감 상세페이지로 이동합니다"
            >
              <span className="result-fruit-emoji">{recommendedFruit.emoji}</span>
              <strong className="result-fruit-name">{recommendedFruit.name}</strong>
              
              <div className="result-badge-group">
                <span className="result-badge">#{recommendedFruit.taste}</span>
                <span className="result-badge">#{recommendedFruit.condition}</span>
              </div>
              
              <p className="result-reason-text">{recommendedFruit.reason}</p>
              <span className="click-tip-text">💡 카드를 클릭하면 상세 도감으로 이동해요!</span>
            </div>
          ) : (
            // 조건은 골랐으나 매칭 데이터가 매퍼에 없을 때의 방어 레이아웃
            <div className="curation-empty-card">
              <p>🤔 현재 조건에 맞는 완벽한 과일 처방전이 없습니다.</p>
              <span>다른 키워드 조합을 선택해 보세요!</span>
            </div>
          )
        ) : (
          // 아무것도 선택하지 않은 최초 진입 상태
          <div className="curation-waiting-card">
            <p>👆 위의 맛과 상태 카테고리를 각각 하나씩 선택하시면</p>
            <span>당신에게 가장 알맞은 맞춤형 과일 처방전이 발급됩니다!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Curation;