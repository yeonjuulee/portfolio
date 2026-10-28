// 같은 페이지 안에서 섹션으로 부드럽게 이동 (라우터 주소는 바꾸지 않음)
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  return Boolean(el);
}
