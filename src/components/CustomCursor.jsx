import { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';

export default function CustomCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = '#ffffff',
  cursorColorOnTarget,
}) {
  const wrapperRef = useRef(null);
  const cornersRef = useRef(null);
  const dotRef = useRef(null);
  const isHoveredRef = useRef(false);
  const targetCornersRef = useRef(null);
  const progressRef = useRef({ current: 0 });

  const colorsRef = useRef({ cursorColor, cursorColorOnTarget });
  useEffect(() => {
    colorsRef.current = { cursorColor, cursorColorOnTarget };
  }, [cursorColor, cursorColorOnTarget]);

  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmall = window.innerWidth <= 768;
    const ua = (navigator.userAgent || '').toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    return (hasTouch && isSmall) || isMobile;
  }, []);

  const config = useMemo(() => ({
    borderWidth: 3,
    cornerSize: 12,
  }), []);

  const moveCursor = useCallback((clientX, clientY) => {
    if (!wrapperRef.current) return;
    gsap.to(wrapperRef.current, {
      x: clientX,
      y: clientY,
      duration: 0.1,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    if (isTouchDevice || !wrapperRef.current) return;

    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const wrapper = wrapperRef.current;
    cornersRef.current = wrapper.querySelectorAll('.target-cursor-corner');

    // Set initial position centered
    gsap.set(wrapper, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const spinTimeline = gsap.timeline({ repeat: -1 }).to(wrapper, {
      rotation: '+=360',
      duration: spinDuration,
      ease: 'none',
    });

    // Ticker function for smooth corner interpolation to target bounding box
    const tickerCallback = () => {
      if (!targetCornersRef.current || !wrapperRef.current || !cornersRef.current) return;
      const progress = progressRef.current.current;
      if (progress === 0) return;

      const wx = gsap.getProperty(wrapperRef.current, 'x');
      const wy = gsap.getProperty(wrapperRef.current, 'y');

      Array.from(cornersRef.current).forEach((corner, i) => {
        const cx = gsap.getProperty(corner, 'x');
        const cy = gsap.getProperty(corner, 'y');
        const targetX = targetCornersRef.current[i].x - wx;
        const targetY = targetCornersRef.current[i].y - wy;

        const currentX = cx + (targetX - cx) * progress;
        const currentY = cy + (targetY - cy) * progress;
        const dur = progress >= 0.99 ? (parallaxOn ? 0.08 : 0) : 0.05;

        gsap.to(corner, {
          x: currentX,
          y: currentY,
          duration: dur,
          ease: dur === 0 ? 'none' : 'power1.out',
          overwrite: 'auto',
        });
      });
    };

    const handleMouseMove = (e) => {
      moveCursor(e.clientX, e.clientY);
    };

    let activeTarget = null;
    let leaveTimeout = null;

    const cleanupTargetLeave = (target) => {
      if (!target) return;
      target.removeEventListener('mouseleave', handleTargetLeave);
    };

    const handleTargetLeave = () => {
      gsap.ticker.remove(tickerCallback);
      isHoveredRef.current = false;
      targetCornersRef.current = null;
      gsap.set(progressRef.current, { current: 0, overwrite: true });
      activeTarget = null;

      if (colorsRef.current.cursorColorOnTarget && cornersRef.current) {
        gsap.to(Array.from(cornersRef.current), {
          borderColor: colorsRef.current.cursorColor,
          duration: 0.15,
          ease: 'power2.out',
        });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: colorsRef.current.cursorColor,
            duration: 0.15,
            ease: 'power2.out',
          });
        }
      }

      if (cornersRef.current) {
        const corners = Array.from(cornersRef.current);
        gsap.killTweensOf(corners, 'x,y');
        const size = config.cornerSize;
        const defaultPositions = [
          { x: -size * 1.5, y: -size * 1.5 },
          { x: size * 0.5, y: -size * 1.5 },
          { x: size * 0.5, y: size * 0.5 },
          { x: -size * 1.5, y: size * 0.5 },
        ];

        const resetTl = gsap.timeline();
        corners.forEach((c, idx) => {
          resetTl.to(
            c,
            {
              x: defaultPositions[idx].x,
              y: defaultPositions[idx].y,
              duration: 0.3,
              ease: 'power3.out',
            },
            0
          );
        });
      }

      leaveTimeout = setTimeout(() => {
        if (!activeTarget) {
          spinTimeline.play();
        }
      }, 50);
    };

    const handleMouseOver = (e) => {
      let target = e.target;
      const matchedParents = [];
      while (target && target !== document.body) {
        if (target.matches && target.matches(targetSelector)) {
          matchedParents.push(target);
        }
        target = target.parentElement;
      }

      const matchedTarget = matchedParents[0] || null;
      if (!matchedTarget || !wrapperRef.current || !cornersRef.current || activeTarget === matchedTarget) {
        return;
      }

      if (activeTarget) {
        cleanupTargetLeave(activeTarget);
      }
      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        leaveTimeout = null;
      }

      activeTarget = matchedTarget;
      matchedTarget.addEventListener('mouseleave', handleTargetLeave);

      const corners = Array.from(cornersRef.current);
      corners.forEach((c) => gsap.killTweensOf(c, 'x,y'));
      gsap.killTweensOf(wrapperRef.current, 'rotation');
      spinTimeline.pause();
      gsap.set(wrapperRef.current, { rotation: 0 });

      if (colorsRef.current.cursorColorOnTarget) {
        gsap.to(corners, {
          borderColor: colorsRef.current.cursorColorOnTarget,
          duration: 0.15,
          ease: 'power2.out',
        });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: colorsRef.current.cursorColorOnTarget,
            duration: 0.15,
            ease: 'power2.out',
          });
        }
      }

      const rect = matchedTarget.getBoundingClientRect();
      const { borderWidth, cornerSize } = config;
      const wx = gsap.getProperty(wrapperRef.current, 'x');
      const wy = gsap.getProperty(wrapperRef.current, 'y');

      targetCornersRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize },
      ];

      isHoveredRef.current = true;
      gsap.ticker.add(tickerCallback);
      gsap.to(progressRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out' });

      corners.forEach((c, idx) => {
        gsap.to(c, {
          x: targetCornersRef.current[idx].x - wx,
          y: targetCornersRef.current[idx].y - wy,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    };

    const handleScroll = () => {
      if (!activeTarget || !wrapperRef.current) return;
      const wx = gsap.getProperty(wrapperRef.current, 'x');
      const wy = gsap.getProperty(wrapperRef.current, 'y');
      const hoveredEl = document.elementFromPoint(wx, wy);

      if (!hoveredEl || (hoveredEl !== activeTarget && !hoveredEl.closest(targetSelector))) {
        handleTargetLeave();
      }
    };

    const handleMouseDown = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
        gsap.to(wrapperRef.current, { scale: 0.9, duration: 0.2 });
      }
    };

    const handleMouseUp = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
        gsap.to(wrapperRef.current, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (activeTarget) cleanupTargetLeave(activeTarget);
      if (leaveTimeout) clearTimeout(leaveTimeout);
      spinTimeline.kill();
      document.body.style.cursor = '';
    };
  }, [isTouchDevice, targetSelector, spinDuration, hoverDuration, parallaxOn, config, moveCursor, hideDefaultCursor]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    >
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform', backgroundColor: cursorColor }}
      />

      {/* Top-Left Corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] translate-x-[-150%] translate-y-[-150%] border-r-0 border-b-0"
        style={{ willChange: 'transform', borderColor: cursorColor }}
      />
      {/* Top-Right Corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] translate-x-[50%] translate-y-[-150%] border-l-0 border-b-0"
        style={{ willChange: 'transform', borderColor: cursorColor }}
      />
      {/* Bottom-Right Corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] translate-x-[50%] translate-y-[50%] border-l-0 border-t-0"
        style={{ willChange: 'transform', borderColor: cursorColor }}
      />
      {/* Bottom-Left Corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] translate-x-[-150%] translate-y-[50%] border-r-0 border-t-0"
        style={{ willChange: 'transform', borderColor: cursorColor }}
      />
    </div>
  );
}
