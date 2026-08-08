import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import RayBeams from './RayBeams';
import { HiOutlineMail, HiCheck, HiClipboardCopy } from 'react-icons/hi';
import { SiGithub, SiLeetcode, SiReact, SiTypescript, SiNodedotjs, SiExpress, SiPostgresql, SiPrisma, SiTailwindcss, SiDocker, SiVite, SiNextdotjs, SiMongodb, SiFramer } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';

const CONTACT_DATA = {
  email: 'aayushsonisoni58@gmail.com',
  linkedin: { name: 'Ayush Soni', url: 'https://www.linkedin.com/in/ayush-soni05' },
  github: { username: 'ayushsoni05', url: 'https://github.com/ayushsoni05' },
  leetcode: { handle: 'ayush_soni', url: 'https://leetcode.com/ayush_soni' },
  displayName: 'AYUSH SONI',
};

// Stable Static GitHub Project Arrays from Resume
const GITHUB_ROW1_BASE = [
  { title: 'Prepzo', category: 'Full-Stack AI Career & Placement Accelerator' },
  { title: 'Glimmr', category: 'Full-Stack E-Commerce Platform' },
  { title: 'Hand Gesture Recognition', category: 'Real-Time Computer Vision System' },
  { title: 'Prepzo', category: 'Full-Stack AI Career & Placement Accelerator' },
  { title: 'Glimmr', category: 'Full-Stack E-Commerce Platform' },
];

const GITHUB_ROW2_BASE = [
  { title: 'Glimmr', category: 'Full-Stack E-Commerce Platform' },
  { title: 'Hand Gesture Recognition', category: 'Real-Time Computer Vision System' },
  { title: 'Prepzo', category: 'Full-Stack AI Career & Placement Accelerator' },
  { title: 'Glimmr', category: 'Full-Stack E-Commerce Platform' },
  { title: 'Hand Gesture Recognition', category: 'Real-Time Computer Vision System' },
];

const GITHUB_ROW1_DATA = [...GITHUB_ROW1_BASE, ...GITHUB_ROW1_BASE, ...GITHUB_ROW1_BASE];
const GITHUB_ROW2_DATA = [...GITHUB_ROW2_BASE, ...GITHUB_ROW2_BASE, ...GITHUB_ROW2_BASE];

// Stable Tech Icon Arrays for LinkedIn Card
const LINKEDIN_ICONS_1 = [SiReact, SiTypescript, SiExpress, SiMongodb, SiDocker, SiVite, SiNextdotjs, SiPostgresql, SiPrisma, SiTailwindcss];
const LINKEDIN_ICONS_2 = [SiNextdotjs, SiTailwindcss, SiReact, SiFramer, SiVite, SiTypescript, SiExpress, SiMongodb, SiPrisma, SiPostgresql];
const LINKEDIN_ICONS_3 = [SiDocker, SiTailwindcss, SiNextdotjs, SiPrisma, SiReact, SiMongodb, SiFramer, SiTypescript, SiExpress, SiVite];

const LINKEDIN_COL1_DATA = [...LINKEDIN_ICONS_1, ...LINKEDIN_ICONS_1, ...LINKEDIN_ICONS_1, ...LINKEDIN_ICONS_1];
const LINKEDIN_COL2_DATA = [...LINKEDIN_ICONS_2, ...LINKEDIN_ICONS_2, ...LINKEDIN_ICONS_2, ...LINKEDIN_ICONS_2];
const LINKEDIN_COL3_DATA = [...LINKEDIN_ICONS_3, ...LINKEDIN_ICONS_3, ...LINKEDIN_ICONS_3, ...LINKEDIN_ICONS_3];

// Card 1: Corner Brackets GET IN TOUCH Card matching exact ee from bundle
function CornerGetInTouchCard({ className = '' }) {
  return (
    <div
      className={`cursor-target relative flex items-center justify-center p-6 md:p-8 ${className}`.trim()}
      style={{ minHeight: '100px' }}
    >
      <span className="absolute top-3 left-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 16V2H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute top-3 right-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2H16V16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute bottom-3 left-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2V16H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute bottom-3 right-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 16H16V2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>

      <h3
        className="font-[Space_Grotesk,sans-serif] font-extrabold text-[35px] md:text-[40px] tracking-widest uppercase select-none text-center"
        style={{ color: 'var(--text-primary)', letterSpacing: '0.5px' }}
      >
        GET IN <br className="hidden md:block" /> TOUCH
      </h3>
    </div>
  );
}

// Card 2: Email Copy Card
function EmailCopyCard({ className = '' }) {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CONTACT_DATA.email).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 3000);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${CONTACT_DATA.email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_DATA.email}`, '_blank');
    }
  };

  return (
    <div
      ref={cardRef}
      className={`cursor-target cursor-none relative flex items-center justify-center gap-3 md:gap-5 rounded-xl border px-5 py-6 overflow-hidden ${className}`.trim()}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)', minHeight: '80px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={`mailto:${CONTACT_DATA.email}`}
        onClick={handleEmailClick}
        className="absolute inset-0 z-5 cursor-none cursor-target"
        aria-label="Send email"
      />

      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, var(--surface-hover), transparent 60%)`,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}

      <HiOutlineMail className="shrink-0 relative z-10 text-[20px] md:text-[30px] pointer-events-none" style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
      <span className="relative z-10 font-[Space_Grotesk,sans-serif] font-medium text-[15px] md:text-lg lg:text-[25px] truncate pointer-events-none" style={{ color: 'var(--text-primary)' }}>
        {CONTACT_DATA.email}
      </span>

      <div
        className="cursor-target cursor-none relative z-10 shrink-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border"
        style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-card)', boxShadow: '0 4px 20px var(--shadow-color)' }}
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }} className="flex items-center justify-center">
              <HiCheck size={16} style={{ color: 'var(--text-primary)' }} aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div key="copy" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }} className="flex items-center justify-center">
              <HiClipboardCopy size={16} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Vertical Marquee Column matching exact se from bundle
function VerticalMarqueeColumn({ icons, direction = 'up', duration = 30, paused = false }) {
  const reducedMotion = useReducedMotion();
  const columnRef = useRef(null);
  const tweenRef = useRef(null);

  // Initialize loop ONCE on mount so position y NEVER resets
  useEffect(() => {
    if (reducedMotion || !columnRef.current) return;
    const height = columnRef.current.scrollHeight / 2;
    gsap.set(columnRef.current, { y: 0 });
    tweenRef.current = gsap.to(columnRef.current, {
      y: (direction === 'up' ? '-=' : '+=') + height,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize(gsap.utils.wrap(-height, 0)),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [reducedMotion, direction, duration]);

  // Smoothly decelerate/accelerate speed on hover without resetting y position
  useEffect(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: paused ? 0.2 : 1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, [paused]);

  return (
    <div className="overflow-hidden h-full" style={{ width: '56px', flexShrink: 0 }}>
      <div ref={columnRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>
        {icons.map((Icon, idx) => (
          <div key={idx} className="flex items-center justify-center shrink-0" style={{ width: '50px', height: '50px' }}>
            <Icon className="text-[35px] md:text-[40px]" style={{ color: 'var(--text-secondary)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Card 3: LinkedIn Card matching exact ce from bundle
function LinkedInCard({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <a
      href={CONTACT_DATA.linkedin.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className={`cursor-none cursor-target relative flex flex-col rounded-xl border overflow-hidden h-full ${className}`.trim()}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)', boxShadow: '0 4px 20px var(--shadow-color)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse Spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--surface-hover), transparent 60%)`, zIndex: 1, willChange: 'background' }}
          aria-hidden="true"
        />
      )}

      {/* 3 Marquee Background Ticker Columns */}
      <div className="absolute inset-0 z-0 flex justify-center items-center gap-15 md:gap-10 pointer-events-none pb-1" style={{ opacity: 0.35 }}>
        <VerticalMarqueeColumn icons={LINKEDIN_COL1_DATA} direction="up" duration={30} paused={isHovered} />
        <VerticalMarqueeColumn icons={LINKEDIN_COL2_DATA} direction="down" duration={30} paused={isHovered} />
        <VerticalMarqueeColumn icons={LINKEDIN_COL3_DATA} direction="up" duration={30} paused={isHovered} />
      </div>

      {/* Bottom Gradient Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-5"
        style={{ height: '75%', background: 'linear-gradient(to top, var(--bg-secondary) 10%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6">
        <div className="self-start">
          <FaLinkedin className="text-[50px] md:text-[50px]" style={{ color: 'var(--text-primary)', background: 'var(--bg-card)' }} />
        </div>

        <div className="flex flex-col items-start gap-8 mt-auto pt-10 w-full">
          <div
            className="cursor-none cursor-target rounded-lg border p-2 text-[90%] md:text-[75%] font-medium transition-all duration-500 active:scale-95 tracking-widest text-center whitespace-nowrap truncate max-w-full"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)', background: 'var(--bg-card)', fontFamily: 'Space Grotesk, monospace' }}
          >
            linkedin.com/in/ayush-soni05
          </div>

          <div
            className="cursor-target shrink-0 rounded-lg px-3 py-2 text-[15px] font-bold transition-all duration-500 active:scale-95"
            style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Connect
          </div>
        </div>
      </div>
    </a>
  );
}

// Card 4: Poster Profile Photo Card
function ProfilePosterCard({ className = '' }) {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`cursor-target relative pb-2 flex flex-col rounded-xl border overflow-hidden h-full ${className}`.trim()}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)', boxShadow: '0 4px 20px var(--shadow-color)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Dynamic Ray Beams Background Backdrop */}
      <div className="absolute inset-0 overflow-hidden z-0 rounded-xl">
        <RayBeams
          beamWidth={2}
          beamHeight={40}
          beamNumber={50}
          lightColor={theme === 'light' ? '#000000' : '#ffffff'}
          backgroundColor={theme === 'light' ? '#ffffff' : '#111113'}
          speed={2}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-white/20 to-white/80' : 'from-black/20 to-black/80'} z-10 pointer-events-none`} />
      </div>

      {/* 4 Corner Brackets */}
      <span className="absolute top-3 left-3 pointer-events-none z-20" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 16V2H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute top-3 right-3 pointer-events-none z-20" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2H16V16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute bottom-3 left-3 pointer-events-none z-20" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2V16H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute bottom-3 right-3 pointer-events-none z-20" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 16H16V2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>

      {/* Color Spotlight Reveal */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none flex flex-col pb-2 z-11"
          style={{
            maskImage: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, black 0%, transparent 55%)`,
            WebkitMaskImage: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, black 0%, transparent 55%)`,
            willChange: 'mask-image, -webkit-mask-image',
          }}
          aria-hidden="true"
        >
          <div className="relative z-19 flex flex-col items-center pt-5 px-4 w-full opacity-0">
            <h2 className="text-[40px] font-bold uppercase tracking-wide text-center drop-shadow-md font-[Space_Grotesk,sans-serif]" style={{ lineHeight: 1, color: 'var(--text-primary)' }}>
              AYUSH <br /> SONI
            </h2>
            <p className="text-[15px] font-semibold pt-1 font-[Space_Grotesk,sans-serif]" style={{ color: 'var(--text-secondary)' }}>
              Full-Stack Developer
            </p>
          </div>
          <div className="relative z-10 grow flex items-end justify-center w-full pt-3 select-none">
            <img
              src="/assets/profilepic.png"
              alt=""
              className="w-full max-w-[280px] h-auto object-contain object-bottom opacity-90 select-none pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
              }}
            />
          </div>
        </div>
      )}

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: '40%', background: 'linear-gradient(to top, var(--bg-secondary) 5%, transparent 80%)' }}
        aria-hidden="true"
      />

      {/* Header Name */}
      <div className="relative z-19 flex flex-col items-center pt-5 px-4 w-full">
        <h2
          className="text-[40px] font-bold uppercase tracking-wide text-center drop-shadow-md font-[Space_Grotesk,sans-serif]"
          style={{ lineHeight: 1, color: 'var(--text-primary)' }}
        >
          AYUSH <br /> SONI
        </h2>
        <p className="text-[15px] font-semibold pt-1 font-[Space_Grotesk,sans-serif]" style={{ color: 'var(--text-secondary)' }}>
          Full-Stack Developer
        </p>
      </div>

      {/* Grayscale Base Image */}
      <div className="relative z-10 grow flex items-end justify-center w-full pt-3 select-none">
        <img
          src="/assets/profilepic.png"
          alt="Profile"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          loading="lazy"
          className="w-full max-w-[280px] h-auto object-contain object-bottom grayscale opacity-90 select-none pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
          }}
        />
      </div>
    </div>
  );
}

// Single Mini Project Card item matching exact fe from bundle
function MiniProjectCard({ title, category }) {
  return (
    <div
      className="shrink-0 rounded-xl border flex flex-col gap-2 justify-center px-5"
      style={{
        width: '200px',
        height: '100px',
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <p
        className="font-[Space_Grotesk,sans-serif] font-bold text-[15px] tracking-wide leading-tight line-clamp-1"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </p>
      <p
        className="font-[Space_Grotesk,sans-serif] text-[13px] line-clamp-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {category}
      </p>
    </div>
  );
}

// Continuous Horizontal Marquee Row that NEVER resets on hover
function HorizontalMarqueeRow({ projects, direction = 'left', duration = 30, paused }) {
  const reducedMotion = useReducedMotion();
  const rowRef = useRef(null);
  const tweenRef = useRef(null);

  // Initialize continuous loop ONCE on mount
  useEffect(() => {
    if (reducedMotion || !rowRef.current) return;
    const width = rowRef.current.scrollWidth / 2;
    gsap.set(rowRef.current, { x: 0 });
    tweenRef.current = gsap.to(rowRef.current, {
      x: (direction === 'left' ? '-=' : '+=') + width,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(gsap.utils.wrap(-width, 0)),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [reducedMotion, direction, duration]);

  // Smoothly adjust timeScale on hover without breaking or resetting position
  useEffect(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: paused ? 0.15 : 1,
        duration: 1.0,
        ease: 'power2.out',
      });
    }
  }, [paused]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={rowRef} className="flex gap-6 pr-[10px] w-max">
        {projects.map((p, idx) => (
          <MiniProjectCard key={`${p.title}-${idx}`} title={p.title} category={p.category} />
        ))}
      </div>
    </div>
  );
}

// Card 5: GitHub Projects Grid Card matching exact me from bundle
function GitHubProjectsCard({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <a
      href={CONTACT_DATA.github.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className={`cursor-none cursor-target relative flex flex-col rounded-xl border overflow-hidden h-full ${className}`.trim()}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)', boxShadow: '0 4px 20px var(--shadow-color)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, var(--surface-hover), transparent 60%)`, zIndex: 1 }}
          aria-hidden="true"
        />
      )}

      {/* Header */}
      <div className="relative z-10 flex items-center justify-center md:justify-between px-6 pt-4 md:pt-6 shrink-0">
        <div className="flex items-center gap-3">
          <SiGithub size={35} style={{ color: 'var(--text-primary)' }} />
          <span className="font-[Space_Grotesk,sans-serif] font-semibold text-[18px] md:text-[20px] truncate text-[var(--text-primary)]">
            github/<span className="text-[var(--text-primary)]">{CONTACT_DATA.github.username}</span>
          </span>
        </div>
        <div className="hidden md:block">
          <div
            className="cursor-none cursor-target inline-flex items-center justify-center gap-1.5 rounded-lg px-6 py-2.5 text-[14px] font-bold transition-all duration-500 active:scale-95"
            style={{ color: 'var(--bg-primary)', background: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
            aria-label="Follow on GitHub"
          >
            Follow
          </div>
        </div>
      </div>

      {/* 2 Continuous Marquee Rows */}
      <div className="flex flex-col justify-center gap-5 px-2 flex-1 min-h-0 overflow-hidden py-5 relative z-2">
        <HorizontalMarqueeRow projects={GITHUB_ROW1_DATA} direction="left" duration={30} paused={isHovered} />
        <HorizontalMarqueeRow projects={GITHUB_ROW2_DATA} direction="right" duration={30} paused={isHovered} />
      </div>

      {/* Side Fade Mask Gradients */}
      <div className="absolute top-0 bottom-0 left-0 pointer-events-none z-5" style={{ width: '25%', background: 'linear-gradient(to right, var(--bg-card) 5%, transparent 100%)' }} aria-hidden="true" />
      <div className="absolute top-0 bottom-0 right-0 pointer-events-none z-5" style={{ width: '25%', background: 'linear-gradient(to left, var(--bg-card) 5%, transparent 100%)' }} aria-hidden="true" />

      {/* Mobile Follow Button */}
      <div className="relative z-10 px-6 pb-4 shrink-0 mt-auto flex md:hidden justify-center">
        <div
          className="cursor-none cursor-target inline-flex items-center justify-center gap-1.5 rounded-lg px-6 py-2.5 text-[14px] font-bold transition-all duration-500 active:scale-95"
          style={{ color: 'var(--bg-primary)', background: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          aria-label="Follow on GitHub"
        >
          Follow
        </div>
      </div>
    </a>
  );
}

// Card 6: LeetCode Heatmap Card
function generateHeatmapCells(rows = 10, cols = 18) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const rand = Math.random();
      let cls = '';
      if (rand > 0.85) cls = 'lc-hot';
      else if (rand > 0.65) cls = 'lc-mid';
      else if (rand > 0.45) cls = 'lc-low';
      cells.push({ key: `${r}-${c}`, cls });
    }
  }
  return cells;
}

function LeetCodeHeatmapCard({ className = '' }) {
  const [cells] = useState(() => generateHeatmapCells(10, 18));
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <a
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={CONTACT_DATA.leetcode.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`cursor-none cursor-target block relative rounded-xl border overflow-hidden h-full ${className}`.trim()}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)', boxShadow: '0 4px 20px var(--shadow-color)' }}
    >
      {/* Heatmap Cell Grid */}
      <div className="lc-heatmap" aria-hidden="true" style={{ opacity: 0.45 }}>
        {cells.map(({ key, cls }) => (
          <div key={key} className={`lc-cell ${cls}`} />
        ))}
      </div>

      {/* Spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, var(--surface-hover), transparent 60%)`, zIndex: 0, willChange: 'background' }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between gap-8 h-full p-6 md:p-4">
        <SiLeetcode size={60} style={{ color: 'var(--text-primary)' }} />
        <div className="w-full flex justify-center">
          <div
            className="cursor-none cursor-target rounded-lg border px-4 py-2 text-[18px] md:text-[15px] font-medium transition-all duration-500 active:scale-95 tracking-widest"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)', background: 'var(--bg-card)', fontFamily: 'Space Grotesk, monospace' }}
            aria-label={`LeetCode profile: ${CONTACT_DATA.leetcode.handle}`}
          >
            leetcode.com/ayush_soni
          </div>
        </div>
      </div>
    </a>
  );
}

// Card 7: Logo Brackets Card matching exact Ky from bundle
function LogoBracketsCard({ className = '' }) {
  const { theme } = useTheme();

  return (
    <div
      className={`cursor-target relative flex items-center justify-center p-6 md:p-8 ${className}`.trim()}
      style={{ minHeight: '100px' }}
    >
      {/* 4 Corner Brackets */}
      <span className="absolute top-3 left-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 16V2H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute top-3 right-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2H16V16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute bottom-3 left-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 2V16H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>
      <span className="absolute bottom-3 right-3 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1 }} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 16H16V2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </span>

      <img
        src="/assets/Logo.png"
        alt="Logo"
        className="relative z-10 w-auto h-[60px] md:h-[75px] object-contain pointer-events-none select-none mix-blend-screen"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

// Card 8: CTA Statement Card
function CtaStatementCard({ className = '' }) {
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`cursor-target relative flex items-center justify-center rounded-xl border px-6 md:px-10 leading-8 overflow-hidden ${className}`.trim()}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, var(--surface-hover), transparent 60%)`, zIndex: 0 }}
          aria-hidden="true"
        />
      )}

      <p className="relative z-10 text-[30px] md:text-[25px] leading-8 font-[Space_Grotesk,sans-serif] tracking-wide [word-spacing:2px] pointer-events-none text-center font-medium" style={{ color: 'var(--text-primary)' }}>
        Let's connect and build something amazing together.
      </p>
    </div>
  );
}

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { threshold: 0.08, once: true });

  const cubicEase = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: cubicEase } },
  };

  const mobileItemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : itemVariants;

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center pb-6 md:pb-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-custom">
        <div ref={headerRef}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full pt-8 md:pt-20"
          >
            {/* Mobile Stack */}
            <div className="flex flex-col gap-5 md:hidden">
              <motion.div variants={mobileItemVariants}><CornerGetInTouchCard /></motion.div>
              <motion.div variants={mobileItemVariants}><EmailCopyCard /></motion.div>
              <motion.div variants={mobileItemVariants}><LinkedInCard /></motion.div>
              <motion.div variants={mobileItemVariants}><GitHubProjectsCard /></motion.div>
              <motion.div variants={mobileItemVariants}><LeetCodeHeatmapCard /></motion.div>
              <motion.div variants={mobileItemVariants} className="h-[140px]"><LogoBracketsCard className="h-full w-full" /></motion.div>
              <motion.div variants={mobileItemVariants} className="h-[450px]"><ProfilePosterCard className="h-full w-full" /></motion.div>
              <motion.div variants={mobileItemVariants} className="h-[200px]"><CtaStatementCard className="h-full w-full" /></motion.div>
            </div>

            {/* Desktop 4x4 Grid matching exact target live site positions */}
            <div
              className="hidden md:grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gridTemplateRows: '120px 160px 160px 120px',
              }}
            >
              <motion.div variants={mobileItemVariants} style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
                <CornerGetInTouchCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '2 / 4', gridRow: '1 / 2' }}>
                <EmailCopyCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '4 / 5', gridRow: '1 / 3' }}>
                <LinkedInCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '1 / 2', gridRow: '2 / 5' }}>
                <ProfilePosterCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '2 / 4', gridRow: '2 / 4' }}>
                <GitHubProjectsCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}>
                <LeetCodeHeatmapCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '2 / 3', gridRow: '4 / 5' }}>
                <LogoBracketsCard className="h-full w-full" />
              </motion.div>

              <motion.div variants={mobileItemVariants} style={{ gridColumn: '3 / 5', gridRow: '4 / 5' }}>
                <CtaStatementCard className="h-full w-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer Copyright Text */}
        <div className="relative bottom-0 md:-bottom-5 text-center pt-6 md:pt-4">
          <p className="text-sm font-[Space_Grotesk,sans-serif]" style={{ color: 'var(--text-secondary)' }}>
            Ayush Soni © 2026
          </p>
        </div>
      </div>
    </section>
  );
}
