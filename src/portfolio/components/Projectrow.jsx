import { Link } from "react-router-dom";


export default function ProjectRow({ project, isFirst }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className="proj-row"
      style={isFirst ? { borderTop: "1px solid var(--line-strong)" } : undefined}
    >
      <span className="proj-thumb" />
      <span className="proj-meta">
        <span className="proj-name">{project.name}</span>
        <span className="proj-tagline">{project.tagline}</span>
      </span>
      <span className="proj-stack">
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </span>
      <svg className="proj-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </Link>
  );
}