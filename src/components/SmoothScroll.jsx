import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    window.__lenis = lenis;
    window.lenis = lenis;

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.__lenis = null;
      window.lenis = null;
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return children;
}
