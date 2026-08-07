import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import RotatingTitle from './RotatingTitle';
import { ORBIT_ICONS, ORBIT_OPACITIES } from '../../data/techIcons';

const RESUME_URL = 'https://drive.google.com/file/d/1z9ADUpnmiMjF3eiBnmbd3NlNQB9ttBjK/view?usp=drive_link';

export default function Hero({ startAnimation = true }) {
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const rings = [
    { width: isDesktop ? 600 : 650, height: isDesktop ? 600 : 650 },
    { width: 1000, height: 1000 },
    { width: 1400, height: 1400 },
  ];

  const handleEmailClick = (e) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'mailto:aayushsonisoni58@gmail.com';
    } else {
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=aayushsonisoni58@gmail.com', '_blank');
    }
  };

  const handleResumeClick = (e) => {
    e.preventDefault();
    window.open(RESUME_URL, '_blank');
  };

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Concentric Orbit Rings */}
      {rings.map((ring, index) => (
        <div
          key={`ring-${index}`}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 block"
          style={{ width: ring.width, height: ring.height, border: '1px solid var(--orbit-color)' }}
        />
      ))}

      {/* Orbiting Tech Icons */}
      {!reducedMotion &&
        ORBIT_ICONS?.map((icon, index) => {
          const radius = rings[icon.ring].width / 2;
          const delay = -(icon.duration * icon.angle) / 360;

          return (
            <div
              key={`icon-${index}`}
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-none"
              style={{
                width: icon.size,
                height: icon.size,
                marginTop: -(icon.size / 2),
                marginLeft: -(icon.size / 2),
                '--orbit-r': `${radius}px`,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '50%',
                animation: `${icon.cw ? 'orbitCW' : 'orbitCCW'} ${icon.duration}s linear infinite`,
                animationDelay: `${delay}s`,
                animationPlayState: 'var(--animation-play-state, running)',
              }}
            >
              <icon.Icon size={icon.size} style={{ opacity: ORBIT_OPACITIES[icon.ring] }} />
            </div>
          );
        })}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 lg:px-12">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: isDesktop ? -45 : -65 }}
          animate={startAnimation ? { opacity: 1, y: isDesktop ? -35 : -55 } : { opacity: 0, y: isDesktop ? -45 : -65 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="cursor-target flex items-center gap-2 rounded-[10px] mb-3 md:mb-6 text-[13px] font-medium tracking-wider cursor-none font-[Space_Grotesk,sans-serif] px-6 py-2"
          style={{
            border: '1px solid var(--border-strong)',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 14px var(--shadow-btn)',
          }}
        >
          <span className="relative flex h-[10px] w-[10px] shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: '#14A800' }} />
            <span className="relative inline-flex h-[10px] w-[10px] rounded-full" style={{ backgroundColor: '#14A800' }} />
          </span>
          AVAILABLE FOR WORK
        </motion.div>

        {/* Greeting Heading */}
        <motion.p
          initial={{ opacity: 0, y: isDesktop ? 20 : -40 }}
          animate={startAnimation ? { opacity: 1, y: isDesktop ? 0 : -30 } : { opacity: 0, y: isDesktop ? 20 : -40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-[Space_Grotesk,sans-serif] font-normal mb-2 max-w-[850px] text-[24px] md:text-xl lg:text-[34px]"
          style={{ color: 'var(--text-primary)' }}
        >
          Hello! I'm Ayush Soni. A Creative Full-Stack
        </motion.p>

        {/* Rotating Title */}
        <RotatingTitle startAnimation={startAnimation} />

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: isDesktop ? 20 : 0 }}
          animate={startAnimation ? { opacity: 1, y: isDesktop ? 0 : 10 } : { opacity: 0, y: isDesktop ? 20 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-[Space_Grotesk,sans-serif] leading-[1.7] flex items-center text-[18px] md:text-[20px] max-w-[700px] mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          I build fast, scalable web applications with modern frontend architectures, robust backend APIs, and real-time interactive features.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="mailto:ayushsoni@gmail.com"
            onClick={handleEmailClick}
            className="cursor-target cursor-none px-7 py-3 rounded-[6px] font-[Space_Grotesk,sans-serif] font-semibold text-[14px] md:text-[15px] transition-all flex items-center gap-2"
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              boxShadow: '0 4px 14px var(--shadow-btn)',
            }}
          >
            Let's Talk
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            className="cursor-target cursor-none px-7 py-3 rounded-[6px] font-[Space_Grotesk,sans-serif] font-semibold text-[14px] md:text-[15px] transition-all flex items-center gap-2"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 4px 14px var(--shadow-btn)',
            }}
          >
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
