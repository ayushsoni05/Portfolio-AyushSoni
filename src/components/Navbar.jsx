import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import StaggeredMenu from './StaggeredMenu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const isTransitioning = useRef(false);
  const { theme, toggleTheme } = useTheme();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150) {
      setIsScrolled(true);
      if (!isMenuOpen) {
        setIsHidden(latest > previous);
      }
    } else {
      setIsScrolled(false);
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleThemeToggle = (e) => {
    if (isTransitioning.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !document.startViewTransition) {
      toggleTheme();
      return;
    }

    isTransitioning.current = true;
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-transitioning');
    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        }
      ).onfinish = () => {
        document.documentElement.classList.remove('theme-transitioning');
        isTransitioning.current = false;
      };
    });
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: '-150%', opacity: 0 }
        }}
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-5 md:top-10 left-0 right-0 z-[100] flex h-[70px] items-center justify-between px-5 md:px-8 lg:px-12 pointer-events-none"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleThemeToggle}
          className="pointer-events-auto cursor-target flex h-[55px] w-[55px] cursor-none items-center justify-center rounded-[6px] text-[20px]"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 14px var(--shadow-color)'
          }}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.5 }}
          >
            {theme === 'dark' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="pointer-events-auto cursor-target flex h-[55px] w-[55px] cursor-none items-center justify-center rounded-[6px] text-[20px]"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 14px var(--shadow-color)'
          }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </motion.nav>

      <StaggeredMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
