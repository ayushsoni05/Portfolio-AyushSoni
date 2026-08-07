import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (window.__lenis) {
              window.__lenis.scrollTo(0, { duration: 2.5 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Back to top"
          className="cursor-target fixed bottom-5 right-5 md:bottom-12 md:right-12 z-50 flex h-[55px] w-[55px] rounded-[6px] items-center justify-center cursor-none"
          style={{
            border: '1px solid var(--border-strong)',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            boxShadow: '0 4px 16px var(--shadow-color)',
          }}
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
