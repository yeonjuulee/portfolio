import { Link, useSearchParams } from "react-router-dom";
import { projects } from "../data/projects";
import ImagePlaceholder from "./ImagePlaceholder";
import "./WorkList.css";

const FILTERS = ["전체", "개발", "디자인", "기획"];

// 이미지가 먼저 보이는 케이스 카드. 왼쪽/오른쪽 열을 엇갈려 계단식으로 배치합니다.: 이미지 → 이름 → 한 줄 설명 → 태그
function WorkCard({ project, order }) {
  const shown = project.stack.slice(0, 3);
  const rest = project.stack.length - shown.length;

  return (
    <li style={{ "--o": order }}>
      <Link to={`/project/${project.slug}`} className="work-card">
        <div className="work-card__media">
          <ImagePlaceholder ratio="4 / 3" label="WORK IMAGE 4:3" src={project.thumb} video={project.thumb ? undefined : project.video} />
          <span className="work-card__go" aria-hidden="true">
            →
          </span>
        </div>

        <div className="work-card__body">
          <div className="work-card__top">
            <h3>{project.name}</h3>
            <span className="work-card__year">
              <span className={`status-dot ${project.status === "완료" ? "" : "wip"}`} aria-hidden="true" />
              {project.status} · {project.year}
            </span>
          </div>
          <p>{project.tagline}</p>

          <ul className="work-card__tags" aria-label="분류와 사용 기술">
            {shown.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
            {rest > 0 && <li className="chip chip--ink">+{rest}</li>}
          </ul>
        </div>
      </Link>
    </li>
  );
}

export default function WorkList() {
  // 필터는 주소(?category=개발)에 저장해서 뒤로 가기·링크 공유에도 유지됩니다.
  const [params, setParams] = useSearchParams();
  const raw = params.get("category");
  const filter = FILTERS.includes(raw) ? raw : "전체";
  const setFilter = (f) => setParams(f === "전체" ? {} : { category: f }, { replace: true, preventScrollReset: true });
  const match = (p, f) => f === "전체" || p.categories.includes(f);
  const count = (f) => projects.filter((p) => match(p, f)).length;
  const visible = projects.filter((p) => match(p, filter));

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="work-title" className="sec-title">
              Work <span>04</span>
            </h2>
          </div>

          <div className="work__filters" role="group" aria-label="작업물 분류">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`work__filter${filter === f ? " is-on" : ""}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f} <span>{count(f)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="work__stairs">
          {[0, 1].map((col) => (
            <ul className="work__col" key={col}>
              {visible.map((p, i) => (i % 2 === col ? <WorkCard key={p.slug} project={p} order={i} /> : null))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
