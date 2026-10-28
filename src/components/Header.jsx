import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../hooks/scrollToSection";
import "./Header.css";

const NAV = [
  { id: "about", label: "소개" },
  { id: "skills", label: "기술" },
  { id: "approach", label: "일하는 방식" },
  { id: "work", label: "작업물" },
];
const SECTION_IDS = [...NAV.map((n) => n.id), "contact"];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS, isHome);
  const [open, setOpen] = useState(false);

  // 모바일 메뉴: 페이지가 바뀌거나 Esc를 누르면 닫습니다.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // 현재 페이지에 섹션이 있으면 바로 스크롤, 없으면(상세 페이지 등) 홈으로 간 뒤 스크롤
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (!scrollToSection(id)) navigate("/", { state: { scrollTo: id } });
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label="YEONJU 홈으로">
          <span className="header__logo" translate="no">
            YEONJU
          </span>
          <span className="header__role">Web Content Creator</span>
        </Link>

        <nav id="site-nav" className={`header__nav${open ? " is-open" : ""}`} aria-label="주요 메뉴">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "is-active" : ""}
              aria-current={active === n.id ? "location" : undefined}
              onClick={go(n.id)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-accent header__cta" onClick={go("contact")}>
          연락하기
        </a>

        <button
          type="button"
          className="header__menu"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "닫기" : "메뉴"}
        </button>
      </div>
    </header>
  );
}
