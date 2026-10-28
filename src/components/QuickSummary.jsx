import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skills, scoreOf } from "../data/skills";
import { useToast } from "../context/ToastContext";
import ImagePlaceholder from "./ImagePlaceholder";
import "./QuickSummary.css";

// "빠르게 보기" 모달. 닫기 버튼으로만 닫힙니다(배경 클릭/ESC로는 닫히지 않음).
export default function QuickSummary({ onClose }) {
  const closeRef = useRef(null);
  const { notify } = useToast();
  const soft = (url, label) => (e) => {
    if (url === "#") {
      e.preventDefault();
      notify(`${label} 파일을 준비 중입니다.`);
    }
  };

  const panelRef = useRef(null);

  useEffect(() => {
    const trigger = document.activeElement; // 닫을 때 포커스를 돌려줄 버튼
    const root = document.getElementById("root");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (root) root.setAttribute("inert", ""); // 뒤쪽 페이지는 키보드/스크린리더에서 제외
    closeRef.current && closeRef.current.focus();

    // Tab 포커스가 모달 안에서만 순환하게 합니다.
    const trap = (e) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll("a[href], button, [tabindex]:not([tabindex='-1'])");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);

    return () => {
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = prev;
      if (root) root.removeAttribute("inert");
      if (trigger && trigger.focus) trigger.focus();
    };
  }, []);

  const dev = skills.filter((s) => s.category === "개발");
  const cat = (c) => projects.filter((p) => p.categories.includes(c)).length;
  const featured = projects.filter((p) => p.featured);

  return createPortal(
    <div className="qs" role="dialog" aria-modal="true" aria-labelledby="qs-title">
      <div className="qs__panel" ref={panelRef}>
        <div className="qs__bar">
          <div>
            <h2 className="qs__title" id="qs-title">
              <span translate="no">{profile.name}</span> · {profile.role}
            </h2>
            <p>
              {profile.school} {profile.major} · {profile.minor}
            </p>
          </div>
          <button ref={closeRef} type="button" className="btn btn-ghost qs__close" onClick={onClose}>
            닫기
          </button>
        </div>

        <div className="qs__grid">
          <section className="qs__tile qs__t1" aria-label="프로젝트 수">
            <h3>프로젝트</h3>
            <p className="qs__num">
              {projects.length}
              <small>개</small>
            </p>
            <p>
              기획 {cat("기획")} · 디자인 {cat("디자인")} · 개발 {cat("개발")}
            </p>
          </section>

          <section className="qs__tile qs__t2">
            <h3>기술 · 활용도</h3>
            <ul className="qs__bars">
              {dev.map((s) => {
                const { percent } = scoreOf(s);
                return (
                  <li key={s.name}>
                    <b>
                      {s.name}
                      <span>{percent}%</span>
                    </b>
                    <i aria-hidden="true">
                      <u style={{ width: `${percent}%` }} />
                    </i>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="qs__tile qs__t3">
            <h3>대표 작업물</h3>
            <ul className="qs__thumbs">
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link to={`/project/${p.slug}`} onClick={onClose}>
                    <ImagePlaceholder ratio="2 / 1" label={p.name.toUpperCase()} src={p.thumb} />
                    <strong>{p.name}</strong>
                    <span>{p.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="qs__tile qs__t4">
            <h3>연락 · 서류</h3>
            <p className="qs__mail">{profile.email}</p>
            <div className="qs__btns">
              <a
                className="btn btn-primary"
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                onClick={soft(profile.links.resume, "이력서 PDF")}
              >
                이력서 PDF
              </a>
              <a
                className="btn btn-ghost"
                href={profile.links.cover}
                target="_blank"
                rel="noreferrer"
                onClick={soft(profile.links.cover, "자기소개서 PDF")}
              >
                자기소개서 PDF
              </a>
            </div>
            <p className="qs__links">
              <a href={profile.links.github} target="_blank" rel="noreferrer" onClick={soft(profile.links.github, "GitHub")}>
                GitHub ↗
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}
