import { useEffect, useRef } from "react";
import { profile } from "../data/profile";
import { useToast } from "../context/ToastContext";
import ImagePlaceholder from "./ImagePlaceholder";
import "./About.css";

const WN = 96; // 이력 음파 선 개수
const wnoise = (j) => {
  const s = Math.sin(j * 12.9898 + 4.14) * 43758.5453;
  return s - Math.floor(s);
};
// 이력이 있는 자리(각 항목의 날짜 위)만 솟아오르고, 최근 항목일수록 조금 더 높습니다.
const waveBase = (i, n) => {
  const x = i / (WN - 1);
  let a = 0.05 + 0.04 * wnoise(i);
  for (let k = 0; k < n; k += 1) {
    const c = (k + 0.22) / n;
    const h = 0.7 + 0.3 * (k / Math.max(1, n - 1));
    a += h * 0.85 * Math.exp(-(((x - c) / 0.032) ** 2)) * (0.65 + 0.35 * wnoise(i + 9));
  }
  return Math.min(0.97, a);
};

export default function About() {
  const waveRef = useRef(null);
  const n = profile.timeline.length;

  useEffect(() => {
    const el = waveRef.current;
    if (!el) return undefined;
    const bars = Array.from(el.children);
    const base = bars.map((_, i) => waveBase(i, n));
    const paint = (t, still) =>
      bars.forEach((b, i) => {
        const hi = base[i] > 0.3;
        const k = still ? 1 : hi ? 0.88 + Math.sin(t * 1.7 + i * 0.5) * 0.12 : 0.9 + Math.sin(t * 1.1 + i * 0.7) * 0.1;
        b.style.setProperty("--s", Math.min(1, base[i] * k).toFixed(3));
        b.classList.toggle("is-hi", hi);
      });
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(0, true);
      return undefined;
    }
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(el);
    const frame = (now) => {
      if (visible) paint(now / 1000, false);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [n]);

  const { notify } = useToast();

  const doc = (url, label) => (e) => {
    if (url === "#") {
      e.preventDefault();
      notify(`${label} 파일을 준비 중입니다.`);
    }
  };

  const rows = [
    ["이름", `${profile.name} (${profile.nameEn})`],
    ["학교", `${profile.school} 재학`],
    ["전공", `${profile.major} · ${profile.minor}`],
    ["희망 직무", profile.role],
  ];

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="about-title" className="sec-title">
              About <span>01</span>
            </h2>
          </div>
        </div>

        <div className="about__grid">
          <div className="about__intro card">
            <ImagePlaceholder className="about__photo" ratio="3 / 4" label="PROFILE 3:4" src="/images/profile.jpg" alt="이연주 프로필 사진" />
            <p className="about__statement">
              사용자 공감에서 시작해,
              <br />
              <em>코드로 완성</em>합니다.
            </p>
          </div>

          <dl className="about__facts card">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="about__timeline card">
            <h3>이력</h3>
            <div className="about__wave" ref={waveRef} aria-hidden="true">
              {Array.from({ length: WN }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <ol>
              {profile.timeline.map((t) => (
                <li key={t.title}>
                  <span className="mono">{t.period}</span>
                  <p>{t.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="about__docs">
          <a
            className="btn btn-ghost"
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            onClick={doc(profile.links.resume, "이력서 PDF")}
          >
            이력서 PDF 다운로드 <span aria-hidden="true">↓</span>
          </a>
          <a
            className="btn btn-ghost"
            href={profile.links.cover}
            target="_blank"
            rel="noreferrer"
            onClick={doc(profile.links.cover, "자기소개서 PDF")}
          >
            자기소개서 PDF 다운로드 <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
