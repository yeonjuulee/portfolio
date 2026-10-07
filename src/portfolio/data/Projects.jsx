// 프로젝트 데이터. 실제 내용/링크/코드가 바뀌면 이 파일만 수정하면 됩니다.


export const projects = [
  {
    slug: "lookback",
    name: "LOOK BACK",
    tagline: "타인을 향한 무례함을 다루는 인터랙티브 시리어스 게임",
    stack: ["Vanilla JS", "HTML5", "CSS3"],
    featured: true,
    links: { github: "#", demo: "#" }, // 실제 주소 생기면 교체
    overview:
      "타인을 향한 무례함이라는 사회적 주제를 게임 서사로 풀어내어, 플레이어가 1인칭 시점에서 상황을 직접 체감하도록 설계했습니다.",
    process:
      "고해상도 그래픽 에셋으로 인한 네트워크 병목 현상을 WebP 포맷 전환으로 완화하고, Image 객체 기반 Preload / Lazy Loading 파이프라인을 장면 진입 시점에 맞춰 분기 처리했습니다. 로딩 사이 어색한 화면 전환은 페이드인 트랜지션으로 자연스럽게 보완했습니다.",
    codeCaption:
      "씬 로딩과 Preload 함수는 직접 작성했고, 느린 네트워크 대비 재시도(withRetry) 로직은 AI와 초안을 잡은 뒤 재시도 횟수·예외 조건을 직접 검증했습니다.",
    code: [
      { text: "async function loadScene(images) {", ai: false },
      { text: "  const loaded = await withRetry(() => preloadScene(images));", ai: false },
      { text: "  playFadeIn();", ai: false },
      { text: "  return loaded;", ai: false },
      { text: "}", ai: false },
      { text: "", ai: false },
      { text: "function preloadScene(images) {", ai: false },
      { text: "  return Promise.all(images.map(src => new Promise((resolve, reject) => {", ai: false },
      { text: "    const img = new Image();", ai: false },
      { text: "    img.onload = () => resolve(img);", ai: false },
      { text: "    img.onerror = reject;", ai: false },
      { text: "    img.src = src;", ai: false },
      { text: "  })));", ai: false },
      { text: "}", ai: false },
      { text: "", ai: false },
      { text: "function withRetry(task, retries = 2) {", ai: true },
      { text: "  return task().catch(err => {", ai: true },
      { text: "    if (retries <= 0) throw err;", ai: true },
      { text: "    return withRetry(task, retries - 1);", ai: true },
      { text: "  });", ai: true },
      { text: "}", ai: true },
    ],
  },
  {
    slug: "nop",
    name: "NOP!",
    tagline: "외국인 관광객을 위한 실시간 바가지 방지 지원 서비스",
    stack: ["HTML5", "CSS3", "JavaScript"],
    featured: true,
    links: { github: "#", demo: "#" },
    overview:
      "외국인 관광객 타겟의 실시간 현장 바가지 방지 지원 서비스로, 현장에서 즉시 확인 가능한 정보 제공에 초점을 맞췄습니다.",
    process:
      "PC 고정 픽셀 레이아웃으로 인해 발생하던 모바일 화면 깨짐과 가로 스크롤 문제를, 미디어 쿼리 기반 브레이크포인트 재설계와 rem·%·vh/vw 등 유연한 단위 적용, Flex/Grid 재구조화로 해결했습니다.",
    codeCaption:
      "auto-fit 기반 카드 그리드는 직접 작성했고, 브레이크포인트 판별 유틸은 AI와 초안을 잡은 뒤 실제 디바이스 테스트로 임계값을 직접 조정했습니다.",
    code: [
      { text: "/* 반응형 카드 그리드 */", ai: false },
      { text: ".price-card {", ai: false },
      { text: "  display: grid;", ai: false },
      { text: "  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));", ai: false },
      { text: "  gap: clamp(8px, 2vw, 20px);", ai: false },
      { text: "}", ai: false },
      { text: "", ai: false },
      { text: "// 브레이크포인트 판별 유틸", ai: true },
      { text: "function getBreakpoint(width) {", ai: true },
      { text: "  if (width < 480) return 'mobile';", ai: true },
      { text: "  if (width < 1024) return 'tablet';", ai: true },
      { text: "  return 'desktop';", ai: true },
      { text: "}", ai: true },
    ],
  },
  {
    slug: "fruit",
    name: "실시간 과일 시세 웹",
    tagline: "React와 Open API를 활용한 실시간 과일 시세 조회 서비스",
    stack: ["React", "Open API"],
    featured: false,
    links: { github: "#", demo: "#" },
    overview:
      "실시간 과일 시세 데이터를 Open API로 받아와 사용자가 품목별로 조회할 수 있도록 구성한 React 기반 웹 서비스입니다.",
    process:
      "상세 트러블슈팅 내용은 정리 중입니다. 완료 후 이 영역에 구체적인 문제 해결 과정을 추가할 예정입니다.",
    codeCaption:
      "테이블 컴포넌트는 직접 작성했고, Open API fetch 래퍼는 AI와 기본 구조를 잡은 뒤 실제 응답 포맷에 맞춰 에러 처리를 직접 보완했습니다.",
    code: [
      { text: "function PriceTable({ items }) {", ai: false },
      { text: "  return (", ai: false },
      { text: "    <table>", ai: false },
      { text: "      <tbody>", ai: false },
      { text: "        {items.map(item => (", ai: false },
      { text: "          <tr key={item.id}>", ai: false },
      { text: "            <td>{item.name}</td>", ai: false },
      { text: "            <td>{item.price}원</td>", ai: false },
      { text: "          </tr>", ai: false },
      { text: "        ))}", ai: false },
      { text: "      </tbody>", ai: false },
      { text: "    </table>", ai: false },
      { text: "  );", ai: false },
      { text: "}", ai: false },
      { text: "", ai: false },
      { text: "async function fetchPrices(url) {", ai: true },
      { text: "  try {", ai: true },
      { text: "    const res = await fetch(url);", ai: true },
      { text: "    if (!res.ok) throw new Error('API 응답 오류');", ai: true },
      { text: "    return await res.json();", ai: true },
      { text: "  } catch (err) {", ai: true },
      { text: "    console.error(err);", ai: true },
      { text: "    return [];", ai: true },
      { text: "  }", ai: true },
      { text: "}", ai: true },
    ],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const getFeaturedProjects = () => projects.filter((p) => p.featured);