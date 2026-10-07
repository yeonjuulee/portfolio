import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import ProjectList from "../components/Projectlist";
import { useToast } from "../context/Toastcontext";

export default function Home({ onOpenModal }) {
  const { showToast } = useToast();

  return (
    <main>
      <Hero onOpenModal={onOpenModal} />
      <About onResumeClick={() => showToast("연결할 PDF 파일을 준비 중입니다.")} />
      <Skills onExternalSkillClick={() => showToast("연결할 링크를 준비 중입니다.")} />
      <ProjectList />
    </main>
  );
}