# portfolio-v2 (React)

기존 프로젝트와 별개로 새로 만든 포트폴리오입니다. CRA(react-scripts) 기준이며 `src` 폴더 구조는 그대로 옮겨도 됩니다.

## 실행
```
npm install
npm start
```
(기존 CRA 프로젝트에 합치려면 `src/`, `public/index.html`을 교체하고 `npm i react-router-dom` 만 확인하세요.)

## 폴더 구조
```
src/
  index.js                 BrowserRouter + App
  App.js                   헤더 / 라우트 / 연락처 밴드 조립
  styles/global.css        디자인 토큰(색, 폰트) + 공통 버튼/칩/회색박스
  data/                    ★ 내용은 여기만 수정
    profile.js             이름, 학교, 링크, 이력
    projects.js            프로젝트 4개 (목록/상세 자동 반영)
    skills.js              기술 사용 개월 수, 도구
  components/              Header, Hero, QuickSummary, KeyFacts, Ticker, WorkList, Skills,
                           Approach, About, Contact, CodeGroups, ImagePlaceholder
  pages/                   Home, ProjectDetail
  context/ToastContext.jsx "준비 중" 안내 토스트
  hooks/                   scrollToSection, useActiveSection
```

## 내용 채우는 법
- 이미지/영상 자리는 회색 박스입니다. `ImagePlaceholder`에 `src`(이미지) 또는 `video`를 넘기면 바뀝니다.
  프로젝트 영상은 `public/videos/xxx.mp4` 에 넣고 `projects.js`의 `video: "/videos/xxx.mp4"` 로 지정하세요.
- 링크가 `"#"` 이면 클릭 시 "준비 중" 토스트가 뜹니다. 실제 주소로 바꾸면 새 탭으로 열립니다.
- `projects.js`의 `code`는 `{ title, ai, lines }` 묶음 배열입니다. NOP!, Fruiting 코드는 샘플이니 교체하세요.
- 메인 상단 숫자(프로젝트 수, 스택 수 등)는 data 파일에서 자동 계산됩니다.
- `projects.js`의 `categories`(기획/디자인/개발, 여러 개 가능)로 작업물 필터가 동작하고, `featured: true` 인 프로젝트가 첫 화면 "대표 작업물"에 표시됩니다. 카드 이미지는 `thumb: "/images/xxx.png"` 로 지정하세요.
