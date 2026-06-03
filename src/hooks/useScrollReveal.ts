import { useEffect, useRef } from "react";

/**
 * Hook that applies scroll-reveal animations to elements with
 * the `.reveal` or `.reveal-scale` class within the ref'd container.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/**
 * Animate a numeric counter from 0 to a target value.
 */
export function useCountUp(target: number, duration = 2000, start = false) {
  const elRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!start || !elRef.current) return;

    const el = elRef.current;
    const startTime = performance.now();
    const startVal = 0;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased).toLocaleString();

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [target, duration, start]);

  return elRef;
}
