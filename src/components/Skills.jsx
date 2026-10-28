import { Link, useSearchParams } from "react-router-dom";
import { skills, CATEGORIES, WEIGHT, MAX_MONTHS, formatMonths, scoreOf, skillsByCategory } from "../data/skills";
import { getProject } from "../data/projects";
import "./Skills.css";

export default function Skills() {
  // 분야 필터는 주소(?skill=개발)에 저장합니다.
  const [params, setParams] = useSearchParams();
  const raw = params.get("skill");
  const category = CATEGORIES.includes(raw) ? raw : "전체";
  const setCategory = (c) => {
    const next = new URLSearchParams(params);
    if (c === "전체") next.delete("skill");
    else next.set("skill", c);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const visible = skillsByCategory(category);

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div>
            <h2 id="skills-title" className="sec-title">
              Skill <span>02</span>
            </h2>
            <p className="section-lead">기술은 활용도로 보여드립니다</p>
            </div>
          </div>

          <div className="work__filters" role="group" aria-label="기술 분야">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`work__filter${category === c ? " is-on" : ""}`}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c} <span>{skillsByCategory(c).length}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="skills__formula">
          활용도 = 사용 기간({formatMonths(MAX_MONTHS)} 만점) {Math.round(WEIGHT.months * 100)}% + 프로젝트 활용 비율{" "}
          {Math.round(WEIGHT.projects * 100)}%.
          <br />
          오래 썼더라도 실제로 많이 쓰지 않았다면 점수가 오르지 않도록 프로젝트 활용 비중을 더
          높게 잡았습니다.
        </p>

        <ul className="skills__grid">
          {visible.map((s) => {
            const { percent } = scoreOf(s);
            return (
              <li className="skill" key={s.name}>
                <div className="skill__top">
                  <h3 className="skill__name">{s.name}</h3>
                  <span className="skill__cat">{s.category}</span>
                </div>

                <p className="skill__percent">
                  {percent}
                  <small>%</small>
                </p>

                <div
                  className="skill__bar"
                  role="img"
                  aria-label={`${s.name} 활용도 ${percent}%`}
                >
                  <div style={{ width: `${percent}%` }} />
                </div>

                <p className="skill__meta">
                  사용 {formatMonths(s.months)} · 프로젝트 {s.projects.length}개 활용
                </p>

                <ul className="skill__projects" aria-label={`${s.name} 활용 프로젝트`}>
                  {s.projects.map((slug) => {
                    const p = getProject(slug);
                    return (
                      p && (
                        <li key={slug}>
                          <Link to={`/project/${slug}`} className="chip">
                            {p.name}
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
