import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GREETINGS = ['Hello', 'नमस्ते', 'Hola', 'Bonjour', 'こんにちは', 'Ciao', 'Привет', 'Hello!'];

export default function Preloader({ onExitStart, onComplete }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const triggerExit = () => {
      setIsExiting(true);
      if (onExitStart) onExitStart();
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = setTimeout(triggerExit, 400);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }

    let currentIndex = 0;
    let intervalId;
    const initialTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex += 1;
        if (currentIndex >= GREETINGS.length) {
          clearInterval(intervalId);
          triggerExit();
        } else {
          setIndex(currentIndex);
        }
      }, 170);
    }, 450);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) clearInterval(intervalId);
      document.body.style.overflow = '';
    };
  }, [onExitStart]);

  if (isFinished) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.15 : 0 }}
      onAnimationComplete={() => {
        if (!isExiting || isFinished) return;
        document.body.style.overflow = '';
        setIsFinished(true);
        if (onComplete) onComplete();
      }}
      className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      aria-hidden={true}
    >
      {/* Greeting Word Display */}
      <div className="flex items-center gap-4">
        <motion.span
          key={GREETINGS[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12 }}
          className="font-[Space_Grotesk,sans-serif] text-[60px] font-bold md:text-[80px] tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {GREETINGS[index]}
        </motion.span>
      </div>

      {/* Bottom Curved Arch Curtain Decor */}
      <div
        className="absolute left-0 top-full h-24 w-full rounded-b-[100%]"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      />
    </motion.div>
  );
}
