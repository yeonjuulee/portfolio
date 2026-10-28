import { useEffect } from "react";
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
  useEffect(() => {
    if (!(state && state.scrollTo)) window.scrollTo(0, 0);
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
