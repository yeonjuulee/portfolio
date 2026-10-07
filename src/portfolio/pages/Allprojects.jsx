import { Link } from "react-router-dom";
import ProjectRow from '../components/Projectrow';
import { projects } from '../data/Projects';

export default function AllProjects() {
  return (
    <article className="detail-page detail-page-static">
      <div className="wrap detail-hero">
        <div className="detail-eyebrow">
          <Link to="/">← 홈으로</Link>
        </div>
        <h1 className="detail-title disp">전체 프로젝트</h1>
        <p className="detail-tagline">지금까지 진행한 모든 프로젝트입니다. 계속 추가될 예정입니다.</p>
      </div>
      <div className="wrap all-projects-list">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} isFirst={i === 0} />
        ))}
      </div>
    </article>
  );
}