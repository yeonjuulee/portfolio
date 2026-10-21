// 프로젝트 데이터. 실제 내용/링크가 바뀌면 이 파일만 수정하면 됩니다.
export const projects = [
  {
    slug: "lookback",
    name: "LOOK BACK",
    tagline: "타인을 향한 무례함을 다루는 인터랙티브 시리어스 게임",
    stack: ["Vanilla JS", "HTML5", "CSS3"],
    team: "1인 개발 (기획·디자인·퍼블리싱 전담)",
    video: "/video/Lookback.mp4",
    featured: true,
    links: { 
      github: "https://github.com/nfuoah/Lookback", 
      demo: "https://nfuoah.github.io/Lookback/" 
    },
    overview:
      "타인을 향한 무례함이라는 사회적 주제를 16비트 레트로 감성의 게임 서사로 풀어내어, 플레이어가 1인칭 시점에서 자신의 선택에 따른 업보와 타인과의 관계 변화를 직접 체감하도록 설계한 인터랙티브 웹 게임입니다.",
    process:
      "마우스 커서 비율 연산 기반의 패럴랙스(Parallax) 기법으로 2D 화면에 입체감을 불어넣었으며, keydown 이벤트 기반 커스텀 방향키 입력 미니게임을 구축해 유저 인터랙션을 유도했습니다. 또한 유저의 무례 선택 기록(rudeHistory)을 추적해 다음 날 시나리오를 동적으로 재구성하는 타임루프 알고리즘을 설계했습니다.",
    codeCaption:
      "마우스 비율 연산 패럴랙스 배경 무빙 및 방향키 연타 미니게임 로직은 직접 작성했고, 무례 선택 기록 추적 기반 동적 시나리오 배열 필터링 알고리즘은 AI와 초안을 잡은 뒤 조건별 루프 탈출 예외 처리를 직접 검증해 완성했습니다.",
    code: [
      {
        title: "마우스 위치 비율 기반 배경 패럴랙스 무빙",
        ai: false,
        lines: [
          "window.addEventListener('mousemove', (e) => {",
          "  const xPercent = e.clientX / window.innerWidth;",
          "  const yPercent = e.clientY / window.innerHeight;",
          "  const moveX = (xPercent - 0.5) * -60; // 마우스 이동 반대 방향 연산",
          "  const moveY = (yPercent - 0.5) * -60;",
          "  bgPan.style.transform = `translate(${moveX}px, ${moveY}px)`;",
          "});",
        ],
      },
      {
        title: "keydown 이벤트 기반 방향키 연타 미니게임",
        ai: false,
        lines: [
          "function handleKeyDown(e) {",
          "  e.preventDefault();",
          "  if (e.key === targetCommands[userProgress]) {",
          "    document.getElementById(`arrow-${userProgress}`).classList.add('success');",
          "    if (++userProgress >= 10) endGame(true);",
          "  } else { endGame(false); }",
          "}",
        ],
      },
      {
        title: "무례 기록 추적 기반 동적 시나리오 재구성 알고리즘",
        ai: true,
        lines: [
          "function runScenario(index) {",
          "  if (index >= scenarios.length) {",
          "    if (currentDay === 1 && rudeHistory.length > 0) {",
          "      currentDay = 2;",
          "      // 전날 무례했던 장소(location)만 추출하여 Day 2 시나리오 동적 생성",
          "      scenarios = day2Scenarios.filter(s => rudeHistory.includes(s.location));",
          "      showDayTransition(currentDay, '...', () => runScenario(0));",
          "    }",
          "  }",
          "}",
        ],
      },
    ],
  },
  {
    slug: "nop",
    name: "NOP!",
    tagline: "외국인 관광객을 위한 실시간 바가지 방지 지원 서비스",
    stack: ["HTML5", "CSS3", "JavaScript", "VanillaTilt"],
    team: "3인 팀 (기획 1인, 디자인 1인, 프론트엔드·퍼블리싱 1인)",
    video: "/video/NOP.mp4",
    featured: true,
    links: {
      github: "https://github.com/nfuoah/nop.",
      demo: "https://nfuoah.github.io/nop./"
    },
    overview:
      "외국인 관광객이 부당 요금 피해를 예방할 수 있도록 돕는 NOP 서비스의 핵심 기능(스캔, 지도, 시세, 신고)을 직관적으로 소개하는 웹 랜딩페이지입니다.",
    process:
      "IntersectionObserver API를 적용해 스크롤 시점에 맞춘 차트 애니메이션으로 렌더링 성능을 최적화하고, 무한 슬라이더 구현 시 DOM 재배치 기법으로 메모리 효율을 극대화했습니다. 또한 백엔드 API 없이도 사용자가 실제 카메라인 듯 상호작용할 수 있는 타이머 기반 스캔 시뮬레이션 로직을 구축했습니다.",
    codeCaption:
      "메인 폰 3D 카드 틸트 이펙트(VanillaTilt)는 직접 작성해 적용했으며, 비동기 스캔 모의 시뮬레이션 및 메모리 최적화 DOM 재배치 슬라이더 알고리즘은 AI와 초안을 작성한 뒤 인터랙션 주기와 예외 조건을 직접 검증하여 고도화했습니다.",
    code: [
      {
        title: "메인 그래픽 3D 카드 틸트 이펙트 (VanillaTilt)",
        ai: false,
        lines: [
          "VanillaTilt.init(document.querySelector('.home-phone'), {",
          "  max: 15,",
          "  speed: 2400,",
          "  glare: true,",
          "  'max-glare': 0.3,",
          "  'mouse-event-element': document.querySelector('#NOP')",
          "});"
        ]
      },
      {
        title: "스캔 시뮬레이션 비동기 상태 전환",
        ai: true,
        lines: [
          "function startScan() {",
          "  pageWrap.classList.add('is-scanning');",
          "  setTimeout(() => {",
          "    pageWrap.classList.remove('is-scanning');",
          "    pageWrap.classList.add('is-done');",
          "  }, 1600);",
          "}"
        ]
      },
      {
        title: "requestAnimationFrame 기반 DOM 재배치 무한 슬라이더",
        ai: true,
        lines: [
          "function moveSlider() {",
          "  if (!isPaused) {",
          "    offset += speed;",
          "    const firstChild = reportTrack.firstElementChild;",
          "    if (firstChild && offset >= firstChild.getBoundingClientRect().width + 40) {",
          "      reportTrack.appendChild(firstChild); // 탈출한 DOM을 맨 뒤로 이동하여 재활용",
          "      offset -= (firstChild.getBoundingClientRect().width + 40);",
          "    }",
          "    reportTrack.style.transform = `translateX(${-offset}px)`;",
          "  }",
          "  requestAnimationFrame(moveSlider);",
          "}"
        ]
      }
    ]
  },
  {
    slug: "fruiting",
    name: "FRUITING",
    tagline: "국내 제철 과일 정보 및 상태 맞춤 큐레이션 웹 서비스",
    stack: ["React", "JavaScript (ES6+)", "CSS3"],
    team: "1인 개발 (기획·디자인·개발 전담)",
    video: "/video/Fruiting.mp4",
    featured: true,
    links: { 
      github: "https://github.com/nfuoah/fruiting", 
      demo: "https://nfuoah.github.io/fruiting" 
    },
    overview:
      "국내 재배 과일 및 품종별 정보 도감부터 건강 상태·취향 맞춤 과일 큐레이션, 제철 과일 활용 레시피, 전국 과일 축제/체험 정보와 스크랩북(북마크) 기능을 제공하는 종합 과일 정보 플랫폼 웹 서비스입니다.",
    process:
      "맛과 현재 고민 상태를 조합한 AND 연산 기반 맞춤 과일 추천 알고리즘을 구축했으며, LocalStorage와 React Router의 location.state를 결합하여 스크랩북 데이터 보존 및 페이지 간 유기적인 데이터 전달을 구현했습니다. 또한 히스토리 replaceState 기법을 적용하여 외부 진입 시 자동 상세 뷰 렌더링 및 무한 재진입 버그를 차단했습니다.",
    codeCaption:
      "LocalStorage 기반 다중 스크랩북 및 조건 매칭 큐레이션 로직은 직접 작성했고, React Router의 location.state를 활용한 자동 상세 뷰 이동 및 history.replaceState 예외 처리 로직은 AI와 초안을 잡은 뒤 비동기 상태 변화를 검증하여 완성했습니다.",
    code: [
      {
        title: "LocalStorage 기반 다중 카테고리 스크랩북 동기화 및 버블링 차단",
        ai: false,
        lines: [
          "// 브라우저 저장소 기반 스크랩북 읽기 및 상태 필터링",
          "const savedEvents = JSON.parse(localStorage.getItem('scrappedEvents')) || [];",
          "const savedRecipes = JSON.parse(localStorage.getItem('scrappedRecipes')) || [];",
          "",
          "// 카드 클릭 이벤트와 별개로 스크랩 해제 처리 (이벤트 버블링 차단)",
          "const handleRemoveEvent = (id, e) => {",
          "  e.stopPropagation();",
          "  const updated = scrappedEventIds.filter((eventId) => eventId !== id);",
          "  setScrappedEventIds(updated);",
          "  localStorage.setItem('scrappedEvents', JSON.stringify(updated));",
          "};",
        ],
      },
      {
        title: "다중 조건(AND 연산) 매칭 기반 맞춤 과일 처방전 큐레이션",
        ai: false,
        lines: [
          "// 사용자가 선택한 맛과 상태가 모두 일치하는 결과 과일 탐색",
          "const recommendedFruit = CurationList.find(",
          "  (item) => item.taste === selectedTaste && item.condition === selectedCondition",
          ");",
          "",
          "// 추천 결과 카드 클릭 시 원본 도감 상세 페이지로 연동",
          "function handleGoToDetail(fruitId) {",
          "  const originalFruit = FruitList.find((fruit) => fruit.id === fruitId);",
          "  if (originalFruit) navigate('/Fruit', { state: { fruit: originalFruit } });",
          "}",
        ],
      },
      {
        title: "Router State 진입 감지 및 history.replaceState 재진입 예외 처리",
        ai: true,
        lines: [
          "useEffect(() => {",
          "  if (location.state && location.state.autoSelectRecipe) {",
          "    const targetRecipe = location.state.autoSelectRecipe;",
          "    setSelectedRecipe(targetRecipe);",
          "    ",
          "    // 로컬스토리지 스크랩 유무 확인 및 별표 상태 동기화",
          "    const saved = JSON.parse(localStorage.getItem('scrappedRecipes')) || [];",
          "    setIsFavorite(saved.includes(targetRecipe.id));",
          "    ",
          "    // 뒤로가기 시 상세 화면으로 강제 재진입하는 버그 차단",
          "    window.history.replaceState({}, document.title);",
          "  }",
          "}, [location]);",
        ],
      },
    ],
  },
  {
    slug: "canada-aurora",
    name: "CANADA AURORA",
    tagline: "캐나다 오로라 정보 안내 및 무드 맞춤 플레이리스트 추천 UI/UX 웹 디자인",
    stack: ["Figma", "UI/UX Design", "Prototyping"],
    team: "1인 디자인 (기획·콘텐츠 디자인·프로토타이핑 전담)",
    video: "/video/Aurora.mp4",
    featured: true,
    links: {
      github: "",
      demo: "https://www.figma.com/proto/T7N0R7pB3pex43ZVNiWjpV/%EC%BD%98%ED%85%90%EC%B8%A0%EB%94%94%EC%9E%90%EC%9D%B8-%EC%98%A4%EB%A1%9C%EB%9D%BC-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8--%EB%B3%B5%EC%82%AC-?node-id=27-1985&page-id=0%3A1&starting-point-node-id=1%3A446&t=0fggh1gnmwd24yKn-1"
    },
    overview:
      "캐나다 지폐 10달러 화폐 마인드맵 분석에서 도출한 오로라 키워드를 바탕으로, 캐나다의 오로라 스팟 정보와 보고 싶은 오로라 색상/형태에 따른 감성 플레이리스트 추천 기능을 제공하도록 기획한 비주얼 인터랙티브 UI/UX 웹 프로젝트입니다.",
    process:
      "어두운 밤하늘과 오로라의 몽환적인 감성을 전달하기 위해 그라디언트 및 네온 컬러(#EC54C3, #78E6A2) 기반 무드보드를 구축했습니다. 메인 페이지는 인포그래픽 스타일 세로 스크롤 구조로 오로라의 원리 및 캐나다 명소를 지도 기반 스팟으로 직관적으로 안내하며, 서사적 카드 구조 디자인을 이용해 오로라 색상/모양 선택 시 유튜브 재생목록으로 연동되는 맞춤형 플레이리스트 프로토타입을 설계했습니다.",
    codeCaption:
      "웹 프로토타입 설계 및 기획서 전반을 직접 수행했으며, 지도 스팟 오버레이 겹침 버그 보정, 글로벌 네비게이션(GNB) 현재 위치 가시화, 유저 동선 최적화(뒤로가기/인터랙션 버튼) 개선 작업을 통해 완결성 높은 Figma 프로토타입을 완성했습니다.",
    code: []
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const getFeaturedProjects = () => projects.filter((p) => p.featured);