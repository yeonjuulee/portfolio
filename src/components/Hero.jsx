import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { useToast } from "../context/ToastContext";
import { asset } from "../utils/asset";
import QuickSummary from "./QuickSummary";
import "./Hero.css";

const N = 81; // 음파 선 개수
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const noise = (j) => {
  const s = Math.sin(j * 12.9898 + 4.1414) * 43758.5453;
  return s - Math.floor(s);
};
// 좌우 대칭 마름모 모양 기본 높이(0~1)
const baseAt = (i, x) => {
  const j = Math.min(i, N - 1 - i);
  const env = Math.pow(clamp(1 - Math.abs(x - 0.5) * 2, 0, 1), 1.05);
  return clamp(env * (0.45 + 0.55 * noise(j)) + 0.04, 0.04, 0.98);
};

// 대표 프로젝트 선 위치: 전체 폭에 고르게 배치
function pickIndexes(n) {
  return Array.from({ length: n }, (_, k) => Math.round(((N - 1) * (k + 1)) / (n + 1)));
}

// 메인 첫 화면: 좌측 정렬 타이틀 + 음파. 파란 선에 올리면 선이 프로젝트 카드로 넓어집니다.
export default function Hero() {
  const { notify } = useToast();
  const [quick, setQuick] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const picks = pickIndexes(featured.length);
  const waveRef = useRef(null);

  // "#" 로 둔 링크는 준비 중 토스트만 띄웁니다.
  const soft = (url, label) => (e) => {
    if (url === "#") {
      e.preventDefault();
      notify(`${label} 링크를 준비 중입니다.`);
    }
  };

  // 숨쉬는 음파 + 커서 근처 선이 솟아오르는 반응 (requestAnimationFrame)
  useEffect(() => {
    const el = waveRef.current;
    if (!el) return undefined;
    const bars = Array.from(el.children);
    const xs = bars.map((_, i) => i / (N - 1));
    const cur = xs.map((x, i) => baseAt(i, x));
    cur.forEach((v, i) => bars[i].style.setProperty("--s", v.toFixed(3)));

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    let mx = -1;
    let raf = 0;
    let visible = true;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mx = clamp((e.clientX - r.left) / r.width, 0, 1);
    };
    const onLeave = () => {
      mx = -1;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(el);

    const frame = (now) => {
      if (visible) {
        const t = now / 1000;
        for (let i = 0; i < N; i += 1) {
          const x = xs[i];
          const b = baseAt(i, x);
          const breath = Math.sin(t * 1.5 + i * 0.55) * 0.1;
          const infl = mx >= 0 ? Math.exp(-(((x - mx) / 0.07) ** 2)) * 0.55 : 0;
          const tg = clamp(b + b * breath + infl, 0.05, 1);
          cur[i] += (tg - cur[i]) * 0.14;
          bars[i].style.setProperty("--s", cur[i].toFixed(3));
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <h1 id="hero-title" className="hero__title" translate="no">
          {profile.heroTitle.map((line) => (
            <span key={line} className="hero__line">
              {line}
            </span>
          ))}
        </h1>

        <p className="hero__lead">
          {profile.heroSub.map((line) => (
            <span key={line} className="hero__lead-line">
              {line}
            </span>
          ))}
        </p>

        <div className="hero__actions">
          <button type="button" className="hero__primary" onClick={() => setQuick(true)}>
            빠르게 보기
          </button>
          <div className="hero__docs" role="group" aria-label="서류와 링크">
            <a href={profile.links.resume} target="_blank" rel="noreferrer" onClick={soft(profile.links.resume, "이력서 PDF")}>
              이력서 PDF
            </a>
            <a href={profile.links.cover} target="_blank" rel="noreferrer" onClick={soft(profile.links.cover, "자기소개서 PDF")}>
              자기소개서 PDF
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" onClick={soft(profile.links.github, "GitHub")}>
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="hero__wave" ref={waveRef} role="group" aria-label="대표 프로젝트">
          {Array.from({ length: N }, (_, i) => {
            const k = picks.indexOf(i);
            if (k === -1) {
              return (
                <div className="wv" key={i} aria-hidden="true">
                  <i />
                </div>
              );
            }
            const p = featured[k];
            const img = p.cover || p.poster || p.thumb;
            return (
              <div className="wv wv--pick" key={i} tabIndex={0} role="group" aria-label={p.name}>
                <i className="wv__bar" />
                <span className="wv__tag" translate="no">
                  {p.name}
                </span>
                <div className="wv__panel">
                  {img ? <img src={asset(img)} alt="" loading="lazy" /> : <span className="wv__empty">{p.name}</span>}
                  <div className="wv__shade" />
                  <div className="wv__text">
                    <h2 translate="no">{p.name}</h2>
                    <p>{p.tagline}</p>
                    <Link to={`/project/${p.slug}`} aria-label={`${p.name} 상세 프로젝트 보기`}>
                      프로젝트 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {quick && <QuickSummary onClose={() => setQuick(false)} />}
    </section>
  );
}
