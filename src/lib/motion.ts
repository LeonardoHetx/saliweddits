import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Parallax leve: a foto desliza dentro da moldura enquanto a seção passa. */
export function useParallax(ref: RefObject<HTMLElement | null>, amount = 12) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, amount]);
}

/** Entrada do topo da Home: foto assenta devagar, texto sobe em sequência. */
export function useHeroIntro(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-hero-bg]", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "power2.out" });
      gsap.fromTo(
        "[data-hero-line]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1.3, ease: "power3.out", stagger: 0.14, delay: 0.25 }
      );
    }, el);
    return () => ctx.revert();
  }, [root]);
}
