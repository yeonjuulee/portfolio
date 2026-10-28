import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { useToast } from "../context/ToastContext";
import ImagePlaceholder from "./ImagePlaceholder";
import QuickSummary from "./QuickSummary";
import "./Hero.css";

// 메인 첫 화면: 왼쪽 타이틀 + 오른쪽 전체 영상(왼쪽으로 갈수록 흰색으로 번짐)
export default function Hero() {
  const { notify } = useToast();
  const [quick, setQuick] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const [idx, setIdx] = useState(0);
  const cur = featured[idx] || projects[0];

  // "#" 로 둔 링크는 준비 중 토스트만 띄웁니다.
  const soft = (url, label) => (e) => {
    if (url === "#") {
      e.preventDefault();
      notify(`${label} 링크를 준비 중입니다.`);
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <ImagePlaceholder ratio="16 / 9" label="대표 작업물 영상 · 이미지" src={cur.thumb} video={cur.video} />
      </div>

      <div className="container hero__inner">
        <div className="hero__intro">

          <h1 id="hero-title" className="hero__title" translate="no">
            {profile.heroTitle.map((line) => (
              <span key={line} className="hero__line">
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__lead">{profile.heroSub}</p>

          <div className="hero__actions">
            <button type="button" className="btn btn-accent hero__primary" onClick={() => setQuick(true)}>
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
        </div>
      </div>

      <div className="container hero__overlay">
        <div className="hero__work">
          <p className="hero__proj" translate="no">
            {cur.name}
          </p>
          <div className="hero__row">
          <div className="hero__tabs" role="group" aria-label="대표 작업물 선택">
            {featured.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                className={i === idx ? "is-on" : ""}
                aria-pressed={i === idx}
                aria-label={p.name}
                onClick={() => setIdx(i)}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <Link to={`/project/${cur.slug}`} className="hero__go" aria-label={`${cur.name} 상세 프로젝트 보기`}>
            <span aria-hidden="true">→</span>
          </Link>
          </div>
        </div>
      </div>

      {quick && <QuickSummary onClose={() => setQuick(false)} />}
    </section>
  );
}
