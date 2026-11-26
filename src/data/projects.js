// 프로젝트 데이터. 새 프로젝트는 배열에 객체 하나만 추가하면 목록/상세 페이지에 자동 반영됩니다.
//  kind   : "dev"(구현) | "design"(디자인)  — 상세 페이지 라벨용
//  categories : ["기획","디자인","개발"] 중 해당되는 것 (작업물 필터/카드 태그에 사용, 여러 개 가능)
//  hidden     : true 이면 사이트 전체에서 가립니다(데이터는 보존)
//  featured   : true 이면 첫 화면 오른쪽 "대표 작업물" 화면에 노출
//  status : "완료" | "진행 중" | "정리 중"
//  code   : [{ title, ai, lines: [...], why?, limit?, video? }]  — video: 해당 코드 결과 영상 경로 (예: "/video/code/nop-slider.mp4"), 비어 있으면 "준비 중" 회색 칸  (없으면 null — 상세 페이지에서 코드 섹션이 숨겨집니다)
//  overview / process / codeCaption : (선택) 상세 페이지 "개요/구현 과정" 및 코드 설명 문구
//  ※ 배열 순서 = 목록 순서 (최신 프로젝트가 위). 새 프로젝트는 맨 위에 추가하세요.
//  thumb  : 목록 카드(4:3) 이미지 경로 (public 기준). 상세 페이지 대표 이미지(16:9)도 겸합니다.
//  cover  : (선택) 상세 페이지 대표 이미지(16:9)를 따로 쓰고 싶을 때의 경로. 없으면 thumb 사용
//  screens: 화면 시안 이미지 경로 배열 (비어 있으면 회색 박스)
//  code[].peek: 평소(영상이 닫혀 있을 때) 영상 일부가 보이는 위치, 예 "76% 50%" (생략 시 가운데 위)
//  poster: 첫 화면 대표 영상이 로딩되기 전에 보일 이미지 (생략 시 cover/thumb)
//  screenVideo: { src, poster?, ratio?, chapters: [{ label, time(초) }] } — 있으면 화면 시안이 영상 하나 + 장면 버튼으로 보입니다 (없으면 screens 이미지)
//  screenRatio: 화면 시안 칸 비율, 예 "16 / 9" (생략 시 "16 / 9")
//  video  : public 폴더 기준 경로 ("/videos/xxx.mp4"). 비어 있으면 회색 박스가 보입니다.
const allProjects = [
  {
    slug: "keep-scrolling",
    hidden: true, // 사이트에서 가려 둔 프로젝트(목록·상세·이전/다음에서 모두 제외). 다시 보이려면 이 줄을 지우세요.
    planning: [
      {
        "title": "공개와 비공개 두 층으로, 발견하는 사이트",
        "tag": "기획",
        "body": "처음에는 '개인 비밀 블로그 염탐'과 사람 확인(reCAPTCHA) 콘셉트를 함께 두고, 카드를 눌러 상세 정보를 여는 허브 구조를 구상했습니다. 이후 공개 게시판과 비공개 게시판 두 층으로 정리했습니다. 자기소개와 작업물을 그대로 나열하면 끝까지 읽지 않고 지나가기 쉽고, 모든 정보를 클릭해야 보이게 하면 중요한 이력을 놓칩니다. 그래서 주요 작업물과 역량은 공개 게시판에서 바로 보이게 두고, 인터랙션은 추가 정보를 발견하는 용도로만 씁니다. neal.fun/not-a-robot에서는 CAPTCHA 틀을 미니 게임으로 바꾸는 방식을, Agreeee에서는 약관 동의 버튼을 숨겨 클릭하게 만드는 방식을 참고했습니다. 공개 게시판(작업물 아카이빙 · 작업 과정 · 관심사 · 가벼운 일상) → 본인 확인(I'm not a robot 체크박스) → 비공개 게시판(작업 뒷이야기 · 사적인 취미 · 일상 기록 · 솔직한 생각) 순서로 짰습니다."
      },
      {
        "title": "스크롤로 발견하고, 러프함으로 대비하기",
        "tag": "디자인",
        "body": "비공개 게시판은 푸터 아래에서 블러 처리된 채 나타나 스크롤 자체가 발견의 계기가 됩니다. 체크박스를 누르면 로딩 후 블러가 풀리고, 게시글을 누르면 CAPTCHA 미니 게임(이미지 선택, 숨은 버튼 찾기 등)이 열립니다. 3회 이상 실패하면 경고 팝업이 뜨고, 이후 비공개 게시글은 열리지 않습니다. 인증에 실패해도 사이트를 쓰는 데는 문제가 없습니다. 공개 게시판은 깔끔하고 정돈된 레이아웃, 비공개 게시판은 러프하고 정돈되지 않은 레이아웃으로 대비를 줍니다. 클립 · 메모장 · 북마크 · 작업 도구 같은 SVG 요소로 개인 스크랩북 느낌을 더할 계획입니다."
      }
    ],
    categories: ["기획", "디자인", "개발"],
    featured: false,
    name: "Keep Scrolling!",
    kind: "dev",
    tagline: "CAPTCHA 인증으로 숨은 비공개 게시판을 발견하는 인터랙티브 웹사이트",
    role: "웹사이트 기획 · 디자인 · 개발",
    team: "1인 제작",
    period: "2026.11 – 진행 중", // ※ 시작 시점은 임시 값입니다. 실제 날짜로 바꿔 주세요.
    year: "2026",
    status: "진행 중", // 현재 기획 단계. 구현은 아직 시작 전
    stack: ["HTML5", "CSS3", "JavaScript", "SVG"], // ※ 예정 기술입니다. 실제 사용한 것으로 바꿔 주세요.
    links: { github: "", demo: "" },
    thumb: "", // 상세 페이지 대표 이미지 (없으면 회색 박스)
    screens: [], // 화면 시안 이미지 (없으면 회색 박스 4개)
    video: "",
    overview: "웹인터랙션프로그래밍 수업에서 기획 중인 웹사이트입니다. 방문자는 작업물과 관심사가 담긴 공개 게시판을 둘러보고, 푸터 아래로 계속 스크롤하면 숨겨진 비공개 게시판을 발견합니다. 비공개 게시글은 CAPTCHA(사람 확인 인증)에서 착안한 미니 게임을 통과해야 볼 수 있고, 통과할수록 평소에는 드러내지 않던 취향과 작업 뒷이야기가 열려 서로 다른 모습의 나를 단계적으로 만나게 됩니다. 현재는 기획 단계이고 구현은 시작 전입니다.",
    problem: "자기소개와 작업물을 그대로 나열하면 방문자가 끝까지 읽지 않고 지나가기 쉽습니다. 반대로 모든 정보를 클릭해야만 보이게 하면 중요한 이력과 역량을 놓치게 됩니다.",
    solution: "주요 작업물과 역량은 공개 게시판에서 바로 보이게 두고, 인터랙션은 추가 정보를 발견하는 용도로만 씁니다. 비공개 게시판은 푸터 아래에서 블러 처리된 채 나타나게 해 스크롤 자체가 발견의 계기가 되도록 설계합니다. 인증에 실패해도 사이트를 쓰는 데는 문제가 없고, 비공개 게시글만 열리지 않습니다.",
    process: "① 콘셉트 도출: 처음에는 '개인 비밀 블로그 염탐'과 사람 확인(reCAPTCHA) 콘셉트를 함께 두고 카드를 눌러 상세 정보를 여는 허브 구조를 구상했습니다. 이후 공개 게시판과 비공개 게시판 두 층으로 정리했습니다.\n② 벤치마킹: neal.fun/not-a-robot에서는 CAPTCHA 틀을 미니 게임으로 바꾸는 방식을, Agreeee에서는 약관 동의 버튼을 숨겨 클릭하게 만드는 방식을 참고했습니다.\n③ 콘텐츠 구성: 공개 게시판(작업물 아카이빙·작업 과정·관심사·가벼운 일상) → 본인 확인(I'm not a robot 체크박스) → 비공개 게시판(작업 뒷이야기·사적인 취미·일상 기록·솔직한 생각) 순서로 짰습니다.\n④ 인터랙션 설계: 스크롤로 블러 처리된 비공개 게시판 등장 → 체크박스 클릭 후 로딩, 블러 해제 → 게시글 클릭 시 CAPTCHA 미니 게임(이미지 선택, 숨은 버튼 찾기 등). 성공하면 게임 팝업이 사라지고 게시글 팝업이 열립니다. 3회 이상 실패하면 경고 팝업이 뜨고, 팝업을 닫은 뒤에는 비공개 게시글을 누를 수 없습니다.\n⑤ 디자인 방향: 공개 게시판은 깔끔하고 정돈된 레이아웃, 비공개 게시판은 러프하고 정돈되지 않은 레이아웃으로 대비를 주고, 클립·메모장·북마크·작업 도구 같은 SVG 요소로 개인 스크랩북 느낌을 더할 계획입니다.\n⑥ 구현: 아직 시작 전입니다.",
    result: "",
    code: null,
  },
  {
    slug: "oreum",
    categories: ["기획", "디자인", "개발"],
    featured: true,
    name: "Oreum",
    kind: "dev",
    tagline: "고립 · 은둔 청년을 위한 사회복귀 브릿지 서비스 브랜드 웹사이트",
    role: "웹사이트 기획 · 디자인 · 제작",
    team: "6인 팀 (기획 2 · 디자인 3 · 개발 1)",
    period: "2026.10 – 2026.11",
    year: "2026",
    status: "완료",
    stack: ["HTML5", "CSS3", "JavaScript"], // 실제 사용 기술로 교체
    links: { github: "https://github.com/yeonjuulee/oreum", demo: "https://yeonjuulee.github.io/oreum/" },
    thumb: "/images/projects/oreum/thumb.jpg", // 목록 카드(4:3) 이미지
    cover: "/images/projects/oreum/cover.jpg", // 상세 페이지 대표 이미지(16:9)
    poster: "/images/projects/oreum/hero-poster.jpg", // 영상이 뜨기 전에 보이는 첫 장면
    video: "/video/code/oreum-intro.mp4", // 첫 화면 대표 영상(임시: 첫 번째 핵심 코드 시연 영상)
    screens: [
      "/images/projects/oreum/screen-1-intro.jpg",
      "/images/projects/oreum/screen-2-service.jpg",
      "/images/projects/oreum/screen-3-plan.jpg",
      "/images/projects/oreum/screen-4-design.jpg",
    ], // 화면 시안: INTRO → SERVICE → PLAN → DESIGN
    screenRatio: "16 / 9", // 화면 시안 칸 비율(생략 시 16 / 9)
    // 화면 시안 영상(A안: 영상 하나 + 장면 버튼). 지금은 대표 영상을 임시로 넣었습니다.
    // 시안 전체 영상이 준비되면 src 를 바꾸고 chapters 에 { label: "INTRO", time: 0 }, { label: "SERVICE", time: 12 } … 를 채우면 장면 버튼이 생깁니다.
    screenVideo: { src: "/video/code/oreum-intro.mp4", poster: "/images/projects/oreum/hero-poster.jpg", ratio: "16 / 9", chapters: [] },
    overview: "고립 · 은둔 청년을 위한 사회복귀 브릿지 서비스 브랜드 웹사이트입니다. 스토리·서비스·디자인·기획 4개 페이지를 6인 팀에서 웹사이트 기획·디자인·제작을 맡아 바닐라 JS 10개 모듈로 구현하고 있습니다.",
    problem: "① 스토리 페이지는 일반 스크롤 대신 '한 화면 연출'인데, 트랙패드 관성으로 휠 이벤트가 수십 번 들어와 한 번의 동작이 여러 장면을 넘기는 문제가 있었습니다.\n② 스토리는 한 번에 한 장면씩만 넘어가서, 이미 본 장면을 다시 보려면 스크롤을 여러 번 되돌려야 했고 지금 어디쯤인지도 알기 어려웠습니다.\n③ 기획 페이지는 정보량이 많아 섹션 단위 이동이 필요한데, 상단 고정바가 블록을 반만 가리는 지점에서 멈추면 가독성이 떨어졌습니다.\n④ 앱의 자가진단을 웹에서 직접 해 봐야 서비스가 이해되었습니다.",
    solution: "① 스토리는 '가상 위치 P'를 휠·스와이프·키로 움직이고 장면별 진행률 p(0~1)로 연출했으며, 휠은 '제스처 1회 = 1비트'로 판별했습니다.\n② 화면 왼쪽에 챕터 이동 내비를 두었습니다. 챕터를 누르면 그 챕터의 첫 페이지로 바로 이동하고, 현재 챕터와 '몇 번째 페이지 / 전체 페이지' 진행 상황이 함께 보이게 했습니다(chapnav.js).\n③ 섹션 이동 정지 지점을 블록 좌표로 계산해 고정바가 블록을 자르지 않도록 보정했습니다(plan.js).\n④ 자가진단을 '질문 4개 → 로딩 → 결과' 상태 머신으로 구현하고, 판정 규칙은 judge() 한 함수에 모았습니다.\n한편 수정 작업은 컴포넌트 단위로 나누고, 보조 AI로 수정 목적과 변경 범위를 정리한 뒤 메인 AI에 전달했으며, 구현 결과는 별도의 AI로 검토했습니다.",
    process: "① 스토리 엔진: story.js는 장면 data-len 비율로 P를 분할하고 장면별 로컬 진행률로 애니메이션을 구동합니다.\n② 챕터 내비: chapnav.js는 화면 왼쪽 가운데에 챕터 7개를 점으로 보여 주고, 현재 챕터의 점은 길어지며 페이지를 넘길수록 주황색으로 채워집니다. 점을 누르면 S.go()로 그 챕터의 첫 페이지로 이동합니다. 엔진의 onRender를 구독하는 구조라 엔진은 내비를 알지 못하고, 내비를 빼도 스토리는 그대로 동작합니다.",
    result: "스토리 페이지에서는 챕터 내비로 원하는 장면에 바로 이동하고 진행 상황을 확인할 수 있습니다. 현재 기준으로 JS를 10개 책임 단위 파일로 분리했고, 자가진단은 A 일상 회복형 · B 외출 준비형 · G 일반군 3유형 판정까지 구현했습니다. 프로젝트가 진행 중이라 계속 보완하고 있습니다.",
    // 메인 프로젝트 전용: 제작 과정을 "기획 · 설계" / "트러블 슈팅" 두 탭으로 보여 줍니다. (둘 다 비우면 문제 · 해결 · 구현 과정 한 흐름)
    //  planning: [{ title, tag: "기획" | "디자인" | "개발", body, image?, imageLabel? }]  (분류별로 하나씩만, 이미지 없이 글만)
    //  trouble : [{ title, tags: [...], problem, cause, fix, result }]
    //  ※ 아래 문장은 초안입니다. 실제 작업에 맞게 고쳐 주세요. image 에 경로를 넣으면 오른쪽 회색 칸이 이미지로 바뀝니다.
    planning: [
      {
        "title": "스토리 형식과 가로로 쌓이는 계단",
        "tag": "기획",
        "body": "기존 앱 서비스 소개 사이트처럼 '기획 → 디자인 → 서비스 소개' 순서로 기능을 늘어놓지 않고, 방문자가 장면을 따라가며 문제를 먼저 체감한 뒤 서비스에 도달하는 스토리 형식으로 구성했습니다. 서비스의 기획 의도를 설명이 아니라 흐름으로 전달하려는 선택입니다. 서비스를 '계단'이라는 소재로 소개하되, 두 가지 형태를 비교했습니다. 바닥에서 위로 솟는 세로 계단은 층이 높아질수록 크게 쌓여 보이는 반면, 가로로 한 층씩 차곡차곡 쌓이는 계단은 한 걸음의 크기가 일정하게 느껴집니다. 간단한 미션을 하나씩 해내며 일상 회복까지 이어 가는 서비스에는 후자가 더 잘 어울린다고 보고, 가로로 쌓이는 계단 구조로 만들었습니다."
      },
      {
        "title": "어두운 밤에서 밝은 서비스 화면으로",
        "tag": "디자인",
        "body": "스토리 페이지는 디자인 일관성을 위해 도트로 통일했습니다. 시작 화면은 어두운 밤 배경에 점으로만 구성하고, 서비스 소개부터는 밝은 화면에 브랜드 오렌지를 써서 \"다시 시작\"하는 분위기 변화를 색으로 보이게 했습니다."
      },
      {
        "title": "장면이 끊기지 않고 이어지는 스토리",
        "tag": "개발",
        "body": "스토리가 장면마다 끊기지 않고 자연스럽게 연결되도록 구현했습니다. 장면은 하나의 가상 위치 값으로 움직이고 장면별 진행률로 연출해, 휠 · 스와이프 · 키 입력 어떤 방식으로도 같은 흐름으로 넘어갑니다. 학교, 야구장, 제주도 모양도 따로 그리지 않고 점 배열 하나를 재사용해 모양만 바꿔, 점이 다음 모양으로 이어지듯 전환됩니다."
      }
    ],
    trouble: [
      {
        title: "트랙패드 관성 때문에 장면이 여러 칸 넘어간다",
        tags: ["개발"],
        problem: "스토리 페이지는 한 화면씩 연출되는데, 트랙패드 관성으로 휠 이벤트가 한 번에 수십 번 들어와 장면이 한꺼번에 넘어갔습니다.",
        cause: "마지막 이벤트 시각만 보면 관성이 이어지는 꼬리 이벤트가 새로운 스크롤처럼 보입니다.",
        fix: "이벤트 간격(180ms)과 delta 크기 증가(1.6배)를 함께 봐서 진짜 새 스크롤만 인식합니다. 스토리 페이지는 누적량이 36을 넘으면 한 칸만 이동하고 900ms 동안 잠급니다.",
        result: "의도한 한 번에 한 장면 이동이 장비와 관계없이 이어집니다. 임계값은 장비별 실측치라 계속 조정하고 있습니다.",
      },
      {
        title: "한 장면씩만 넘어가서 다시 보기 불편하다",
        tags: ["디자인", "개발"],
        problem: "장면이 하나씩 넘어가는 구조라, 이미 본 장면을 다시 보려면 스크롤을 여러 번 해야 했습니다.",
        cause: "스크롤 한 가지만 이동 수단이어서, 지금 어디쯤인지와 원하는 장면으로 바로 가는 방법이 없었습니다.",
        fix: "화면 왼쪽에 챕터 점 7개를 두고, 누르면 해당 장면으로 이동하며 현재 위치도 보이게 했습니다. 디자인은 밤 화면을 해치지 않게 작고 옅은 점으로 정했습니다.",
        result: "원하는 장면으로 한 번에 이동하고 진행 상황을 볼 수 있습니다.",
      },
      {
        title: "자가진단 결과가 조건에 따라 어긋난다",
        tags: ["기획", "개발"],
        problem: "질문 응답에 따라 A · B · 일반군으로 나누는 규칙이 화면 코드와 섞여, 답하지 않은 단계로 건너뛰거나 로딩 타이머가 겹칠 수 있었습니다.",
        cause: "판정 규칙과 화면 전환 코드가 한곳에 있어서, 규칙 순서와 이동 조건을 따로 확인하기 어려웠습니다.",
        fix: "판정은 순수 함수로 분리하고, 답한 단계까지만 이동하도록 막고, 화면을 보여 줄 때마다 이전 타이머를 정리하게 했습니다.",
        result: "A · B · G 3유형 판정까지 정상 동작합니다.",
      },
    ],
    codeCaption: "핵심 코드 2개는 모두 AI를 활용해 작성했습니다.",
    code: [
      {
        title: "인구 점 변환: 점 1개에서 1,000개 · 2.4만 · 67만 명으로",
        ai: true,
        video: "/video/code/oreum-intro.mp4", peek: "76% 50%", // 스토리 첫 장면(index.html)에서 점 1개가 학교 · 야구장 · 제주도 모양으로 바뀌는 모습 (약 14초)
        lines: [
          "// story.js: 단계별 점 개수(n)와 모양. 점 하나가 나타내는 사람 수도 단계마다 커집니다",
          "var STAGES = [",
          "  { n: 1,    r: 14 },                          // 점 1개",
          "  { n: 1000, r: 2.6,  shape: 'school' },       // 1점 = 1명",
          "  { n: 2400, r: 1.9,  shape: 'stadium' },      // 1점 = 10명 (2.4만 명)",
          "  { n: 6700, r: 1.35, shape: 'jeju' },         // 1점 = 100명 (67만 명)",
          "];",
          "function stageOf(p) { return p < 0.05 ? 0 : p < 0.17 ? 1 : p < 0.35 ? 2 : p < 0.57 ? 3 : p < 0.79 ? 4 : 5; }",
          "",
          "// 학교는 50 × 20 격자 = 1,000개. 창문과 출입문 자리는 어두운 점으로 칩니다",
          "for (let r = 0; r < SCH.rows; r++) for (let c = 0; c < SCH.cols; c++)",
          "  out.push([-SCH.w / 2 + (c + .5) * SCH.sp, -SCH.h / 2 + (r + .5) * SCH.sp]);",
          "",
          "// 매 프레임: 점은 최대 개수만큼 하나씩 재사용하고, 단계가 바뀌면 목표 위치만 바꿉니다",
          "for (let i = 0; i < MAXP; i++) {",
          "  const tg = dotTarget(i, hookStage);           // 이번 단계에 필요 없는 점은 null",
          "  const k = reduced ? 1 : spd[i];               // 점마다 속도가 달라 흩어졌다 모입니다",
          "  dpx[i] += (hcx + (tg ? tg[0] : outPos[i][0]) * HB - dpx[i]) * k;",
          "  dpy[i] += (hcy + (tg ? tg[1] : outPos[i][1]) * HB - dpy[i]) * k;",
          "  dpa[i] += ((tg ? 1 : 0) - dpa[i]) * (reduced ? 1 : .07);   // 필요 없는 점은 서서히 투명해짐",
          "}",
        ],
        why: "학교 · 야구장 · 제주도를 따로 그리지 않고, 점 하나하나의 현재 위치를 목표 위치로 조금씩 옮기는 방식으로 만들었습니다. 점 배열을 하나로 재사용하니 단계가 바뀔 때 점이 새로 생기거나 사라지지 않고 모양만 바뀌어, 점 1개가 1,000명이 되는 변화가 끊기지 않고 이어집니다. 스크롤 진행도는 stageOf로 단계 번호로 바꿔 장면과 숫자(1,000명 → 24,000명 → 670,000명)를 맞췄습니다.",
        limit: "최대 7,170개 점의 위치를 매 프레임 갱신하고 그리기 때문에 저사양 기기에서는 부담이 될 수 있습니다. 같은 색 점은 한 번에 묶어 그려 부담을 줄였고, '동작 줄이기' 설정에서는 애니메이션 없이 바로 목표 위치로 이동합니다. 화면이 작을 때 점 수를 줄이는 처리는 아직 없습니다.",
      },
      {
        title: "자가진단 상태 머신과 판정 규칙",
        ai: true,
        video: "/video/code/oreum-survey.mp4", // 서비스 페이지(service.html) Survey 영역에서 질문에 답하는 모습 (약 9초)
        lines: [
          "function judge() {",
          "  const o = +val(1), t = +val(2), d = +val(3), y = val(4); // 외출·대화·기간·어려움 유무",
          "  if (o >= 4 || d < 6 || y === 'no') return 'G'; // 일반군",
          "  if (o <= 1 && t <= 1) return 'A';              // 일상 회복형",
          "  if (o === 2 && t >= 2) return 'B';             // 외출 준비형",
          "  return o <= 1 ? 'A' : 'B';                     // 그 밖에는 외출 응답으로 결정",
          "}",
          "function reachable(i) {",
          "  for (let n = 1; n <= Math.min(i, 4); n++) if (!val(n)) return false;",
          "  return true;",
          "}",
          "function show(k) { clearTimeout(timer); /* 0~3 질문, 4 로딩, 5 결과 */ }",
        ],
        why: "판정 규칙을 UI 코드에 섞지 않고 순수 함수로 분리했습니다. 규칙 순서가 곧 우선순위(일반군 차단 → A → B → 나머지)이며, reachable로 답하지 않은 단계로의 점프를 막고, show() 시작에서 clearTimeout으로 로딩 타이머 중복을 방지합니다.",
        limit: "res.innerHTML 문자열 조합은 현재 정적 문구라 안전하지만 외부 입력이 들어오면 XSS 위험이 있습니다. template 요소나 textContent로 교체할 수 있습니다.",
      },
    ],
  },
  {
    slug: "nop",
    planning: [
      {
        "title": "스크린샷 나열 대신 눌러 보는 시뮬레이션",
        "tag": "기획",
        "body": "앱 소개 페이지에 정적 스크린샷을 나열하면 '스캔 → 결과 → 상세'라는 사용 흐름이 한눈에 읽히지 않고, 영상으로 대체하면 간판과 영수증 시나리오를 각각 촬영해야 해 제작 비용이 두 배가 됩니다. 그래서 영상 대신 실제 앱처럼 눌러 볼 수 있는 시뮬레이션으로 소개하기로 했습니다."
      },
      {
        "title": "로직과 표현을 나눈 구현",
        "tag": "개발",
        "body": "JS는 is-scanning → is-done → show-popup 클래스만 바꾸고 화면 전환은 CSS가 담당하게 했습니다. 탭별 이미지 세트는 scanData 객체로 묶어, 시나리오가 늘어나도 데이터만 추가하면 되도록 했습니다. IntersectionObserver 2종(그래프용 threshold 1.0, 페이드인용 0.3)으로 scroll 이벤트 리스너 없이 한 번만 실행하고, disconnect · unobserve로 정리했습니다. 도넛 그래프의 수치는 data-rate 속성에 두고, JS가 stroke-dasharray로 변환해 데이터와 표현을 분리했습니다."
      }
    ],
    trouble: [
      {
        "title": "기능 소개 타임라인에서 스크롤이 갇힌다",
        "tags": [
          "개발"
        ],
        "problem": "기능 소개 타임라인이 wheel을 가로채는 구조라, 사용자가 타임라인 안에 갇혀 다음 섹션으로 내려가지 못할 수 있었습니다.",
        "cause": "wheel 이벤트를 조건 없이 가로채면 스크롤이 섹션 밖으로 이어지지 않습니다.",
        "fix": "섹션이 화면을 가득 채울 때만 wheel을 가로채고, 첫 슬라이드와 마지막 슬라이드에서는 일반 스크롤로 빠져나오게 했습니다. 슬라이드별 상태는 tlStates 테이블로 선언했습니다.",
        "result": "타임라인을 지나 자연스럽게 다음 섹션으로 이어집니다."
      },
      {
        "title": "스캔 중 탭을 바꾸면 어중간한 화면이 남는다",
        "tags": [
          "개발"
        ],
        "problem": "스캔 시뮬레이션이 진행되는 중에 탭을 바꾸면 이전 시나리오의 상태가 남아 어중간한 화면이 되었습니다.",
        "cause": "상태를 클래스로 관리하는 구조라, 탭을 바꿀 때 이전 시나리오의 상태 클래스가 그대로 남았습니다.",
        "fix": "탭을 바꿀 때 진행 중이던 상태 클래스를 모두 제거하고, 탭별 자산은 scanData로 분리했습니다.",
        "result": "탭을 바꿔도 화면이 처음 상태로 돌아갑니다. 스캔 중 탭을 바꾸면 타이머가 남는 문제는 개선 과제로 남아 있습니다."
      },
      {
        "title": "신고 슬라이더가 hover 때 끊긴다",
        "tags": [
          "개발"
        ],
        "problem": "신고 슬라이더에 마우스를 올려 멈췄다가 다시 재개할 때 움직임이 끊기지 않아야 했습니다.",
        "cause": "CSS animation으로는 정지와 재개를 부드럽게 이어 붙이기 어렵습니다.",
        "fix": "CSS animation 대신 requestAnimationFrame으로 translateX를 직접 제어하고, 이미지 12장을 복제해 무한 루프를 만들었습니다.",
        "result": "hover 정지와 재개가 끊기지 않습니다. 슬라이더가 화면 밖에서도 구동되는 점은 개선 과제로 남아 있습니다."
      }
    ],
    categories: ["기획", "개발"],
    featured: true,
    name: "NOP!",
    kind: "dev",
    tagline: "외국인 관광객을 위한 실시간 바가지 방지 지원 서비스",
    role: "웹사이트 기획 · 디자인 · 제작",
    team: "3인 팀 (기획 1인, 디자인 1인, 프론트엔드·퍼블리싱 1인)",
    period: "2026.05 – 2026.06",
    year: "2026",
    status: "완료",
    stack: ["HTML5", "CSS3", "JavaScript", "VanillaTilt"],
    links: { github: "https://github.com/nfuoah/nop.", demo: "https://nfuoah.github.io/nop./" },
    thumb: "/images/projects/nop/thumb.jpg", // 썸네일 · 상세 대표 이미지
    screens: [
      "/images/projects/nop/1.jpg",
      "/images/projects/nop/2.jpg",
      "/images/projects/nop/3.jpg",
      "/images/projects/nop/4.jpg",
    ], // 화면 시안 이미지
    video: "/video/NOP.mp4",
    overview: "외국인 관광객의 부당 요금 피해를 예방하는 NOP! 서비스의 핵심 기능(스캔, 지도, 시세, 신고)을 소개하는 웹 랜딩페이지입니다. 프레임워크 없이 HTML·CSS·바닐라 JS만으로 통계 그래프, 기능 소개 타임라인, 스캔 시뮬레이션, 신고 슬라이더, 진입 애니메이션 5개 섹션을 설계하고 구현했습니다.",
    problem: "앱 소개 페이지에서 정적 스크린샷을 나열하면 '스캔 → 결과 → 상세'라는 사용 흐름이 한눈에 읽히지 않습니다. 영상으로 대체하면 간판과 영수증 시나리오를 각각 촬영해야 해 제작 비용이 두 배가 됩니다.",
    solution: "영상 대신 클래스 기반 상태 머신으로 실제 앱처럼 눌러 볼 수 있는 시뮬레이션을 만들었습니다. JS는 is-scanning → is-done → show-popup 클래스만 바꾸고 화면 전환은 CSS가 담당해 로직과 표현을 분리했습니다. 탭별 이미지 세트는 scanData 객체로 묶어, 시나리오가 늘어나도 데이터만 추가하면 되도록 했습니다.",
    process: "① 섹션 진입 감지: IntersectionObserver 2종(그래프용 threshold 1.0, 페이드인용 0.3)으로 scroll 이벤트 리스너 없이 한 번만 실행하고, disconnect·unobserve로 정리했습니다.\n② 기능 소개 타임라인: 섹션이 화면을 가득 채울 때만 wheel을 가로채고, 첫 슬라이드와 마지막 슬라이드에서는 일반 스크롤로 빠져나오게 해 스크롤이 갇히지 않도록 했습니다. 슬라이드별 상태는 tlStates 테이블로 선언했습니다.\n③ 스캔 시뮬레이션: scanData로 탭별 자산을 분리하고, 탭을 바꿀 때 진행 중이던 상태 클래스를 모두 제거해 어중간한 상태가 남지 않게 했습니다.\n④ 신고 슬라이더: CSS animation 대신 requestAnimationFrame으로 translateX를 직접 제어해 hover 정지·재개가 끊기지 않게 하고, 이미지 12장 복제만으로 무한 루프를 만들었습니다.\n⑤ 모션 정리: 수치는 data-rate 속성에 두고 JS가 stroke-dasharray로 변환해 도넛 그래프의 데이터와 표현을 분리했습니다.",
    result: "영상 없이 간판·영수증 2가지 시나리오를 직접 체험하는 스캔 화면을 구현했고, scroll 이벤트 리스너 없이 모든 섹션의 진입 동작을 처리했습니다. 스캔 중 탭을 바꾸면 타이머가 남는 문제와 슬라이더가 화면 밖에서도 구동되는 점은 개선 과제로 남아 있습니다.",
    codeCaption: "기능 소개 타임라인은 직접 작성했고, 무한 슬라이더와 스캔 시뮬레이션은 AI와 초안을 작성한 뒤 좌표 보정과 상태 초기화 조건을 직접 검증해 고도화했습니다. 각 묶음에 핵심 판단과 한계를 함께 적었습니다.",
    code: [
      {
        title: "기능 소개 타임라인: wheel 가로채기와 선언적 상태 테이블",
        ai: false,
        video: "/video/code/nop-timeline.mp4",
        lines: [
          "function isInSection() {",
          "  const r = section.getBoundingClientRect();",
          "  return r.top <= 0 && r.bottom >= window.innerHeight; // 섹션이 화면을 가득 채울 때만",
          "}",
          "window.addEventListener('wheel', (e) => {",
          "  if (!isInSection()) return;",
          "  if (current === TOTAL - 1 && e.deltaY > 0) return; // 마지막에서 아래로 → 탈출",
          "  if (current === 0 && e.deltaY < 0) return;         // 처음에서 위로 → 탈출",
          "  e.preventDefault();                                // passive: false 필수",
          "  if (isAnimating) return;                           // 600ms 잠금",
          "  goTo(e.deltaY > 0 ? current + 1 : current - 1);",
          "}, { passive: false });",
        ],
        why: "preventDefault를 쓰는 것보다 언제 쓰지 않는지가 핵심입니다. 섹션 밖에서는 개입하지 않고 경계에서는 일반 스크롤로 빠져나오게 했으며, 슬라이드 상태는 tlStates 테이블(top·dot·labelDim·hidden)로 선언해 슬라이드를 추가할 때 행만 추가하면 됩니다.",
        limit: "키보드 접근성과 prefers-reduced-motion은 적용하지 않았습니다. 다음에는 방향키 처리와 모션 감소 대응을 추가할 계획입니다.",
      },
      {
        title: "requestAnimationFrame 기반 DOM 재배치 무한 슬라이더",
        ai: true,
        video: "/video/code/nop-slider.mp4",
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
          "}",
        ],
        why: "떼어낸 폭만큼 offset을 보정해 재배치 순간 튀는 현상을 없앴습니다. CSS animation 루프는 hover 정지·재개 시 위치가 튀고 복제본 수를 정확히 맞추기 어렵습니다.",
        limit: "프레임마다 getBoundingClientRect를 호출하고, gap 40이 JS에 하드코딩되어 있으며, 섹션이 화면 밖에 있어도 rAF가 계속 돕니다. 폭 캐시, CSS 변수 사용, IntersectionObserver 기반 정지로 개선할 수 있습니다.",
      },
      {
        title: "스캔 시뮬레이션: 데이터 분리와 클래스 상태 머신",
        ai: true,
        video: "/video/code/nop-scan.mp4",
        lines: [
          "const scanData = {",
          "  sign:    { main: 'img/service-scan01.png', loading: 'img/service-scan01-1.png', result: 'img/service-scan01-2.png', popup: 'img/service-scan01-3.png' },",
          "  receipt: { main: 'img/service-scan02.png', loading: 'img/service-scan02-1.png', result: 'img/service-scan02-2.png', popup: 'img/service-scan02-3.png' }",
          "};",
          "// 탭 전환: 이미지 세트를 교체하고 진행 중이던 상태 클래스를 모두 제거",
          "pageWrap.classList.remove('is-scanning', 'is-done', 'show-popup');",
          "",
          "function startScan() {",
          "  pageWrap.classList.add('is-scanning');",
          "  setTimeout(() => {",
          "    pageWrap.classList.remove('is-scanning');",
          "    pageWrap.classList.add('is-done');",
          "  }, 1600);",
          "}",
        ],
        why: "탭 전환 시 상태 클래스를 초기화해 재진입 안정성을 확보하고, 이미지 자산을 데이터로 분리해 시나리오가 늘어나도 코드를 바꾸지 않도록 했습니다.",
        limit: "1600ms setTimeout이 탭 전환 후에도 남아 있어, 스캔 중 탭을 바꾸면 새 탭에 is-done이 붙을 수 있습니다. timer id를 저장해 탭 전환 시 clearTimeout하는 방식으로 보완할 수 있습니다.",
      },
    ],
  },
  {
    slug: "taptap",
    planning: [
      {
        "title": "초안에서 선택과 위험 요소를 더한 최종안으로",
        "tag": "기획",
        "body": "메인 화면 → 게임 설명 → 게임 시작 → 게임 진행 → 최종 점수 출력 흐름을 그리고, 초안과 최종안 두 버전으로 나눠 규칙을 비교해 확정했습니다. 초안은 목숨 5개를 주고, 실패하면 목숨이 줄고, 성공하면 1점이 오르는 구조였습니다. 모든 판이 같은 흐름이라 변화가 적고 난이도를 고를 수도 없었습니다. 난이도 선택, 기본 점수 100점에서 시작해 0점이 되면 끝나는 규칙, 클릭하면 특수 효과가 적용되는 이벤트 도형을 추가했습니다. 성공과 실패만 있던 판에 선택과 위험 요소를 넣은 것입니다."
      },
      {
        "title": "데이터로 난이도를 나누고 노트를 구현",
        "tag": "개발",
        "body": "게임 레벨과 음악 변수를 선언하고 배열마다 다른 값을 줘서, 난이도별로 나오는 노래와 게임 난이도가 달라지게 했습니다. 원 노트에는 지정한 범위 안의 랜덤 값을 주고, update() 함수로 매 프레임 크기를 줄여 시간이 지나면 사라지게 했습니다. 이벤트 노트는 타입을 나눠, 폭탄은 클릭하면 점수가 깎이고 아이템은 점수와 체력이 오르게 했습니다. hp 변수로 체력을 관리하고, 값이 0 이하가 되면 노래를 멈추고 게임 오버로 넘깁니다. 노래 재생이 끝났을 때 게임 화면이 유지되고 있으면 게임 클리어로 처리했습니다."
      }
    ],
    categories: ["기획", "개발"],
    featured: false,
    name: "Tap Tap!",
    kind: "dev",
    tagline: "p5.js로 만든 마우스 리듬 게임",
    role: "게임 기획 · 개발",
    team: "1인 제작",
    period: "2026.05 – 2026.06",
    year: "2026",
    status: "완료",
    stack: ["p5.js", "JavaScript"],
    links: { github: "", demo: "https://editor.p5js.org/lyj162424864/full/ZzQLdViCD" },
    thumb: "/images/projects/taptap/main.jpg", // 상세 페이지 대표 이미지
    screens: [
      "/images/projects/taptap/main.jpg"
], // 화면 시안 이미지 (없으면 회색 박스 4개)
    video: "",
    overview: "노래가 재생되면 박자에 맞춰 원이 랜덤 위치에 생성되고, 원이 사라지기 전에 마우스로 클릭해 점수를 얻는 인터랙티브 리듬 게임입니다. 기획부터 p5.js 구현까지 혼자 진행했습니다.",
    process: "① 시나리오 기획: 메인 화면 → 게임 설명 → 게임 시작 → 게임 진행 → 최종 점수 출력 흐름을 그리고, 초안과 최종안 두 버전으로 나눠 규칙을 비교해 확정했습니다.\n② 난이도·음악 데이터: 게임 레벨과 음악에 대한 변수를 선언하고, 배열마다 다른 값을 줘서 난이도별로 나오는 노래와 게임 난이도가 달라지게 했습니다.\n③ 원 노트: 원 노트에 랜덤 값을 부여해 지정한 범위 안에서 랜덤하게 생성되게 했고, update() 함수로 매 프레임 원의 크기를 줄여 시간이 지나면 사라지게 했습니다.\n④ 이벤트 노트: 이벤트 노트마다 타입을 부여해서, 폭탄 타입은 클릭하면 점수가 깎이고 아이템 타입은 클릭하면 점수와 체력이 오르게 했습니다.\n⑤ 종료 처리: hp 변수로 게임 체력을 관리하고, if문으로 값이 0 이하가 되면 노래를 멈추고 게임 오버로 넘겼습니다. 노래 재생이 끝났을 때 게임 화면이 유지되고 있으면 게임 클리어로 처리했습니다.",
    problem: "초안 시나리오는 목숨 5개를 주고, 클릭에 실패하면 목숨이 줄고, 성공하면 점수가 1점 오르는 구조였습니다. 모든 판이 같은 흐름이라 플레이 중 변화가 적고, 난이도를 고를 수도 없었습니다.",
    solution: "최종 시나리오에서 난이도 선택, 기본 점수 100점에서 시작해 0점이 되면 끝나는 규칙, 이벤트 도형(클릭하면 특수 효과가 적용되는 도형)을 추가했습니다. 클릭 성공과 실패만 있던 판에 선택과 위험 요소를 넣은 것입니다.",
    result: "난이도 선택부터 게임 오버·클리어까지 한 판이 이어지는 마우스 리듬 게임을 p5.js로 완성했고, p5.js 웹 에디터에서 바로 플레이할 수 있게 공개했습니다.",
    codeCaption: "난이도 데이터, 노트 생성, 클릭 판정, 종료 처리 네 묶음을 정리했습니다. 각 묶음에 핵심 판단과 한계를 함께 적었습니다.",
    code: [
      {
        title: "난이도별 노래·크기·속도: currentLevel 하나로 판이 달라진다",
        ai: false,
        lines: [
          "// 난이도 선택 시: 레벨 저장 + 해당 노래 재생",
          "currentLevel = l;",
          "currentSong = songs[currentLevel];",
          "currentSong.setVolume(0.4);",
          "currentSong.play();",
          "",
          "// 생성 간격(프레임), 노트 크기, 줄어드는 속도가 레벨에 따라 달라진다",
          "let spawnRate = currentLevel === 1 ? 60 : currentLevel === 2 ? 40 : 25;",
          "if (currentLevel === 1) this.size = 160;",
          "else if (currentLevel === 2) this.size = 120;",
          "else this.size = 80;",
          "let shrinkSpeed = currentLevel === 1 ? 1.2 : currentLevel === 2 ? 1.6 : 2.2;",
        ],
        why: "난이도를 의미하는 변수를 currentLevel 하나로 두고 노래, 노트 크기, 생성 간격, 줄어드는 속도를 모두 거기서 읽게 했습니다. 난이도를 고르면 노래까지 바뀌어 판마다 느낌이 달라집니다.",
        limit: "같은 삼항 연산자가 세 곳에 흩어져 있어 난이도를 하나 더 추가하려면 여러 곳을 고쳐야 합니다. LEVELS = [{ song, spawn, size, shrink }] 같은 테이블로 모으면 한 곳만 바꾸면 됩니다.",
      },
      {
        title: "노트 타입 확률과 크기 기반 수명",
        ai: false,
        lines: [
          "// 생성 시 타입을 확률로 정한다 (아이템 12%, 폭탄 13%, 나머지 일반)",
          "let rand = random(1);",
          "let noteType = 'NORMAL';",
          "if (rand < 0.12) noteType = 'ITEM';",
          "else if (rand < 0.25) noteType = 'BOMB';",
          "notes.push(new Note(noteType));",
          "",
          "class Note {",
          "  update()  { this.size -= shrinkSpeed; }                    // 매 프레임 줄어든다",
          "  isDead()  { return this.size <= 0; }                       // 다 줄면 사라진다",
          "  clicked(mx, my) { return dist(mx, my, this.x, this.y) < this.size / 2; }",
          "}",
        ],
        why: "원이 줄어드는 것을 곧 제한 시간으로 썼습니다. 타이머를 따로 두지 않아도 크기 하나로 사라지는 시점, 클릭 판정 범위(size / 2)가 함께 정해집니다.",
        limit: "프레임 수로 줄이는 방식이라 기기 성능에 따라 체감 속도가 달라질 수 있고, 생성도 음악 박자 분석이 아니라 frameCount % spawnRate의 일정한 주기입니다. deltaTime 기반 시간 계산과 음악 분석 기능으로 보완할 수 있습니다.",
      },
      {
        title: "클릭 판정: 위에 있는 노트부터, 한 번에 하나만",
        ai: false,
        lines: [
          "let hitAnything = false;",
          "for (let i = notes.length - 1; i >= 0; i--) {   // 나중에 만든(위에 그려진) 노트부터 검사",
          "  if (notes[i].clicked(mouseX, mouseY)) {",
          "    hitAnything = true;",
          "    if (notes[i].type === 'BOMB') { hp -= 10; score = max(0, score - 50); }",
          "    else if (notes[i].type === 'ITEM') applyItemEffect();",
          "    else score += 10 * multiplier;",
          "    notes.splice(i, 1);",
          "    break;                                       // 겹쳐도 하나만 처리",
          "  }",
          "}",
          "if (!hitAnything) score = max(0, score - 50);    // 빈 화면 클릭 페널티",
        ],
        why: "배열을 뒤에서부터 돌려 화면 위에 보이는 노트가 먼저 눌리게 하고, break로 한 번 클릭에 하나만 처리합니다. 빈 화면을 누르면 감점해 아무 곳이나 연타하는 플레이를 막았습니다.",
        limit: "타입별 처리가 if 문에 직접 들어 있어 타입이 늘면 분기가 길어집니다. 노트 클래스에 onHit() 메서드를 두고 타입마다 다르게 정의하면 분기를 줄일 수 있습니다.",
      },
      {
        title: "체력과 종료: 놓침, 게임 오버, 노래 끝 = 클리어",
        ai: false,
        lines: [
          "if (notes[i].isDead()) {",
          "  if (notes[i].type !== 'BOMB') {                 // 폭탄은 놓쳐도 감점 없음",
          "    hp -= 10;",
          "    if (hp <= 0) {",
          "      gameState = 'GAMEOVER';",
          "      if (currentSong && currentSong.isPlaying()) currentSong.stop();",
          "    }",
          "  }",
          "  notes.splice(i, 1);",
          "}",
          "",
          "// 노래가 끝났는데 아직 PLAY 상태면 클리어",
          "if (currentSong && !currentSong.isPlaying() && gameState === 'PLAY') gameState = 'FINISH';",
        ],
        why: "폭탄은 보내줘야 하는 노트라 놓쳐도 벌점이 없게 했고, 노래 길이가 곧 게임 길이가 되도록 재생이 끝나면 클리어로 넘겼습니다. gameState 문자열 하나로 화면 전환을 모두 관리합니다.",
        limit: "게임 오버 처리(상태 변경과 노래 정지)가 놓침과 폭탄 클릭 두 곳에 중복되어 있고, 일시정지 기능이 없습니다. gameOver() 함수로 묶고 일시정지 상태를 추가하면 보완됩니다.",
      },
    ],
  },
  {
    slug: "fish-king",
    planning: [
      {
        "title": "몸집이 커질수록 느려지는 성장 구조",
        "tag": "기획",
        "body": "성장할수록 강해지기만 하면 게임이 쉬워져 후반부의 긴장감을 유지하기 어렵다고 판단했습니다. 점수가 일정 수준에 도달하면 물고기가 4단계로 진화하며 몸집이 커집니다. 몸집이 커질수록 획득 점수는 높아지고 이동 속도는 느려져 난이도가 함께 올라갑니다. 특수 물약을 먹으면 크기가 처음 상태로 돌아가게 해 플레이의 균형을 맞췄습니다. 배경 음악과 효과음은 Unity Asset Store의 에셋을 활용했습니다."
      }
    ],
    categories: ["기획", "개발"],
    featured: false,
    name: "Fish King!",
    kind: "dev",
    tagline: "작은 물고기가 되어 플랑크톤을 먹으며 성장하는 유니티 게임",
    role: "게임 기획 · 개발",
    team: "1인 제작",
    period: "2026.05 – 2026.06",
    year: "2026",
    status: "완료",
    stack: ["Unity"],
    links: { github: "", demo: "" },
    thumb: "/images/projects/fish-king/thumb.jpg", // 썸네일 · 상세 대표 이미지
    screens: [
      "/images/projects/fish-king/title.jpg",
      "/images/projects/fish-king/main.jpg"
], // 화면 시안 이미지 (없으면 회색 박스 4개)
    video: "",
    overview: "바닷속 물고기가 되어 플랑크톤을 먹으며 점수를 얻고, 낚시 그물과 상어를 피해 최종 단계 물고기로 성장하는 유니티 게임입니다.",
    process: "점수가 일정 수준에 도달하면 물고기가 4단계로 진화하며 몸집이 커지도록 기획했습니다. 몸집이 커질수록 획득 점수는 높아지고 이동 속도는 느려지며, 특수 물약을 먹으면 크기가 처음 상태로 돌아옵니다. 배경 음악과 효과음은 Unity Asset Store의 에셋을 활용했습니다.",
    problem: "성장할수록 강해지기만 하면 게임이 쉬워져, 후반부의 긴장감을 유지하기 어렵다고 판단했습니다.",
    solution: "몸집이 커진 만큼 이동 속도를 늦춰 난이도가 함께 올라가도록 설계하고, 크기를 되돌리는 회복 아이템으로 플레이의 균형을 맞췄습니다.",
    result: "",
    code: null,
  },
  {
    slug: "fruiting",
    planning: [
      {
        "title": "데이터 구조와 설명할 수 있는 추천 규칙",
        "tag": "기획",
        "body": "과일 → 품종 중첩 구조를 만들고, 행사에는 region · startDate · endDate를, 추천 규칙에는 fruitId를 두어 도감 원본과 연결했습니다. 서버 없이 정적 데이터 4종(과일 · 레시피 · 행사 · 추천 규칙)만 사용했습니다. '맛 × 현재 상태' 추천을 사용자에게 설명할 수 있는 규칙으로 만들었습니다. 선택 2개를 받아 규칙 배열에서 두 조건이 모두 맞는 항목을 찾습니다."
      },
      {
        "title": "서버 없이 화면 간 상태를 유지하는 구현",
        "tag": "개발",
        "body": "도감 → 품종 → 상세로 깊어지는 화면 사이에서 선택한 데이터를 넘겨야 했습니다. 페이지를 이동할 때 navigate(path, { state })로 객체를 넘기고, 상태 없이 직접 진입하면 '데이터가 없습니다' 화면을 보여 줍니다. 행사 · 레시피는 autoSelect* state로 목록을 건너뛰고 상세를 바로 열며, 소비한 뒤에는 초기화합니다. 스크랩은 객체가 아니라 ID 배열만 localStorage에 저장하고, 화면에서 원본 목록과 filter로 합쳐 씁니다. 원본 데이터가 바뀌어도 스크랩 화면이 최신으로 유지되며, 행사 · 레시피 상세와 스크랩 화면이 같은 키를 공유합니다. 이름 검색, 권역 필터 7종, D-Day 계산, 배너 자동 롤링(setInterval과 cleanup)을 넣었습니다. 화면은 App.js의 Routes로 7개를 구성하고, 알 수 없는 경로는 메인으로 보냈습니다."
      }
    ],
    categories: ["개발"],
    featured: false,
    name: "FRUITING",
    kind: "dev",
    tagline: "국내 제철 과일 정보 및 상태 맞춤 큐레이션 웹 서비스",
    role: "웹사이트 기획 · 디자인 · 제작",
    team: "1인 개발 (기획·디자인·개발 전담)",
    period: "2026.04 – 2026.06",
    year: "2026",
    status: "정리 중",
    stack: ["React", "JavaScript", "CSS3"],
    links: { github: "https://github.com/nfuoah/fruiting", demo: "https://nfuoah-github-io.onrender.com/" },
    thumb: "/images/projects/fruiting/thumb.jpg", // 썸네일 · 상세 대표 이미지
    video: "/video/Fruiting.mp4",
    overview: "국내 과일의 도감·품종·제철 행사·레시피를 한곳에서 보는 과일 매거진 웹 서비스입니다. 메인(검색·배너)에서 도감과 품종 상세로 이어지고, 행사·레시피·맞춤 과일 추천·스크랩까지 7개 화면으로 구성했습니다. 서버 없이 정적 데이터 4종(과일·레시피·행사·추천 규칙)과 localStorage만으로 만들었습니다.",
    problem: "① 도감 → 품종 → 상세로 깊어지는 화면 사이에서 선택한 데이터를 어떻게 넘길지 정해야 했습니다.\n② 서버가 없는데도 스크랩을 여러 화면에서 같은 상태로 보여줘야 했습니다.\n③ '맛 × 현재 상태' 추천을 사용자에게 설명할 수 있는 단순한 규칙으로 만들어야 했습니다.",
    solution: "① 페이지를 이동할 때 navigate(path, { state })로 객체를 넘기고, 상태 없이 직접 진입하면 안내 화면을 보여줍니다.\n② 스크랩은 객체가 아니라 ID 배열만 localStorage에 저장하고, 화면에서 원본 목록과 filter로 합쳐 사용합니다. 원본 데이터가 바뀌어도 스크랩 화면이 최신으로 유지됩니다.\n③ 선택 2개를 useState로 받아 규칙 배열에서 두 조건이 모두 맞는 항목을 find로 찾습니다.",
    process: "① 데이터 설계: 과일 → 품종 중첩 구조를 만들고, 행사에는 region·startDate·endDate를, 추천 규칙에는 fruitId를 두어 도감 원본과 연결했습니다.\n② 라우팅: App.js의 Routes로 화면 7개를 구성하고, 알 수 없는 경로는 Navigate로 메인에 보냈습니다.\n③ 상태 전달과 방어: useLocation().state로 받고, 값이 없으면 '데이터가 없습니다' 화면을 보여줍니다. 행사·레시피는 autoSelect* state를 받아 목록을 건너뛰고 상세를 바로 열며, 소비한 뒤에는 초기화합니다.\n④ 스크랩: 행사·레시피 상세의 별 토글과 스크랩 화면의 해제가 같은 localStorage 키(scrappedEvents, scrappedRecipes)를 공유합니다. 카드 안의 별 버튼은 stopPropagation으로 카드 클릭과 분리했습니다.\n⑤ 보조 기능: 이름 검색(includes), 권역 필터 7종, D-Day 계산, 배너 자동 롤링(setInterval과 cleanup)을 넣었습니다.",
    result: "화면 7개와 스크랩 2종이 서버 없이 동작합니다. 맞춤 추천은 맛 4 × 상태 6 = 24조합 중 16조합이 데이터로 채워져 있고, 나머지는 '맞는 과일 없음' 카드로 안내합니다. 데이터 보강과 중복 규칙 정리가 남은 과제입니다.",
    codeCaption: "LocalStorage 기반 스크랩북과 조건 매칭 큐레이션 로직은 직접 작성했고, React Router의 location.state를 활용한 자동 상세 뷰 이동과 history.replaceState 예외 처리는 AI와 초안을 잡은 뒤 상태 변화를 검증해 완성했습니다.",
    code: [
      {
        title: "스크랩북: ID만 저장하고 원본과 조인",
        ai: false,
        lines: [
          "const savedEvents = JSON.parse(localStorage.getItem('scrappedEvents')) || [];",
          "const myScrappedEvents = EventList.filter((e) => scrappedEventIds.includes(e.id));",
          "",
          "const handleRemoveEvent = (id, e) => {",
          "  e.stopPropagation(); // 카드 클릭(상세 이동)과 분리",
          "  const updated = scrappedEventIds.filter((x) => x !== id);",
          "  setScrappedEventIds(updated);",
          "  localStorage.setItem('scrappedEvents', JSON.stringify(updated));",
          "};",
        ],
        why: "객체 복사본이 아니라 ID만 저장하므로 원본 데이터(이름·이미지 URL)가 바뀌어도 스크랩 화면이 자동으로 최신이 됩니다. 상태(useState)와 저장소를 한 핸들러에서 함께 갱신합니다.",
        limit: "토글 로직이 Event·Recipe·Scrap에 중복되어 있고, JSON.parse는 저장값이 깨지면 예외가 납니다. useScrap(key) 커스텀 훅으로 모으고 try/catch와 storage 이벤트(다른 탭 동기화)를 넣을 계획입니다.",
      },
      {
        title: "맞춤 과일 추천: AND 조건 매칭과 3가지 화면 상태",
        ai: false,
        lines: [
          "const recommendedFruit = CurationList.find(",
          "  (item) => item.taste === selectedTaste && item.condition === selectedCondition",
          ");",
          "// 렌더: 둘 다 미선택 → 안내 카드 / 선택했고 결과 있음 → 결과 카드 / 선택했는데 결과 없음 → 대체 카드",
          "",
          "function handleGoToDetail(fruitId) {",
          "  const originalFruit = FruitList.find((fruit) => fruit.id === fruitId);",
          "  if (originalFruit) navigate('/Fruit', { state: { fruit: originalFruit } });",
          "}",
        ],
        why: "알고리즘의 복잡도보다 빈 결과와 미선택까지 3상태로 나눈 UI가 핵심입니다. 추천 항목은 fruitId로 도감 원본에 연결됩니다.",
        limit: "추천 규칙은 25행이지만 서로 다른 조합은 16개로, 같은 조합이 여러 행에 있고 find는 첫 번째만 사용합니다. 중복을 허용하려면 filter로 모두 보여주거나 데이터를 유일 키로 정리해야 합니다.",
      },
      {
        title: "Router State로 상세 자동 열기와 소비 후 초기화",
        ai: true,
        lines: [
          "useEffect(() => {",
          "  if (location.state && location.state.autoSelectRecipe) {",
          "    const targetRecipe = location.state.autoSelectRecipe;",
          "    setSelectedRecipe(targetRecipe);",
          "",
          "    // 로컬스토리지 스크랩 유무 확인 및 별표 상태 동기화",
          "    const saved = JSON.parse(localStorage.getItem('scrappedRecipes')) || [];",
          "    setIsFavorite(saved.includes(targetRecipe.id));",
          "",
          "    // 뒤로가기 시 상세 화면으로 강제 재진입하는 버그 차단",
          "    window.history.replaceState({}, document.title);",
          "  }",
          "}, [location]);",
        ],
        why: "스크랩에서 상세로 들어올 때 목록을 건너뛰는 흐름을 만들었고, state를 쓰고 나서 지우지 않으면 뒤로 가기에서 같은 상세가 다시 열리는 문제를 막았습니다.",
        limit: "window.history.replaceState는 라우터를 거치지 않는 직접 호출이라 navigate(location.pathname, { replace: true, state: null })가 더 자연스럽습니다. 근본적으로는 /Event/:id처럼 URL 파라미터로 바꾸면 새 탭이나 링크 공유에서도 동작합니다. 현재 구조는 새 탭에서 state가 없어 안내 화면이 뜹니다.",
      },
    ],
  },
  {
    slug: "lookback",
    planning: [
      {
        "title": "데이터로 선언한 시나리오와 시간 압박",
        "tag": "기획",
        "body": "분기가 늘어날수록 대사를 화면 코드에 하드코딩하면 하루 6장소 × 선택 2 × 최대 7일만큼 코드가 불어납니다. 그래서 시나리오를 { location, type, speaker, text, choices[] } 배열로 선언하고, Day 2용 checkHistory와 rudeText(어제 무례했을 때만 다른 대사로 교체)까지 스키마에 정의했습니다. 무례했던 장소는 rudeHistory에 쌓고, 다음 날은 day2Scenarios.filter()로 그 장소만 추려 재생합니다. 선택에 10초 타이머 바를 두고 초과하면 무례한 선택지를 자동 선택하게 했습니다. Day 1에서 무례하지 않은 선택을 하면 방향키 10개 미니게임으로 '참는다'는 마찰을 더했습니다."
      },
      {
        "title": "해상도와 관계없는 배경 연출",
        "tag": "디자인",
        "body": "마우스 비율 기반 배경 패럴랙스(최대 60px, 반대 방향), Day가 지날수록 낮아지는 화면 밝기, Day 전환 페이드(2.5초 유지 후 0.5초 페이드)를 적용했습니다. 패럴랙스는 픽셀이 아닌 화면 비율로 계산해 해상도와 관계없이 같은 움직임을 냅니다."
      },
      {
        "title": "5개 상태로 설명하는 진행 엔진",
        "tag": "개발",
        "body": "runScenario(index)가 type에 따라 showDialogue · showChoice로 분기하고, 선택 결과 대사는 splice로 현재 인덱스 뒤에 끼워 넣습니다. currentIndex · currentDay · likeValue · rudeHistory · todayRudeEntries 5개 상태로 게임 전체를 설명하고, applyChoice가 점수 반영 · 기록 · 결과 대사 삽입을 한 함수에서 처리합니다. 3개 HTML이 common.js 하나를 공유하므로 isEndingPage 플래그로 함수를 가드하고, 점수 · 일차 · 취약 장소는 localStorage로 넘겼습니다."
      }
    ],
    categories: ["기획", "디자인", "개발"],
    featured: false,
    name: "LOOK BACK",
    kind: "dev",
    tagline: "타인을 향한 무례함을 다루는 인터랙티브 시리어스 게임",
    role: "기획 · 디자인 · 퍼블리싱",
    team: "1인 개발 (기획·디자인·퍼블리싱 전담)",
    period: "2026.04 – 2026.06",
    year: "2026",
    status: "완료",
    stack: ["Vanilla JS", "HTML5", "CSS3"],
    links: { github: "https://github.com/nfuoah/Lookback", demo: "https://nfuoah.github.io/Lookback/" },
    thumb: "/images/projects/lookback/thumb.jpg", // 썸네일 · 상세 대표 이미지
    video: "/video/Lookback.mp4",
    overview: "'어제의 무례함이 오늘의 나에게 돌아온다'는 주제의 비주얼노벨형 인터랙티브 웹 게임입니다. 아침·등교길·교실·급식실·카페·편의점 6개 장소와 최대 7일의 반복 구조로 구성했고, 마지막에는 S/A/B/F 등급과 행동 분석 리포트를 보여줍니다. 프레임워크 없이 바닐라 JS로 구현했습니다.",
    problem: "분기가 늘어날수록 대사를 화면 코드(if/else)에 하드코딩하면, 하루 6장소 × 선택 2 × 최대 7일만큼 코드가 불어납니다. 또 하루가 바뀔 때 '어제 무례했던 장소만' 다시 보여주려면 진행 상태를 기억해야 했습니다.",
    solution: "시나리오를 { location, type, speaker, text, choices[] } 배열로 선언하고, runScenario(index)가 type에 따라 showDialogue·showChoice로 분기하는 데이터 기반 엔진을 만들었습니다. 선택 결과 대사는 splice로 현재 인덱스 뒤에 끼워 넣어 별도 분기 로직 없이 흐름이 이어지게 했습니다. 무례했던 장소는 rudeHistory에 쌓고, 다음 날은 day2Scenarios.filter()로 그 장소만 추려 재생합니다.",
    process: "① 시나리오 스키마 확정: location(장소 키), choices[].isRude·like·result[], Day 2용 checkHistory와 rudeText(어제 무례했을 때만 다른 대사로 교체)를 정의했습니다.\n② 진행 엔진: currentIndex·currentDay·likeValue·rudeHistory·todayRudeEntries 5개 상태로 게임 전체를 설명하고, applyChoice가 점수 반영·기록·결과 대사 삽입을 한 함수에서 처리하도록 했습니다.\n③ 시간 압박: 선택에 10초 타이머 바(100ms 단위)를 두고 초과하면 무례한 선택지를 자동 선택하게 했습니다. Day 1에서 무례하지 않은 선택을 하면 방향키 10개 미니게임으로 '참는다'는 마찰을 더했습니다.\n④ 페이지 간 연결: 3개 HTML이 common.js 하나를 공유하므로 isEndingPage 플래그로 함수를 가드하고, 점수·일차·취약 장소는 localStorage로 넘겼습니다.\n⑤ 연출: 마우스 비율 기반 배경 패럴랙스(최대 60px, 반대 방향), Day가 지날수록 낮아지는 화면 밝기, Day 전환 페이드(2.5초 유지 후 0.5초 페이드)를 적용했습니다. 패럴랙스는 픽셀이 아닌 화면 비율로 계산해 해상도와 관계없이 같은 움직임을 냅니다.",
    result: "장소 6곳 × 선택 2 × 최대 7일의 분기를 코드 추가 없이 데이터 추가만으로 확장할 수 있게 했고, 마지막 화면에서 행동 등급과 '가장 취약했던 상황' 리포트를 제공합니다. 취약 상황 집계가 누적 횟수가 아닌 하루 단위 기록에 의존해 동점이 많이 나오는 점은 개선 과제입니다.",
    codeCaption: "시나리오 엔진과 '어제의 선택이 오늘을 바꾸는 루프'는 직접 작성했고, 시간 제한 선택과 방향키 미니게임의 이벤트 정리는 AI와 초안을 잡은 뒤 타이머와 키 입력이 겹치는 경우를 직접 검증해 완성했습니다.",
    code: [
      {
        title: "시나리오 엔진과 선택 결과 삽입",
        ai: false,
        lines: [
          "function runScenario(index) {",
          "  if (index >= scenarios.length) { /* 하루 끝 → 엔딩 또는 다음 날 */ return; }",
          "  const scene = scenarios[index];",
          "  if (scene.type === 'dialogue') showDialogue(scene);",
          "  else if (scene.type === 'choice') showChoice(scene);",
          "}",
          "function applyChoice(choice) {",
          "  likeValue += choice.like;",
          "  const loc = scenarios[currentIndex].location;",
          "  if (choice.isRude && !rudeHistory.includes(loc)) rudeHistory.push(loc);",
          "  // 선택 결과 대사를 현재 위치 바로 뒤에 끼워 넣어 흐름을 이어줌",
          "  choice.result.forEach((r, i) =>",
          "    scenarios.splice(currentIndex + 1 + i, 0, { location: loc, type: 'dialogue', ...r }));",
          "  currentIndex++;",
          "  runScenario(currentIndex);",
          "}",
        ],
        why: "분기를 트리로 만들지 않고 평평한 배열과 삽입으로 풀었습니다. 대사 작성자가 배열만 고치면 시나리오가 확장됩니다.",
        limit: "Day 1은 scenarios = day1Scenarios로 원본 배열을 직접 변경(splice)합니다. Day 2는 filter()로 복사본이라 안전하지만, 재시작 기능을 넣는다면 structuredClone으로 복사해야 합니다.",
      },
      {
        title: "어제의 선택이 오늘을 바꾸는 루프",
        ai: false,
        lines: [
          "// 내일은 '어제 무례했던 장소'의 장면만 재생",
          "scenarios = day2Scenarios.filter(scene => rudeHistory.includes(scene.location));",
          "",
          "// 어제 무례했다면 같은 대사가 다른 텍스트로 교체",
          "if (scene.checkHistory && rudeHistory.includes(scene.checkHistory)) displayText = scene.rudeText;",
          "",
          "// 하루가 끝나면 '오늘 무례한 곳'이 내일의 기준이 됨",
          "rudeHistory = [...todayRudeEntries]; // 0개면 탈출(엔딩), Day 7이면 배드엔딩",
        ],
        why: "rudeHistory(어제)와 todayRudeEntries(오늘)를 분리해 읽는 상태와 쓰는 상태를 나눴고, 덕분에 날짜 경계에서 상태가 섞이지 않습니다.",
        limit: "'가장 취약한 상황' 집계(saveWeakSituation)는 rudeHistory의 빈도를 세는데, Day 2 이후에는 매일 배열이 초기화되고 장소가 중복 저장되지 않아 빈도가 대부분 1이 됩니다. 정확히 하려면 { 장소: 횟수 } 누적 카운터를 따로 두어야 합니다.",
      },
      {
        title: "시간 제한 선택과 방향키 미니게임의 이벤트 정리",
        ai: true,
        lines: [
          "function handleKeyDown(e) {",
          "  e.preventDefault(); // 방향키로 화면이 스크롤되지 않도록",
          "  if (e.key === targetCommands[userProgress]) {",
          "    document.getElementById(`arrow-${userProgress}`).classList.add('success');",
          "    if (++userProgress >= 10) endGame(true);",
          "  } else { endGame(false); } // 한 번만 틀려도 즉시 실패",
          "}",
          "window.addEventListener('keydown', handleKeyDown);",
          "",
          "function endGame(isSuccess) {",
          "  clearInterval(gameTimer);",
          "  window.removeEventListener('keydown', handleKeyDown); // 리스너 누수 방지",
          "  applyChoice(isSuccess ? respectChoice : currentScene.choices.find(c => c.isRude));",
          "}",
        ],
        why: "addEventListener와 removeEventListener를 쌍으로 두고 clearInterval까지 호출해 정리(cleanup)가 되도록 했습니다. 입력 제한 시간 4초 안에 방향키 10개를 순서대로 눌러야 합니다.",
        limit: "타이머 초과와 마지막 키 입력이 겹치면 endGame이 두 번 호출될 수 있어 if (finished) return 가드가 필요합니다. alert()는 흐름을 막으므로 인앱 모달로 바꾸는 것이 좋습니다.",
      },
    ],
  },
  {
    slug: "bingsu",
    planning: [
      {
        "title": "1920×1080 기준으로 시작한 발표용 화면",
        "tag": "디자인",
        "body": "발표용 화면은 1920×1080을 기준으로 제작했습니다. 하지만 노트북마다 해상도와 브라우저 화면 크기가 달라 요소의 크기와 위치를 맞추기 어려웠습니다."
      },
      {
        "title": "상대 단위로 바꿔 해상도에 대응",
        "tag": "개발",
        "body": "고정 px 대신 %, vw, rem 같은 상대 단위와 미디어 쿼리를 활용해, 화면 크기에 따라 요소의 크기와 위치가 조정되도록 개선했습니다."
      }
    ],
    name: "氷水",
    tagline: "빙수의 기원과 국가별 빙수 종류를 소개하는 웹사이트",
    categories: ["기획", "디자인", "개발"],
    kind: "dev",
    featured: false,
    status: "완료",
    role: "웹사이트 기획 · 디자인 · 제작",
    team: "1인 개발",
    period: "2025.11 – 2025.12",
    year: "2025",
    stack: ["HTML5", "CSS3"],
    links: { demo: "", github: "" },
    thumb: "/images/projects/bingsu/thumb.jpg", // 썸네일 · 상세 대표 이미지
    video: "",
    problem: "발표용 화면은 1920×1080을 기준으로 제작했지만, 노트북마다 해상도와 브라우저 화면 크기가 달라 요소의 크기와 위치를 맞추는 데 어려움이 있었습니다.",
    solution: "초기에는 1920×1080 화면을 기준으로 제작하고, 이후 고정 px 대신 %, vw, rem 등의 상대 단위와 미디어 쿼리를 활용해 화면 크기에 따라 요소의 크기와 위치가 조정되도록 개선했습니다.",
    result: "", // 실제로 확인한 개선 결과가 있으면 추가
    code: null, // 코드 예시와 AI 보완 여부가 확인되면 추가
  },
  {
    slug: "canada-aurora",
    planning: [
      {
        "title": "지폐 마인드맵에서 플레이리스트 추천까지",
        "tag": "기획",
        "body": "캐나다 지폐 10달러 화폐 마인드맵 분석에서 오로라 키워드를 도출하고, 이를 바탕으로 오로라 스팟 정보와 색상 · 형태에 따른 감성 플레이리스트 추천 기능을 기획했습니다. 오로라 색상 · 모양을 고르면 서사적 카드 구조를 거쳐 유튜브 재생목록으로 연동되는 맞춤형 플레이리스트 프로토타입을 설계했습니다."
      },
      {
        "title": "네온 무드보드와 인포그래픽 스크롤",
        "tag": "디자인",
        "body": "어두운 밤하늘과 오로라의 몽환적인 감성을 전달하기 위해 그라디언트 및 네온 컬러(#EC54C3, #78E6A2) 기반 무드보드를 만들었습니다. 메인 페이지는 인포그래픽 스타일의 세로 스크롤 구조로, 오로라의 원리와 캐나다 명소를 지도 기반 스팟으로 직관적으로 안내합니다."
      }
    ],
    categories: ["기획", "디자인"],
    featured: false,
    name: "CANADA AURORA",
    kind: "design",
    tagline: "캐나다 오로라 정보 안내 및 무드 맞춤 플레이리스트 추천 UI/UX 웹 디자인",
    role: "UI/UX 디자인",
    team: "1인 디자인 (기획·콘텐츠 디자인·프로토타이핑 전담)",
    period: "2025.09 – 2025.12",
    year: "2025",
    status: "정리 중",
    stack: ["Figma", "UI/UX Design", "Prototyping"],
    links: { github: "", demo: "https://www.figma.com/proto/T7N0R7pB3pex43ZVNiWjpV/%EC%BD%98%ED%85%90%EC%B8%A0%EB%94%94%EC%9E%90%EC%9D%B8-%EC%98%A4%EB%A1%9C%EB%9D%BC-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8--%EB%B3%B5%EC%82%AC-?node-id=27-1985&page-id=0%3A1&starting-point-node-id=1%3A446&t=0fggh1gnmwd24yKn-1" },
    thumb: "/images/projects/canada-aurora/thumb.jpg", // 썸네일 · 상세 대표 이미지
    video: "/video/Aurora.mp4",
    overview: "캐나다 지폐 10달러 화폐 마인드맵 분석에서 도출한 오로라 키워드를 바탕으로, 캐나다의 오로라 스팟 정보와 보고 싶은 오로라 색상/형태에 따른 감성 플레이리스트 추천 기능을 제공하도록 기획한 비주얼 인터랙티브 UI/UX 웹 프로젝트입니다.",
    process: "어두운 밤하늘과 오로라의 몽환적인 감성을 전달하기 위해 그라디언트 및 네온 컬러(#EC54C3, #78E6A2) 기반 무드보드를 구축했습니다. 메인 페이지는 인포그래픽 스타일 세로 스크롤 구조로 오로라의 원리 및 캐나다 명소를 지도 기반 스팟으로 직관적으로 안내하며, 서사적 카드 구조 디자인을 이용해 오로라 색상/모양 선택 시 유튜브 재생목록으로 연동되는 맞춤형 플레이리스트 프로토타입을 설계했습니다.",
    codeCaption: "웹 프로토타입 설계 및 기획서 전반을 직접 수행했으며, 지도 스팟 오버레이 겹침 버그 보정, 글로벌 네비게이션(GNB) 현재 위치 가시화, 유저 동선 최적화(뒤로가기/인터랙션 버튼) 개선 작업을 통해 완결성 높은 Figma 프로토타입을 완성했습니다.",
    problem: "정리 중입니다.",
    solution: "정리 중입니다.",
    result: "정리 중입니다.",
    code: null,
  },
  {
    slug: "loss-signs",
    planning: [
      {
        "title": "정적 이미지로 전하기 어려운 메시지",
        "tag": "기획",
        "body": "전시가 전하려는 '과잉된 정보 속에서 흐려지는 자아'라는 메시지를 정적인 이미지로만 전달하기 어려웠습니다."
      },
      {
        "title": "도형과 눈으로 만든 구도",
        "tag": "디자인",
        "body": "포스터 주변에 다양한 색과 크기의 도형을 배치해 끊임없이 변화하고 정보가 넘쳐나는 사회를 표현했습니다. 가운데에는 눈 모티브를 두어 주변 도형을 둘러보는 시선을 만들었습니다."
      },
      {
        "title": "랜덤으로 선정되는 색과 크기",
        "tag": "개발",
        "body": "도형의 색과 크기가 랜덤으로 선정되도록 p5.js로 구현했습니다."
      }
    ],
    categories: ["디자인", "개발"],
    featured: false,
    name: "상실의 징후들 포스터",
    kind: "dev",
    tagline: "부산 <상실의 징후들> 전시를 소개하는 p5.js 인터랙티브 포스터",
    role: "포스터 디자인 · 개발",
    team: "1인 제작",
    period: "2024.05 – 2024.06",
    year: "2024",
    status: "완료",
    stack: ["p5.js", "JavaScript"],
    links: { github: "", demo: "https://editor.p5js.org/yeonju-opposite/full/vaoNeTSWH" },
    thumb: "/images/projects/loss-signs/thumb.jpg", // 썸네일 · 상세 대표 이미지
    screens: [
      "/images/projects/loss-signs/main.jpg"
], // 화면 시안 이미지 (없으면 회색 박스 4개)
    video: "",
    overview: "과잉된 정보와 돈에 가려진 진짜 자아를 돌아보게 하는 부산 <상실의 징후들> 전시를 소개하기 위해 p5.js로 제작한 메인 포스터입니다.",
    process: "포스터 주변에 다양한 색과 크기의 도형을 배치해, 끊임없이 변화하고 정보가 넘쳐나는 사회를 표현했습니다. 가운데에는 눈 모티브를 두어 주변 도형을 둘러보는 시선을 만들었고, 도형의 색과 크기는 랜덤으로 선정되도록 구현했습니다.",
    problem: "전시가 전하려는 '과잉된 정보 속에서 흐려지는 자아'라는 메시지를 정적인 이미지로만 전달하기 어려웠습니다.",
    solution: "랜덤 색·크기의 도형으로 과잉된 정보를 시각화하고, 가운데 눈이 이를 바라보는 구도로 메시지를 표현했습니다.",
    result: "",
    code: null,
  },
  {
    slug: "enneagram",
    planning: [
      {
        "title": "낯선 유형을 친숙한 캐릭터에 빗대기",
        "tag": "기획",
        "body": "애니어그램의 9가지 유형은 처음 접하는 사람에게 낯설어, 학생들에게 익숙한 '짱구는 못말려' 캐릭터의 성격에 비유해 직관적으로 전달하기로 했습니다."
      },
      {
        "title": "집 구조를 내비게이션으로 한 방 구성",
        "tag": "디자인",
        "body": "유형별로 어울리는 색을 대표색으로 정하고, 캐릭터와 유형이 드러나는 오브젝트로 방을 구성했습니다(스케치 1 · 2차). 오브젝트에는 활기찬 원색, 배경에는 편안한 파스텔톤을 써서 오브젝트에 시선이 가도록 했습니다. 와이어프레임을 거쳐 짱구네 집을 메인 화면으로 만들고, 방문을 누르면 각 유형의 방으로 이동하도록 설계했습니다. 방 번호를 넣고, 방문에 마우스를 올리면 유형에 맞는 캐릭터가 등장하게 했습니다. 유형 소개 페이지에는 오브젝트 · 유형 설명 · 키워드와 유형 간 이동 버튼을 넣었습니다."
      }
    ],
    categories: ["기획", "디자인"],
    featured: false,
    name: "짱구네 애니어그램",
    kind: "design",
    tagline: "짱구는 못말려 캐릭터로 애니어그램 9가지 유형을 소개하는 웹사이트 디자인",
    role: "웹사이트 기획 · 디자인",
    team: "1인 제작",
    period: "2024.03 – 2024.06",
    year: "2024",
    status: "완료",
    stack: ["Figma", "Illustrator"],
    links: { github: "", demo: "" },
    thumb: "/images/projects/enneagram/main.jpg", // 상세 페이지 대표 이미지
    screens: [
      "/images/projects/enneagram/house-rooms.jpg",
      "/images/projects/enneagram/infographic.jpg",
      "/images/projects/enneagram/type-01.jpg",
      "/images/projects/enneagram/type-02.jpg",
      "/images/projects/enneagram/type-03.jpg",
      "/images/projects/enneagram/type-04.jpg",
      "/images/projects/enneagram/type-05.jpg",
      "/images/projects/enneagram/type-06.jpg",
      "/images/projects/enneagram/type-07.jpg",
      "/images/projects/enneagram/type-08.jpg",
      "/images/projects/enneagram/type-09.jpg"
], // 화면 시안 이미지 (없으면 회색 박스 4개)
    video: "",
    overview: "학생들에게 익숙한 만화 '짱구는 못말려'의 캐릭터 성격에 비유해, 애니어그램 9가지 유형을 쉽고 빠르게 이해할 수 있도록 설계한 웹사이트 디자인입니다.",
    process: "유형별로 어울리는 색을 대표색으로 정하고, 캐릭터와 유형이 드러나는 오브젝트로 방을 구성했습니다(스케치 1·2차). 와이어프레임을 거쳐 짱구네 집을 메인 화면으로 만들고, 방문을 누르면 각 유형의 방으로 이동하도록 설계했습니다. 최종본에는 방 번호, 방문에 마우스를 올리면 유형에 맞는 캐릭터가 등장하는 효과, 유형 소개 페이지(오브젝트·유형 설명·키워드)와 유형 간 이동 버튼을 넣었습니다.",
    problem: "애니어그램의 9가지 유형은 처음 접하는 사람에게 낯설어, 유형의 특징을 직관적으로 전달할 방법이 필요했습니다.",
    solution: "친숙한 캐릭터와 집 구조를 내비게이션으로 활용해, 유형별 방을 탐색하며 설명과 키워드를 확인하도록 설계했습니다. 오브젝트에는 활기찬 원색, 배경에는 편안한 파스텔톤을 사용해 오브젝트에 시선이 가도록 했습니다.",
    result: "",
    code: null,
  },
];

// hidden: true 인 프로젝트는 사이트 어디에도 나오지 않습니다.
export const projects = allProjects.filter((p) => !p.hidden);

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getNeighbors = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
