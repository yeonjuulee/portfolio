import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../hooks/scrollToSection";
import Hero from "../components/Hero";
import WorkList from "../components/WorkList";
import Skills from "../components/Skills";
import Approach from "../components/Approach";
import About from "../components/About";

export default function Home() {
  const { state } = useLocation();

  // 상세 페이지의 헤더 메뉴에서 넘어온 경우(state.scrollTo) 해당 섹션으로 이동
  useEffect(() => {
    if (state && state.scrollTo) {
      const id = state.scrollTo;
      requestAnimationFrame(() => scrollToSection(id));
    }
  }, [state]);

  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Approach />
      <WorkList />
    </main>
  );
}
