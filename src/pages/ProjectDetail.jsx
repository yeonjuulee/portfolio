import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProject, getNeighbors } from "../data/projects";
import { useToast } from "../context/ToastContext";
import ImagePlaceholder from "../components/ImagePlaceholder";
import CodeGroups from "../components/CodeGroups";
import ScreenViewer from "../components/ScreenViewer";
import "./ProjectDetail.css";


// 기획 · 디자인 · 개발 태그. 섹션을 나누지 않고 과정 안에서 어떤 판단이었는지만 표시합니다.
const TAG_CLASS = { 기획: "p", 디자인: "d", 개발: "v" };
const Tag = ({ name }) => <span className={`tg tg--${TAG_CLASS[name] || "v"}`}>{name}</span>;

// 메인 프로젝트: "기획 · 설계" / "트러블 슈팅" 두 탭 (projects.js 의 planning, trouble)
function ProcessTabs({ project }) {
  const hasPlan = project.planning && project.planning.length > 0;
  const hasTrouble = project.trouble && project.trouble.length > 0;
  const [tab, setTab] = useState(hasPlan ? "plan" : "trouble");
  if (!hasPlan && !hasTrouble) return null;

  const tabs = [
    hasPlan && ["plan", "기획 · 설계"],
    hasTrouble && ["trouble", "트러블 슈팅"],
  ].filter(Boolean);

  return (
    <div className="ptabs">
      {tabs.length > 1 && (
      <div className="ptabs__bar" role="tablist" aria-label="제작 과정 보기 방식">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls={`panel-${id}`} className={tab === id ? "is-on" : ""} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      )}

      {tab === "plan" && hasPlan && (
        <div className="ptabs__list ptabs__plan" role="tabpanel" id="panel-plan" aria-labelledby="tab-plan">
          {project.planning.map((it, i) => (
            <div className="prow" key={it.title}>
              <div className="prow__cat">
                <span className="prow__no">{String(i + 1).padStart(2, "0")}</span>
                <span className="prow__k">{it.tag}</span>
              </div>
              <div>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "trouble" && hasTrouble && (
        <ol className="ptabs__list" role="tabpanel" id="panel-trouble" aria-labelledby="tab-trouble">
          {project.trouble.map((it, i) => (
            <li className="pcard pcard--trouble" key={it.title}>
              <h3>
                <span className="pcard__no">{String(i + 1).padStart(2, "0")}</span>
                {it.title}
                {(it.tags || []).map((t) => (
                  <Tag key={t} name={t} />
                ))}
              </h3>
              <dl>
                {[
                  ["문제", it.problem],
                  ["원인", it.cause],
                  ["해결", it.fix, true],
                  ["결과", it.result],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v, em]) => (
                    <div key={k} className={em ? "is-fix" : ""}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

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

  // 탭이 있는 메인 프로젝트는 개요 → 탭(기획 · 설계 / 트러블 슈팅) → 결과, 그 밖에는 문제 → 해결 → 구현 과정 → 결과 한 흐름입니다.
  const tabbed = !!((project.planning && project.planning.length) || (project.trouble && project.trouble.length));
  const rows = tabbed
    ? []
    : [
        ["개요", project.overview],
        ["문제", project.problem],
        ["해결", project.solution],
        ["구현 과정", project.process],
      ];
  const summary = rows.filter(([, v]) => v);
  const tags = project.summaryTags || {}; // 예: { 문제: ["기획"], 해결: ["기획", "디자인"] }

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
          {summary.length > 0 && (
          <dl className="detail__summary">
            {summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  {(tags[k] || []).map((t) => (
                    <Tag key={t} name={t} />
                  ))}
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          )}
          {tabbed && <ProcessTabs key={project.slug} project={project} />}
        </section>

        <section className="detail__block" aria-labelledby="screens-title">
          <h2 id="screens-title" className="detail__h2">
            화면 시안
          </h2>
          <ScreenViewer project={project} />
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

        {project.result && (
          <section className="detail__block" aria-labelledby="result-title">
            <h2 id="result-title" className="detail__h2">
              결과
            </h2>
            <p className="detail__result">{project.result}</p>
          </section>
        )}

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
