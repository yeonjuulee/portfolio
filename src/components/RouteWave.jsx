import { createContext, forwardRef, useCallback, useContext, useLayoutEffect, useRef } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import "./RouteWave.css";

// 메인 ↔ 프로젝트 상세로 이동할 때 화면이 부드럽게 사라졌다(페이드 아웃) 나타납니다(페이드 인).
//  - 사이트 배경색 막이 0.16초 동안 덮이고, 페이지가 바뀐 뒤 0.2초 동안 걷힙니다.
//  - 동작 줄이기 설정이면 효과 없이 바로 이동합니다.
const OUT_MS = 160;
const IN_MS = 200;
const isDetail = (p) => p.startsWith("/project/");
const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

// 전환 대상인지: 상세로 가거나, 상세에서 메인으로 갈 때
const isTransition = (from, to) => isDetail(to) || (isDetail(from) && to === "/");

const Ctx = createContext(null);

export function RouteTransition({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const veil = useRef(null);
  const busy = useRef(false);
  const ours = useRef(false); // 우리가 시작한 이동인지(뒤로 가기와 구분)
  const prev = useRef(pathname);

  // 막의 투명도를 바꾸고 전환이 끝날 때까지 기다립니다.
  const fade = useCallback((to, ms) => {
    const el = veil.current;
    el.style.transition = `opacity ${ms}ms ease`;
    el.style.opacity = String(to);
    return wait(ms);
  }, []);

  const go = useCallback(
    async (to, opts) => {
      busy.current = true;
      ours.current = true;
      veil.current.classList.add("is-on");
      await fade(1, OUT_MS);
      navigate(to, opts);
      await frames(); // 새 페이지가 그려질 때까지 기다림
      await fade(0, IN_MS);
      veil.current.classList.remove("is-on");
      ours.current = false;
      busy.current = false;
    },
    [fade, navigate]
  );

  // 브라우저 뒤로/앞으로 가기: 이동을 미룰 수 없으므로 덮인 상태에서 시작해 걷기만 합니다.
  useLayoutEffect(() => {
    const from = prev.current;
    prev.current = pathname;
    if (ours.current || from === pathname || reduceMotion() || !isTransition(from, pathname)) return;
    const el = veil.current;
    busy.current = true;
    el.classList.add("is-on");
    el.style.transition = "none";
    el.style.opacity = "1";
    requestAnimationFrame(async () => {
      await fade(0, IN_MS);
      el.classList.remove("is-on");
      busy.current = false;
    });
  }, [pathname, fade]);

  const api = useRef({});
  api.current = { go, busy: () => busy.current, pathname };

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="rt" ref={veil} aria-hidden="true" />
    </Ctx.Provider>
  );
}

// react-router 의 Link 와 같은 사용법. 메인 ↔ 상세 이동일 때만 페이드를 붙입니다.
export const TransitionLink = forwardRef(function TransitionLink({ to, state, onClick, replace, ...rest }, ref) {
  const ctx = useContext(Ctx);
  const handle = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || !ctx) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    const { go, busy, pathname } = ctx.current;
    const target = (typeof to === "string" ? to : to.pathname || "").split(/[?#]/)[0];
    if (!isTransition(pathname, target) || reduceMotion()) return;
    e.preventDefault();
    if (busy()) return;
    go(to, { state, replace });
  };
  return <RouterLink ref={ref} to={to} state={state} replace={replace} onClick={handle} {...rest} />;
});
