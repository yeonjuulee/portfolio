// 하위 경로(예: GitHub Pages의 /portfolio/)에 배포해도 /images/... 경로가 맞도록 접두사를 붙입니다.
// 빌드할 때 PUBLIC_URL 이 비어 있으면(Render·로컬) 그대로 둡니다.
export function asset(p) {
  if (!p || typeof p !== "string" || !p.startsWith("/") || p.startsWith("//")) return p;
  return (process.env.PUBLIC_URL || "") + p;
}
