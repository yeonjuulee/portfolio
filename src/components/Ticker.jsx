import { skills, tools } from "../data/skills";
import "./Ticker.css";

// 장식용 흐르는 띠. 같은 목록을 두 번 이어 붙여 끊김 없이 반복하고, 스크린리더에는 숨깁니다.
const ITEMS = [...new Set([...skills.filter((s) => s.category === "개발").map((s) => s.name), ...tools.map((t) => t.name)])];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
