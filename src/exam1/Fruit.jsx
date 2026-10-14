import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './styles.css';

function Fruit() {
    const navigate = useNavigate();
    const { state } = useLocation();  // Main, Curation 등에서 넘긴 { fruit }
    
    useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

    // 첫 화면 공백 에러 방지를 위한 방어 코드
    if (!state || !state.fruit) {
        return (
            <div style={{ padding: "50px", textAlign: "center" }}>
                <p>데이터가 없습니다.</p>
                <button onClick={() => navigate("/")}>메인으로</button>
            </div>
        );
    }
    
    const fruit = state.fruit;

    function handleSelectVariety(variety) {
        navigate("/Variety", { state: { fruit, variety } });
    }

    function handleBack() {
        navigate("/"); 
    }

    return (
        <div className="container fruit-detail-page">
            
            {/* 상단 대형 비주얼 배경 헤더 존 (이모지 삭제, 과일 대표 이미지 반영) */}
            <div 
                className="fruit-visual-header"
                style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.6)), url(${fruit.img || "https://placehold.co/800x400?text=Fruit"})` 
                }}
            >
                {/* 헤더 내부 좌측 상단 뒤로가기 버튼 */}
                <button className="back-btn-overlay" onClick={handleBack}>← 뒤로가기</button>

                <div className="header-text-bundle">
                    <span className="header-tag">KOREAN FRUIT MAGAZINE</span>
                    <h2>{fruit.name}</h2>
                    <p className="sub-desc">{fruit.desc}</p>
                </div>
            </div>

            {/* 하단 콘텐츠 본문 구역 */}
            <div className="fruit-content-body">
                <h3 className="section-title">국내 재배 품종</h3>
                
                <ul className="variety-list">
                    {fruit.varieties.map((variety) => (
                        <li key={variety.id} onClick={() => handleSelectVariety(variety)} className="variety-item">
                            
                            <div className="img-placeholder" style={{ background: "none", overflow: "hidden" }}>
                                <img 
                                    src={variety.img || "https://placehold.co/150?text=No+Image"} 
                                    alt={variety.name} 
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    // 로컬 경로 오타나 주소 만료로 이미지가 안 뜰 때 띄워줄 방어선
                                    onError={(e) => { e.target.src = "https://placehold.co/150?text=Fruit"; }}
                                />
                            </div>
                            
                            <div className="variety-text">
                                <span className="variety-name">{variety.name}</span>
                                <span className="variety-desc">{variety.desc}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default Fruit;