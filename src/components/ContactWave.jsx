import { useEffect, useRef } from "react";

const N = 81;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const noise = (j) => {
  const s = Math.sin(j * 12.9898 + 4.1414) * 43758.5453;
  return s - Math.floor(s);
};
const baseAt = (i) => {
  const x = i / (N - 1);
  const env = Math.pow(clamp(1 - Math.abs(x - 0.5) * 2, 0, 1), 0.9);
  return clamp(env * (0.4 + 0.6 * noise(i)) + 0.05, 0.04, 0.98);
};

// Contact 위쪽 음파. 평소에는 활발하게 출렁이고,
//  - 마우스를 올리면 모든 선이 한 줄로 모이며 파란색이 되고
//  - 이메일을 복사하면(settle 값이 바뀌면) 파란색으로 바뀌며 더 크고 빠르게 출렁입니다. 장식이라 스크린 리더에서는 숨깁니다.
export default function ContactWave({ settle }) {
  const ref = useRef(null);
  const burstAt = useRef(-1e9);
  const hover = useRef(false);

  useEffect(() => {
    if (settle) burstAt.current = performance.now();
  }, [settle]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const bars = Array.from(el.children);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onEnter = () => {
      hover.current = true;
    };
    const onLeave = () => {
      hover.current = false;
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let flat = 0;
    let visible = true;
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(el);

    // f: 한 줄로 모인 정도(0~1), e: 복사 직후의 활기(0~1), t: 초 단위 시간
    const setAll = (f, e, t) => {
      const age = t != null ? t - burstAt.current / 1000 : 0;
      for (let i = 0; i < N; i += 1) {
        const x = i / (N - 1);
        const b = baseAt(i);
        let wave = b;
        if (t != null) {
          const sweep = Math.exp(-(((x - (((t * (0.28 + 0.12 * e)) % 1.5) - 0.25)) / 0.09) ** 2)) * 0.4;
          const amp = 0.32 + 0.18 * e;
          const spd = 1 + 0.35 * e;
          // 복사한 순간 가운데에서 바깥으로 퍼지는 물결
          const ring = e > 0 ? Math.exp(-(((Math.abs(x - 0.5) - age * 0.7) / 0.1) ** 2)) * 0.3 * e : 0;
          wave =
            b * (1 + amp * Math.sin(t * 2.6 * spd + i * 0.5) + (0.18 + 0.08 * e) * Math.sin(t * 4.3 * spd - i * 0.9)) +
            sweep * (0.3 + b) +
            ring +
            0.04 * e;
        }
        wave = clamp(wave, 0.04, 1);
        const v = wave + (0.03 - wave) * f;
        bars[i].style.setProperty("--h", v.toFixed(3));
      }
      el.style.setProperty("--f", f.toFixed(3));
      el.classList.toggle("is-blue", f > 0.5 || e > 0.05);
    };

    if (reduce) {
      let id = 0;
      const tick = () => {
        const burst = performance.now() - burstAt.current < 2400;
        setAll(hover.current ? 1 : 0, burst ? 1 : 0, null);
        id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(id);
        io.disconnect();
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    }

    let energy = 0;
    const frame = (now) => {
      if (visible) {
        flat += ((hover.current ? 1 : 0) - flat) * 0.1;
        const since = now - burstAt.current;
        // 복사 직후 활기가 빠르게 오르고 2.4초 동안 유지된 뒤 천천히 가라앉습니다.
        const target = since < 2400 ? 1 : 0;
        energy += (target - energy) * (target ? 0.25 : 0.06);
        setAll(flat * (1 - energy), energy, now / 1000);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="cwave" ref={ref} aria-hidden="true">
      {Array.from({ length: N }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
