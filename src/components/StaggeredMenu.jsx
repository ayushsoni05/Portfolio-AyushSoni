import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import gsap from 'gsap';
import { NAV_ITEMS } from '../data/navigation';
import { useTheme } from '../context/ThemeContext';

export default function StaggeredMenu({ isOpen, onClose }) {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('#home');
  const panelRef = useRef(null);
  const prelayerContainerRef = useRef(null);
  const prelayerRefs = useRef([]);
  const menuItemsRef = useRef([]);
  const openTimeline = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(panelRef.current, { xPercent: 100, opacity: 1 });
      gsap.set(prelayerRefs.current, { xPercent: 100, opacity: 1 });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    if (openTimeline.current) openTimeline.current.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(prelayerRefs.current, {
      xPercent: 0,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.1,
    })
      .to(
        panelRef.current,
        {
          xPercent: 0,
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      .fromTo(
        menuItemsRef.current,
        { yPercent: 140, rotate: 10 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        },
        '-=0.5'
      )
      .to(
        panelRef.current,
        {
          '--sm-num-opacity': 1,
          duration: 0.3,
        },
        '-=0.6'
      );

    openTimeline.current = tl;
    return tl;
  }, []);

  const buildCloseTimeline = useCallback(() => {
    if (openTimeline.current) {
      openTimeline.current.timeScale(2).reverse();
    } else {
      gsap.to([panelRef.current, ...prelayerRefs.current], {
        xPercent: 100,
        duration: 0.5,
        ease: 'power4.in',
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      buildOpenTimeline().play();
      if (window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden';
        window.lenis?.stop?.();
      }
    } else {
      buildCloseTimeline();
      document.body.style.overflow = '';
      window.lenis?.start?.();
    }
  }, [isOpen, buildOpenTimeline, buildCloseTimeline]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Scroll progress active section detection
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveSection(href);
    onClose();
    setTimeout(() => {
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(href);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div className="sm-scope">
      <style>{`
        .sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 90; pointer-events: none; }
        .sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
        
        .sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(300px, 45vw, 600px); height: 100%; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; border-left: 1px solid var(--border-strong); }
        .sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(300px, 45vw, 600px); pointer-events: none; z-index: 5; }
        .sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); border-left: 1px solid var(--border); }
        
        .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        
        .sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2.5rem; }
        @media (min-width: 768px) {
          .sm-scope .sm-panel-list { gap: 2rem; }
        }
        
        .sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
        .sm-scope .sm-panel-item:hover { color: var(--text-primary) !important; }
        
        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { 
          counter-increment: smItem; 
          content: "0" counter(smItem); 
          position: absolute; 
          top: 0.1em; 
          right: -0.1em; 
          font-size: 20px; 
          font-weight: 500; 
          color: var(--text-secondary); 
          letter-spacing: -0.02em; 
          font-family: 'Space Grotesk', sans-serif; 
          opacity: var(--sm-num-opacity, 0); 
        }
        @media (max-width: 768px) { 
          .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; border-left: none; } 
        }
        .sm-scope .menu-logo-img { transition: opacity 0.3s ease; opacity: 0.7; }
        [data-theme="light"] .sm-scope .menu-logo-img { opacity: 0.9; }
        [data-theme="dark"] .sm-scope .menu-logo-img { opacity: 0.7; }
      `}</style>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-20 backdrop-blur-md flex items-center justify-center pointer-events-auto"
            style={{ backgroundColor: 'var(--bg-overlay)' }}
            onClick={onClose}
          >
            <div
              className="hidden md:flex items-center justify-center w-full h-full pointer-events-none"
              style={{ paddingRight: 'clamp(300px, 45vw, 600px)' }}
            >
              <img
                src="/assets/Logo.png"
                alt="Ayush Soni Monogram Logo"
                className="cursor-target cursor-none w-[320px] sm:w-[420px] md:w-[500px] lg:w-[650px] menu-logo-img pointer-events-auto select-none mix-blend-screen"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Menu Overlay Container */}
      <div
        className={`sm-scope z-90 fixed top-0 right-0 w-full h-full overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div className="staggered-menu-wrapper pointer-events-none relative w-full h-full">
          <div ref={prelayerContainerRef} className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-5">
            {[12, 9, 6, 3].map((pct, i) => (
              <div
                key={i}
                ref={(el) => (prelayerRefs.current[i] = el)}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ backgroundColor: `color-mix(in srgb, var(--text-primary) ${pct}%, var(--bg-primary))` }}
              />
            ))}
          </div>

          <aside
            id="staggered-menu-panel"
            ref={panelRef}
            className="staggered-menu-panel absolute top-0 right-0 h-full flex flex-col p-[6em_2em_2em_2em] md:p-[8em_4em_4em_4em] overflow-y-auto z-10 pointer-events-auto"
            style={{ backgroundColor: 'var(--bg-primary)' }}
            aria-hidden={!isOpen}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm-panel-inner flex-1 flex flex-col justify-center">
              <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-10 md:gap-8" role="list" data-numbering="true">
                {NAV_ITEMS?.map((item, index) => {
                  const isActive = activeSection === item.link;
                  return (
                    <li key={index} className="sm-panel-itemWrap relative overflow-hidden leading-none">
                      <a
                        href={item.link}
                        onClick={(e) => handleNavClick(e, item.link)}
                        className="cursor-target sm-panel-item cursor-none relative font-bold text-[48px] md:text-[55px] leading-none transition-[background,color] duration-300 ease-linear inline-block no-underline pr-12 md:pr-16 font-[Space_Grotesk,sans-serif]"
                        style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        aria-label={item.ariaLabel}
                        data-index={index + 1}
                      >
                        <span
                          ref={(el) => (menuItemsRef.current[index] = el)}
                          className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform"
                        >
                          {item.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
