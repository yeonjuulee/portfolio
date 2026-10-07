import { Link } from "react-router-dom";
import ProjectRow from './Projectrow';
// 👇 [수정] Projects의 P를 대문자로 꼭 적어줘야 해!
import { projects, getFeaturedProjects } from '../data/Projects';

export default function ProjectList() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects">
      <div className="wrap">
        <p className="eyebrow">Projects</p>
        <h2 className="sec-title">핵심 프로젝트 2개를 먼저 소개합니다</h2>

        {featured.map((project, i) => (
          <ProjectRow key={project.slug} project={project} isFirst={i === 0} />
        ))}

        <Link to="/projects" className="proj-row-all">
          전체 프로젝트 보기
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </Link>
      </div>
    </section>
  );
}