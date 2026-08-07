import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const WORDS = ['ENGINEER', 'BUILDER', 'DEVELOPER'];
const HEADING_CLASS = 'font-[Space_Grotesk,sans-serif] font-black tracking-[-0.03em] leading-none uppercase';

export default function RotatingTitle({ startAnimation = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (!startAnimation || reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [startAnimation, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="overflow-hidden flex items-center my-2 md:my-4 lg:my-6 h-[65px] md:h-[120px] lg:h-[200px] pt-5 md:pt-0">
        <h1 
          className={`${HEADING_CLASS} select-none text-[52px] md:text-8xl lg:text-[160px]`} 
          style={{ color: 'var(--text-primary)' }}
        >
          {WORDS[0]}
        </h1>
      </div>
    );
  }

  return (
    <div className="overflow-hidden flex items-center my-2 md:my-4 lg:my-6 h-[65px] md:h-[120px] lg:h-[200px] pt-5 md:pt-0">
      <AnimatePresence mode="wait">
        <motion.h1
          key={WORDS[currentIndex]}
          variants={{
            enter: { y: isDesktop ? 60 : 40, opacity: 0, filter: 'blur(4px)' },
            center: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } },
            exit: { y: isDesktop ? -40 : -20, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } }
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className={`${HEADING_CLASS} select-none text-[52px] md:text-8xl lg:text-[160px]`}
          style={{ color: 'var(--text-primary)' }}
        >
          {WORDS[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
