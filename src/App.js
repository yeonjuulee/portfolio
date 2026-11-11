import { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import "./styles/global.css";

// 페이지가 바뀌면 맨 위로. (헤더 메뉴로 특정 섹션을 지정해 들어온 경우는 제외)
function ScrollToTop() {
  const { pathname, state } = useLocation();
  // html 에 scroll-behavior: smooth 가 걸려 있어 scrollTo 가 "아래→위로 스르륵 올라가는" 모션이 되므로,
  // 이동 순간에는 즉시(auto) 맨 위로 보내고(화면이 그려지기 전 useLayoutEffect) 설정을 되돌립니다.
  useLayoutEffect(() => {
    if (state && state.scrollTo) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    void root.offsetHeight; // 스타일 변경을 바로 적용시킨 뒤 이동해야 부드러운 스크롤이 끼어들지 않습니다.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    root.style.scrollBehavior = prev;
  }, [pathname, state]);
  return null;
}

// 라우터(BrowserRouter)는 index.js에서 감쌉니다.
export default function App() {
  return (
    <ToastProvider>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Contact />
    </ToastProvider>
  );
}
