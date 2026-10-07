import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Gnb({ onOpenModal }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="gnb">
      <div className="gnb-inner">
        <Link to="/" className="gnb-mark">
          <svg className="star" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.8 6.8L20 11l-6.2 2.2L12 20l-1.8-6.8L4 11l6.2-2.2L12 2z" />
          </svg>
          portfolio
        </Link>

        {isHome ? (
          <ul className="gnb-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                {/* 같은 홈 라우트 안에서는 일반 앵커로 스크롤 이동 */}
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        ) : (
          <Link to="/" className="back-link back-link-visible">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            이전으로
          </Link>
        )}

        <div className="gnb-right">
          {/* <button className="drawer-btn" onClick={onOpenModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 4h12v16l-6-4-6 4V4Z" />
            </svg>
            <span className="hide-mobile">한눈에 보기</span>
          </button> */}
        </div>
      </div>
    </header>
  );
}