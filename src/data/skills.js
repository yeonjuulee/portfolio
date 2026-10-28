// 기술 스택 데이터.
// 활용도(%) = 사용 기간 점수 × 40% + 투입 프로젝트 점수 × 60%
//  - 사용 기간 점수 : min(사용 개월 / 12개월, 1)
//  - 투입 프로젝트 점수 : 투입한 프로젝트 수 / 해당 분야 전체 프로젝트 수
//  기간이 길어도 실제로 많이 쓰지 않았다면 점수가 오르지 않도록 투입 비중을 더 높게 잡았습니다.
//  비율은 아래 WEIGHT 에서 바꿀 수 있습니다. (분야 = 개발 | 디자인)
import { projects } from "./projects";

export const MAX_MONTHS = 12;
export const WEIGHT = { months: 0.4, projects: 0.6 };
export const CATEGORIES = ["전체", "개발", "디자인"];

// category 별 전체 프로젝트 수는 projects.js 의 categories 에서 자동 계산합니다.
export const skills = [
  {
    name: "HTML5",
    category: "개발",
    months: 12,
    scope: "시맨틱 마크업 · 반응형 구조 설계",
    projects: ["lookback", "nop", "oreum", "bingsu"],
  },
  {
    name: "CSS3",
    category: "개발",
    months: 12,
    scope: "Flex/Grid 레이아웃 · 트랜지션 · 모바일 대응",
    projects: ["lookback", "nop", "oreum", "fruiting", "bingsu"],
  },
  {
    name: "JavaScript",
    category: "개발",
    months: 6,
    scope: "DOM 렌더링 · 이벤트 인터랙션 · 에셋 Preload",
    projects: ["lookback", "nop", "oreum", "fruiting", "taptap", "loss-signs"],
  },
  {
    name: "p5.js",
    category: "개발",
    months: 4, // 실제 사용 기간으로 교체
    scope: "인터랙티브 그래픽 · 리듬 게임 · 랜덤 연출",
    projects: ["taptap", "loss-signs"],
  },
  {
    name: "React",
    category: "개발",
    months: 6,
    scope: "컴포넌트 설계 · state 갱신 · Open API 연동",
    projects: ["fruiting"],
  },
  // ↓ 디자인 항목은 예시입니다. 실제 사용 기간과 프로젝트로 교체하세요.
  {
    name: "Figma",
    category: "디자인",
    months: 12,
    scope: "UI 시안 · 컴포넌트 · 프로토타입",
    projects: ["canada-aurora", "lookback", "enneagram"],
  },
  {
    name: "Illustrator",
    category: "디자인",
    months: 48,
    scope: "벡터 일러스트 · 캐릭터 · 오브젝트 드로잉",
    projects: ["enneagram"],
  },
];

export const tools = [
  { name: "Figma", note: "디자인 시안 검토 · 퍼블리싱 매핑" },
  { name: "Photoshop", note: "이미지 편집" },
  { name: "Illustrator", note: "벡터 그래픽" },
  { name: "Premiere", note: "영상 편집" },
  { name: "After Effects", note: "모션 그래픽" },
  { name: "Git / GitHub", note: "버전 관리 · 협업" },
  { name: "AI 도구", note: "메인 AI 구현 · 보조 AI 정리/검토 (코드 출처는 공개)" },
];

export const formatMonths = (m) => (m % 12 === 0 ? `${m / 12}년` : `${m}개월`);

// 분야별 전체 프로젝트 수 (projects.js 의 categories 기준)
export const projectTotal = (category) => projects.filter((p) => p.categories.includes(category)).length;

// 0~100 정수. 점수 계산에 쓴 값도 함께 돌려줘서 화면에서 근거를 보여줍니다.
export function scoreOf(skill) {
  const total = projectTotal(skill.category) || 1;
  const monthsScore = Math.min(skill.months / MAX_MONTHS, 1);
  const projectScore = Math.min(skill.projects.length / total, 1);
  const percent = Math.round((monthsScore * WEIGHT.months + projectScore * WEIGHT.projects) * 100);
  return { percent, total };
}

export const skillsByCategory = (c) => (c === "전체" ? skills : skills.filter((s) => s.category === c));
