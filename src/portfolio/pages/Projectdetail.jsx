import { Link, Navigate, useParams } from "react-router-dom";
import CodeBlock from '../Codeblock';
import { useToast } from '../context/Toastcontext';
import { projects, getProjectBySlug } from '../data/Projects';

const TOC = [
  { id: "overview", label: "개요" },
  { id: "process", label: "제작 및 문제 해결 과정" },
  { id: "code", label: "핵심 코드" },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { showToast } = useToast();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  const handlePlaceholderLink = (e, href) => {
    if (href === "#") {
      e.preventDefault();
      showToast("연결할 링크를 준비 중입니다.");
    }
  };

  return (
    <article className="detail-page detail-page-static">
      <div className="wrap detail-hero">
        <div className="detail-eyebrow">
          <Link to="/projects">← 전체 프로젝트</Link>
        </div>
        <div className="detail-thumb-lg" />
        <h1 className="detail-title disp">{project.name}</h1>
        <p className="detail-tagline">{project.tagline}</p>
        <div className="detail-stack">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="detail-links">
          <a
            href={project.links.github}
            className="btn btn-primary"
            onClick={(e) => handlePlaceholderLink(e, project.links.github)}
          >
            GitHub 저장소
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
          <a
            href={project.links.demo}
            className="btn btn-ghost"
            onClick={(e) => handlePlaceholderLink(e, project.links.demo)}
          >
            웹사이트 바로가기
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        </div>
      </div>

      {/* 페이지 이동 없이 같은 페이지 내 스크롤 이동 */}
      <nav className="detail-toc">
        {TOC.map((t) => (
          <button key={t.id} className="toc-link" onClick={() => scrollToSection(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>

      <div className="wrap detail-body">
        <div className="detail-block" id="overview">
          <h5>개요</h5>
          <p>{project.overview}</p>
        </div>
        <div className="detail-block" id="process">
          <h5>제작 및 문제 해결 과정</h5>
          <p>{project.process}</p>
        </div>
        <div className="detail-block" id="code">
          <h5>핵심 코드</h5>
          <CodeBlock lines={project.code} caption={project.codeCaption} />
        </div>
      </div>

      <div className="wrap detail-nav">
        {prev ? (
          <Link to={`/project/${prev.slug}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            이전 프로젝트: {prev.name}
          </Link>
        ) : (
          <Link to="/projects">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            목록으로
          </Link>
        )}

        {next ? (
          <Link to={`/project/${next.slug}`}>
            다음 프로젝트: {next.name}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        ) : (
          <Link to="/projects">
            목록으로
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}