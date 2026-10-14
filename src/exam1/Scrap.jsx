// src/exam1/Scrap.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "./EventList";
import RecipeList from "./RecipeList";
import "./styles.css";

function Scrap() {
  const navigate = useNavigate();
  const [scrappedEventIds, setScrappedEventIds] = useState([]);
  const [scrappedRecipeIds, setScrappedRecipeIds] = useState([]);

  // 컴포넌트가 켜질 때 브라우저 저장소에서 스크랩 리스트를 불러옴
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("scrappedEvents")) || [];
    const savedRecipes = JSON.parse(localStorage.getItem("scrappedRecipes")) || [];
    setScrappedEventIds(savedEvents);
    setScrappedRecipeIds(savedRecipes);
  }, []);

  // 페이지 진입 시 스크롤 최상단 고정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 💡 [선택된 ID 기반 필터링]
  const myScrappedEvents = EventList.filter((event) =>
    scrappedEventIds.includes(event.id)
  );

  const myScrappedRecipes = RecipeList.filter((recipe) =>
    scrappedRecipeIds.includes(recipe.id)
  );

  // 스크랩 해제(삭제) 기능 - 이벤트 버블링 방지 포함
  const handleRemoveEvent = (id, e) => {
    e.stopPropagation(); 
    const updated = scrappedEventIds.filter((eventId) => eventId !== id);
    setScrappedEventIds(updated);
    localStorage.setItem("scrappedEvents", JSON.stringify(updated));
  };

  const handleRemoveRecipe = (id, e) => {
    e.stopPropagation(); 
    const updated = scrappedRecipeIds.filter((recipeId) => recipeId !== id);
    setScrappedRecipeIds(updated);
    localStorage.setItem("scrappedRecipes", JSON.stringify(updated));
  };

  // 💡 행사 카드를 누르면 Event.jsx의 상세 뷰로 자동 선택되도록 state 전달
  const handleGoEventDetail = (event) => {
    navigate("/Event", { state: { autoSelectEvent: event } });
  };

  // 💡 레시피 카드를 누르면 Recipe.jsx의 상세 뷰로 자동 선택되도록 state 전달
  const handleGoRecipeDetail = (recipe) => {
    navigate("/Recipe", { state: { autoSelectRecipe: recipe } });
  };

  return (
    <div className="scrapPage container">
      <h2 className="page-title">나의 스크랩 북마크</h2>

      {/* ─── 상단 섹션: 액티비티 스크랩 ─── */}
      <div className="scrap-section">
        <h3>액티비티 스크랩</h3>
        {myScrappedEvents.length > 0 ? (
          <div className="scrap-grid">
            {myScrappedEvents.map((event) => (
              <div 
                key={event.id} 
                className="scrap-card" 
                onClick={() => handleGoEventDetail(event)}
                style={{ cursor: "pointer" }}
              >
                <button className="scrap-star-btn active" onClick={(e) => handleRemoveEvent(event.id, e)}>★</button>
                
                <div className="scrap-poster-img-box">
                  <img 
                    src={event.url} 
                    alt={event.title} 
                    onError={(e) => { e.target.src = "https://placehold.co/300x400?text=No+Poster"; }}
                  />
                </div>

                <div className="scrap-card-content">
                  <strong>{event.title}</strong>
                  <span>{event.location.split(" ")[0]} {event.location.split(" ")[1]}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="scrap-empty">즐겨찾기한 액티비티가 없습니다.</p>
        )}
      </div>

      {/* ─── 하단 섹션: 레시피 스크랩 ─── */}
      <div className="scrap-section" style={{ marginTop: "40px" }}>
        <h3>레시피 스크랩</h3>
        {myScrappedRecipes.length > 0 ? (
          <div className="scrap-grid">
            {myScrappedRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="scrap-card recipe-only-card" 
                onClick={() => handleGoRecipeDetail(recipe)}
                style={{ cursor: "pointer" }}
              >
                <button className="scrap-star-btn active" onClick={(e) => handleRemoveRecipe(recipe.id, e)}>★</button>
                
                <div className="scrap-card-content">
                  <strong>{recipe.menuName}</strong>
                  <span>{recipe.emoji} {recipe.fruitName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="scrap-empty">즐겨찾기한 레시피가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Scrap;