import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FruitList from "./FruitList";
import Banner from "./Banner";
import SubBanner from "./SubBanner";
import './styles.css';

function Main() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filteredFruits = FruitList.filter((fruit) =>
        fruit.name.includes(search)
    );

    function handleSelectFruit(fruit) {
        navigate("/Fruit", { state: { fruit } });
    }

    function handleSelectEventFromBanner(event) {
        navigate("/Event", { state: { autoSelectEvent: event } });
    }

    return (
        <div className="main">
            <Banner onSelectEvent={handleSelectEventFromBanner} />

            <SubBanner />

            <div className="searchSection">
                <h2>궁금한 과일을 검색해보세요</h2>
                <input
                    type="text"
                    placeholder="과일 이름을 입력하세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <ul>
                {filteredFruits.map((fruit) => (
                    <li key={fruit.id} onClick={() => handleSelectFruit(fruit)}>
                        <span>{fruit.emoji}</span>
                        <span>{fruit.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;