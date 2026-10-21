import { useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "../data/projects";

export default function ProjectList() {
  const projects = getFeaturedProjects();
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const goTo = (i) => setIndex((i + projects.length) % projects.length);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="my-project">
          <div className="my-project-text">
            <h2 className="my-project-title disp">
              MY
              <br />
              Project <span className="my-project-bracket">(</span>
            </h2>

            <div className="my-project-meta">
              <p className="my-project-name">{project.name}</p>
              <p className="my-project-stack">{project.stack.join(" · ")}</p>
            </div>

            <Link to="/projects" className="my-project-more disp">
              More <span className="arrow">&gt;</span>
            </Link>
          </div>

          <div className="my-project-media">
            <div className="my-project-viewport">
              <div
                className="my-project-track"
                style={{ transform: `translateY(-${index * 100}%)` }}
              >
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/project/${p.slug}`}
                    className="my-project-slide"
                  >
                    {p.video ? (
                      <video
                        className="my-project-video"
                        src={p.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <div className="my-project-placeholder" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="my-project-nav">
              <button type="button" onClick={goPrev} aria-label="이전 프로젝트">
                ↑
              </button>
              <button type="button" onClick={goNext} aria-label="다음 프로젝트">
                ↓
              </button>
            </div>
          </div>

          <span className="my-project-bracket my-project-bracket-close disp">)</span>
        </div>
      </div>
    </section>
  );
}