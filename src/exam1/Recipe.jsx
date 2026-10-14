// src/exam1/Recipe.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeList from "./RecipeList"; 
 
function Recipe() {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [isFavorite, setIsFavorite] = useState(false);
 
    // 검색어에 맞는 레시피 filter
    const filteredRecipes = RecipeList.filter(
        (recipe) =>
            recipe.menuName.includes(search) ||
            recipe.fruitName.includes(search)
    );
 
    // 스크랩북 등 외부에서 레시피 카드를 타고 들어왔을 때 자동으로 상세 화면 열기
    useEffect(() => {
        if (location.state && location.state.autoSelectRecipe) {
            const targetRecipe = location.state.autoSelectRecipe;
            
            setSelectedRecipe(targetRecipe);
            
            const savedRecipes = JSON.parse(localStorage.getItem("scrappedRecipes")) || [];
            setIsFavorite(savedRecipes.includes(targetRecipe.id));

            // 사용한 라우터 state 초기화
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // 상세 내용 전환 시 스크롤 최상단 리셋 효과
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedRecipe]);

    // 레시피 카드 클릭 시 상세 보기
    function handleSelectRecipe(recipe) {
        setSelectedRecipe(recipe);
        
        const savedRecipes = JSON.parse(localStorage.getItem("scrappedRecipes")) || [];
        setIsFavorite(savedRecipes.includes(recipe.id)); 
    }
 
    // 목록으로 돌아가기
    function handleBack() {
        setSelectedRecipe(null);
    }

    // 즐겨찾기 별 클릭 시 상태 토글 함수
    function handleToggleFavorite() {
        const savedRecipes = JSON.parse(localStorage.getItem("scrappedRecipes")) || [];
        let updatedRecipes = [];

        if (isFavorite) {
            updatedRecipes = savedRecipes.filter(id => id !== selectedRecipe.id);
        } else {
            if (!savedRecipes.includes(selectedRecipe.id)) {
                updatedRecipes = [...savedRecipes, selectedRecipe.id];
            } else {
                updatedRecipes = savedRecipes;
            }
        }

        localStorage.setItem("scrappedRecipes", JSON.stringify(updatedRecipes));
        setIsFavorite(!isFavorite);
    }
 
    // ─── 상세 페이지 ───────────────────────────────────────
    if (selectedRecipe) {
        return (
            <div className="recipePage container">
                <button className="back-btn" onClick={handleBack}>← 목록으로</button>
 
                {/* 메뉴 헤더 */}
                <div className="recipeDetailHeader">
                    <div className="title-wrapper">
                        <h2>
                            {selectedRecipe.emoji} {selectedRecipe.menuName}
                        </h2>
                        <button 
                            className={`fav-star-btn ${isFavorite ? "active" : ""}`} 
                            onClick={handleToggleFavorite}
                        >
                            {isFavorite ? "★" : "☆"}
                        </button>
                    </div>
                    <p className="sub-desc">{selectedRecipe.desc}</p>
                </div>
 
                {/* 4분할 시안 매칭: 재료 + 소요 시간 */}
                <div className="recipeDetailGrid">
                    <div className="recipeDetailCard">
                        <h3>재료</h3>
                        <p>{selectedRecipe.ingredients}</p>
                    </div>
                    <div className="recipeDetailCard">
                        <h3>소요 시간</h3>
                        <p>{selectedRecipe.time}</p>
                    </div>
                </div>
 
                {/* 레시피 단계 와이드 박스 */}
                <div className="recipeSteps wide-box">
                    <h3>레시피 순서</h3>
                    <ol>
                        {selectedRecipe.steps.map((step, index) => (
                            <li key={index}>
                                <span className="step-num">{index + 1}</span>
                                <span className="step-text">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
 
    // ─── 목록 페이지 ───────────────────────────────────────
    return (
        <div className="recipePage container">
            <h2 className="page-title">과일 레시피</h2>
 
            {/* 검색창 섹션 */}
            <div className="searchSection">
                <input
                    type="text"
                    placeholder="메뉴명 또는 과일 이름으로 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
 
            {/* 레시피 리스트 */}
            <ul className="recipeList">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <li
                            key={recipe.id}
                            className="recipeItem"
                            onClick={() => handleSelectRecipe(recipe)}
                        >
                            <div className="recipeItemInfo">
                                <span className="recipeItemName">
                                    {recipe.menuName}
                                </span>
                                <span className="recipeItemDesc">
                                    {recipe.desc}
                                </span>
                                <span className="recipeItemMeta">
                                    {recipe.emoji} {recipe.fruitName} · {recipe.time}
                                </span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-result">검색 결과가 없어요 😢</p>
                )}
            </ul>
        </div>
    );
}
 
export default Recipe;