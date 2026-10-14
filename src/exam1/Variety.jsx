import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './styles.css';

function Variety() {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 방어 코드
    if (!state || !state.fruit || !state.variety) {
        return (
            <div style={{ padding: "50px", textAlign: "center" }}>
                <p>데이터가 존재하지 않습니다.</p>
                <button onClick={() => navigate("/")}>메인으로</button>
            </div>
        );
    }

    const { fruit, variety } = state;

    function handleBack() {
        navigate("/Fruit", { state: { fruit } });
    }

    // 이미지 클릭 시 외부 링크(variety.url)로 연결
    const handleImageClick = () => {
        if (variety.url) {
            window.open(variety.url, "_blank", "noopener,noreferrer");
        } else {
            alert("연결된 공식 링크가 없습니다. 😢");
        }
    };

    return (
        <div className="container">
            <button className="back-btn" onClick={handleBack}>← {fruit.name}으로</button>

            <div className="variety-header-container">
                {/*  이미지 컨테이너에 클릭 이벤트 및 스타일 추적을 위한 클래스 */}
                <div 
                    className={`variety-main-img-container ${variety.url ? "clickable" : ""}`}
                    onClick={handleImageClick}
                    title={variety.url ? "클릭 시 공식 페이지로 이동합니다" : ""}
                >
                    <img 
                        src={variety.img || "https://placehold.co/800x600?text=No+Image"} 
                        alt={variety.name} 
                        onError={(e) => { e.target.src = "https://placehold.co/800x600?text=Fruiting+Variety"; }}
                    />
                    {/*  호버 및 클릭 시 연한 그라데이션 변화를 줄 div */}
                    <div className="img-hover-overlay"></div>
                </div>

                <div className="variety-text-container">
                    <h2>{fruit.emoji} {variety.name}</h2>
                    <p className="sub-desc">{variety.desc}</p>
                </div>
            </div>

            {/* 깔끔한 4분할 박스 그리드 */}
            <div className="grid-container">
                <div className="grid-box">
                    <p>제철 시기</p>
                    <p>{variety.peak}</p>
                </div>
                <div className="grid-box">
                    <p>재배 위치</p>
                    <p>{variety.origin}</p>
                </div>
                <div className="grid-box">
                    <p>당도 (Brix)</p>
                    <p>{variety.brix}</p>
                </div>
                <div className="grid-box">
                    <p>고르는 팁</p>
                    <p>{variety.tip}</p>
                </div>
            </div>

            {/* 하단 가로로 긴 보관 정보 박스 */}
            <div className="wide-box">
                <h3>손질 / 보관 방법</h3>
                <p>{variety.storage}</p>
            </div>
        </div>
    );
}

export default Variety;