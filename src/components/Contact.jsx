import { useState } from "react";
import { profile } from "../data/profile";
import { useToast } from "../context/ToastContext";
import "./Contact.css";

export default function Contact() {
  const { notify } = useToast();
  const [copied, setCopied] = useState(false);

  // mailto 링크는 환경에 따라 동작하지 않을 수 있어, 주소를 그대로 보여주고 복사 버튼을 함께 둡니다.
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      notify("복사에 실패했어요. 주소를 직접 선택해 복사해 주세요.");
    }
  };

  const soft = (url, label) => (e) => {
    if (url === "#") {
      e.preventDefault();
      notify(`${label} 링크를 준비 중입니다.`);
    }
  };

  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__layout">
        <h2 id="contact-title" className="contact__title">
          웹 콘텐츠 제작자를
          <br />
          찾고 계신가요?
        </h2>

        <div className="contact__side">
        <div className="contact__mail">
          <span className="contact__address">{profile.email}</span>
          <button type="button" className="btn btn-accent" onClick={copy}>
            {copied ? "복사됨" : "이메일 복사"}
          </button>
        </div>

        <ul className="contact__links">
          <li>
            <a href={profile.links.github} target="_blank" rel="noreferrer" onClick={soft(profile.links.github, "GitHub")}>
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={profile.links.resume} target="_blank" rel="noreferrer" onClick={soft(profile.links.resume, "이력서 PDF")}>
              이력서 PDF ↓
            </a>
          </li>
          <li>
            <a href={profile.links.cover} target="_blank" rel="noreferrer" onClick={soft(profile.links.cover, "자기소개서 PDF")}>
              자기소개서 PDF ↓
            </a>
          </li>
        </ul>
        </div>
        </div>

        <div className="contact__bottom">
          <span>© 2026 {profile.name}. All rights reserved.</span>
          <span className="contact__built">Built with React</span>
        </div>
      </div>
    </footer>
  );
}
