import { projects } from "../data/projects";
import { skills } from "../data/skills";
import "./KeyFacts.css";

// 숫자는 전부 data 폴더의 실제 데이터에서 계산합니다. (직접 숫자를 적지 않아 데이터와 어긋나지 않음)
function buildFacts() {
  const inCat = (c) => projects.filter((p) => p.categories.includes(c)).length;

  const dev = skills.filter((s) => s.category === "개발");
  return [
    { value: projects.length, unit: "개", label: "프로젝트", sub: `기획 ${inCat("기획")} · 디자인 ${inCat("디자인")} · 개발 ${inCat("개발")}` },
    { value: dev.length, unit: "개", label: "핵심 스택", sub: dev.map((s) => s.name).join(" · ") },
  ];
}

export default function KeyFacts() {
  const facts = buildFacts();
  return (
    <ul className="facts" aria-label="핵심 요약">
      {facts.map((f) => (
        <li className="fact" key={f.label}>
          <p className="fact__num">
            {f.value}
            <small>{f.unit}</small>
          </p>
          <p className="fact__label">{f.label}</p>
          <p className="fact__sub">{f.sub}</p>
        </li>
      ))}
    </ul>
  );
}
