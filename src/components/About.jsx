import { profile } from "../data/profile";
import { useToast } from "../context/ToastContext";
import ImagePlaceholder from "./ImagePlaceholder";
import "./About.css";

export default function About() {
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
