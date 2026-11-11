import { Link, Navigate, useParams } from "react-router-dom";
import { getProject, getNeighbors } from "../data/projects";
import { useToast } from "../context/ToastContext";
import ImagePlaceholder from "../components/ImagePlaceholder";
import CodeGroups from "../components/CodeGroups";
import "./ProjectDetail.css";


export default function ProjectDetail() {
  const { slug } = useParams();
  const { notify } = useToast();
  const project = getProject(slug);

  if (!project) return <Navigate to="/" replace />;

  const { prev, next } = getNeighbors(slug);
  const soft = (url, label) => (e) => {
    if (url === "#") {
      e.preventDefault();
      notify(`${label} 링크를 준비 중입니다.`);
    }
  };

  const specs = [
    ["구분", project.categories.join(" · ")],
    ["역할", project.role],
    ["인원", project.team],
    ["기간", project.period],
    ["사용 기술", project.stack.join(" · ")],
  ];

  const summary = [
    ["개요", project.overview],
    ["문제", project.problem],
    ["해결", project.solution],
    ["구현 과정", project.process],
    ["결과", project.result],
  ].filter(([, v]) => v);

  return (
    <main id="main" className="detail">
      <div className="container">
        <Link to="/" state={{ scrollTo: "work" }} className="detail__back">
          ← 작업물 목록
        </Link>

        <header className="detail__head">
          <div className="detail__chips">
            <span className="chip chip--ink">{project.categories.join(" · ")}</span>
            <span className="status">
              <span className={`status-dot ${project.status === "완료" ? "" : "wip"}`} aria-hidden="true" />
              {project.status}
            </span>
          </div>
          <h1 className="detail__title" translate="no">
            {project.name}
          </h1>
          <p className="detail__tagline">{project.tagline}</p>

          <div className="detail__links">
            {project.links.demo && (
              <a
                className="btn btn-primary"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                onClick={soft(project.links.demo, "웹사이트")}
              >
                {project.kind === "design" ? "시안 보기" : "웹사이트 보기"} ↗
              </a>
            )}
            {project.links.github && (
              <a
                className="btn btn-ghost"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={soft(project.links.github, "GitHub")}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </header>

        <dl className="detail__specs">
          {specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <ImagePlaceholder
          className="detail__media"
          ratio="16 / 9"
          src={project.cover || project.thumb}
          alt={`${project.name} 대표 이미지`}
          label="대표 이미지 16:9"
        />

        <section className="detail__block" aria-labelledby="summary-title">
          <h2 id="summary-title" className="detail__h2">
            제작 과정
          </h2>
          <dl className="detail__summary">
            {summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {project.code && project.code.length > 0 && (
          <section className="detail__block" aria-labelledby="code-title">
            <h2 id="code-title" className="detail__h2">
              핵심 코드
            </h2>
            <p className="detail__hint">
              {project.codeCaption || "기능 단위로 묶고, 묶음마다 직접 작성했는지 AI와 함께 작성했는지 표기했습니다."}
            </p>
            <CodeGroups groups={project.code} />
          </section>
        )}

        <section className="detail__block" aria-labelledby="screens-title">
          <h2 id="screens-title" className="detail__h2">
            화면 시안
          </h2>
          <div className="detail__screens">
            {project.screens && project.screens.length > 0
              ? project.screens.map((src, i) => (
                  <ImagePlaceholder key={src} ratio={project.screenRatio || "16 / 10"} src={src} alt={`${project.name} 화면 ${i + 1}`} label={`SCREEN ${i + 1}`} />
                ))
              : [1, 2, 3, 4].map((n) => <ImagePlaceholder key={n} ratio="16 / 10" label={`SCREEN ${n}`} />)}
          </div>
        </section>

        <nav className="detail__nav" aria-label="다른 프로젝트">
          <Link to={`/project/${prev.slug}`}>
            <small>← 이전</small>
            <strong>{prev.name}</strong>
          </Link>
          <Link to={`/project/${next.slug}`}>
            <small>다음 →</small>
            <strong>{next.name}</strong>
          </Link>
        </nav>
      </div>
    </main>
  );
}
