import { useEffect, useState } from "react";

// 화면 중앙 근처에 걸친 섹션의 id를 돌려줍니다. (헤더 메뉴 강조용)
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState("");
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return undefined;
    }
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, enabled]);

  return active;
}
