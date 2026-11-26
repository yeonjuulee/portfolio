import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TransitionLink as Link } from "./RouteWave";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { useToast } from "../context/ToastContext";
import { asset } from "../utils/asset";
import "./QuickSummary.css";


const WN = 45; // 한 줄 소개 칸 음파 선 개수
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const noise = (j) => {
  const s = Math.sin(j * 12.9898 + 4.1414) * 43758.5453;
  return s - Math.floor(s);
};
const waveBase = (i, n) => {
  const x = i / (n - 1);
  const env = Math.pow(Math.max(0, 1 - Math.abs(x - 0.5) * 2), 0.8);
  return Math.min(0.95, env * (0.45 + 0.55 * noise(Math.min(i, n - 1 - i))) + 0.1);
};

// 일하는 방식 네 단계(요약). 자세한 내용은 Approach 섹션과 같은 흐름입니다.
const STEPS = [
  ["기획", "사용자와 목적을 먼저 정의한다"],
  ["설계", "구조와 화면 흐름을 시각 체계로 옮긴다"],
  ["구현", "AI와 역할을 나눠 개발 효율을 높인다"],
  ["개선", "사용자 입장에서 직접 써보고 고친다"],
];
const STACK = ["HTML / CSS", "JavaScript", "React", "p5.js", "Figma"];

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
  const waveRef = useRef(null);

  // 한 줄 소개 칸의 음파: 숨 쉬듯 움직이고, 마우스가 가까우면 해당 선이 솟아오릅니다.
  useEffect(() => {
    const el = waveRef.current;
    if (!el) return undefined;
    const tile = el.parentElement;
    const bars = Array.from(el.children);
    const cur = bars.map((_, i) => waveBase(i, WN));
    cur.forEach((v, i) => bars[i].style.setProperty("--s", v.toFixed(3)));
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let mx = -1;
    let raf = 0;
    const move = (e) => {
      const r = tile.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
    };
    const leave = () => {
      mx = -1;
    };
    tile.addEventListener("pointermove", move);
    tile.addEventListener("pointerleave", leave);
    const frame = (now) => {
      const t = now / 1000;
      for (let i = 0; i < WN; i += 1) {
        const x = i / (WN - 1);
        const b = waveBase(i, WN);
        const v = clamp(b + b * Math.sin(t * 1.5 + i * 0.55) * 0.14 + (mx >= 0 ? Math.exp(-(((x - mx) / 0.09) ** 2)) * 0.5 : 0), 0.06, 1);
        cur[i] += (v - cur[i]) * 0.14;
        bars[i].style.setProperty("--s", cur[i].toFixed(3));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      tile.removeEventListener("pointermove", move);
      tile.removeEventListener("pointerleave", leave);
    };
  }, []);

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
          <section className="qs__tile qs__t1" aria-label="한 줄 소개">
            <div className="qs__wf" ref={waveRef} aria-hidden="true">
              {Array.from({ length: WN }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <h3>한 줄 소개</h3>
            <p className="qs__pitch">{profile.heroSub.join(" ")}</p>
          </section>

          <section className="qs__tile qs__t2">
            <h3>일하는 방식</h3>
            <ol className="qs__steps">
              {STEPS.map(([mark, text]) => (
                <li key={mark}>
                  <b>{mark}</b>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
            <ul className="qs__stack" aria-label="사용 기술">
              {STACK.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section className="qs__tile qs__t3">
            <h3>대표 작업물</h3>
            <ul className="qs__thumbs">
              {featured.map((p) => {
                const img = p.cover || p.poster || p.thumb;
                return (
                  <li key={p.slug}>
                    <Link to={`/project/${p.slug}`} onClick={onClose} className="qs__pj">
                      {img ? <img src={asset(img)} alt="" loading="lazy" /> : <em>{p.name}</em>}
                      <span className="qs__pjtx">
                        <strong translate="no">{p.name}</strong>
                        <span>{p.quickTag || p.tagline}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
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
