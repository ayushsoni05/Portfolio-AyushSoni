import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import { useTheme } from '../../context/ThemeContext';

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'Full-Stack AI Career & Placement Accelerator',
    title: 'PREPZO',
    description: 'Architected and shipped a production-grade, full-stack AI career platform using React 19, TypeScript, Node.js, Express, MongoDB, Redis, and Socket.io -- featuring a 5-phase Gamified Assessment Engine with multiplayer CS Trivia, an AI Code-Golf engine, and a WebGL 3D Domain Runner via React Three Fiber & Three.js. Engineered real-time multiplayer coding duels via WebSockets with ELO matchmaking, global leaderboards, OpenAI & Gemini Pro AI Architect Co-Pilot, ATS resume scoring, and GitHub commit-history reconstructor.',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'OpenAI', 'Gemini Pro', 'Redis', 'Three.js', 'React Three Fiber', 'BcryptJS', 'Speakeasy 2FA'],
    image: '/assets/project1.png',
    liveUrl: 'https://prepzo-ai.vercel.app/',
    githubUrl: 'https://github.com/ayushsoni05/prepzo',
  },
  {
    id: 2,
    category: 'Full-Stack Luxury Jewelry E-Commerce Platform',
    title: 'GLIMMR',
    description: 'Engineered a dual-backend luxury jewelry e-commerce platform featuring high-end diamond rings, 18k gold necklaces, and luxury watches with Python/Flask analytics service and Node.js/Express.js REST API server (15+ endpoints) secured with JWT auth, input validation, and OOP/MVC architecture handling 500+ fine jewelry SKUs. Designed normalized MySQL schemas via SQLAlchemy ORM for orders/users and MongoDB/Mongoose for product catalog. Automated Pandas-based sales analytics pipelines generating weekly revenue reports; containerized and deployed on Linux via GitHub Actions CI/CD.',
    techStack: ['Python', 'Flask', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'SQLAlchemy', 'Pandas', 'JWT', 'Docker', 'GitHub Actions', 'Linux'],
    image: '/assets/project2.png',
    liveUrl: 'https://glimmr-store.vercel.app/',
    githubUrl: 'https://github.com/ayushsoni05/glimmr',
  },
  {
    id: 3,
    category: 'Real-Time Computer Vision System',
    title: 'HAND GESTURE RECOGNITION',
    description: 'Built a real-time gesture recognition engine processing 21-point MediaPipe hand landmarks with NumPy at 30+ FPS with 95%+ classification accuracy across 10 gesture classes, enabling hands-free gaming control. Reduced end-to-end inference latency by 30% by decoupling frame acquisition from inference via a multi-threaded OpenCV pipeline. Designed modular architecture using OOP design patterns separating landmark extraction, gesture classification, and input-event mapping layers.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Multi-threading', 'Linux', 'Git', 'OOP'],
    image: '/assets/project3.png',
    liveUrl: null,
    githubUrl: 'https://github.com/ayushsoni05/hand-gesture-recognition',
  },
];

function ProjectBrowserFrame({ image, title, liveUrl }) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef(null);

  const displayUrl = liveUrl
    ? new URL(liveUrl).hostname
    : ((t) =>
        t
          ? t
              .toLowerCase()
              .split(' ')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join('') + '.dev'
          : 'ayushsoni.dev')(title);

  const handleMouseMove = useCallback((e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    frameRef.current.style.setProperty('--mouse-x', `${x}px`);
    frameRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div className="flex justify-center items-center w-full cursor-target cursor-none">
      <div className="w-[clamp(580px,52vw,860px)] relative">
        {/* Main MacOS Frame Container */}
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-col relative overflow-hidden rounded-[18px] p-[14px] z-[2]"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            boxShadow: '0 25px 60px var(--shadow-color), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
          }}
        >
          {/* Radial Gradient Hover Spotlight */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--surface-hover), transparent 60%)',
                zIndex: 0,
                willChange: 'background',
              }}
              aria-hidden="true"
            />
          )}

          {/* Top Browser Bar */}
          <div
            className="flex items-center relative shrink-0 h-[46px] px-[18px]"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderBottom: theme === 'light' ? '1px solid var(--border-strong)' : '1px solid var(--border)',
              margin: '-14px -14px 14px -14px',
            }}
          >
            {/* Traffic Dot Buttons */}
            <div className="flex absolute left-[18px] gap-[9px]">
              <span className="w-[13px] h-[13px] rounded-[50%]" style={{ backgroundColor: '#ff5f56' }} />
              <span className="w-[13px] h-[13px] rounded-[50%]" style={{ backgroundColor: '#ffbd2e' }} />
              <span className="w-[13px] h-[13px] rounded-[50%]" style={{ backgroundColor: '#27c93f' }} />
            </div>

            {/* Domain Pill */}
            <div
              className="flex items-center justify-center h-[28px] rounded-[8px] text-[14px] font-semibold py-3 px-5 max-w-[50%] whitespace-nowrap overflow-hidden text-ellipsis tracking-wide font-[Space_Grotesk,sans-serif]"
              style={{
                margin: '0 auto',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-strong)',
                color: theme === 'light' ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              {displayUrl}
            </div>
          </div>

          {/* Screenshot Container */}
          <div
            className="flex-1 rounded-xl overflow-hidden relative aspect-[16/9]"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={image}
                src={image}
                alt={`${title} screenshot`}
                className="w-full h-full object-cover object-top block pointer-events-none select-none absolute inset-0"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardItem({ project, index, total, isActive }) {
  const { category, title, description, techStack, image, liveUrl, githubUrl } = project;

  return (
    <motion.div
      className="w-full md:w-screen h-full flex flex-col md:flex-row items-center justify-center absolute top-0 left-0 pt-10 md:pt-0"
      style={{
        background: 'var(--bg-primary)',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 10 : 0,
      }}
      variants={{
        hidden: { opacity: 0, transition: { duration: 0.5 } },
        visible: { opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 } },
      }}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
    >
      <div className="container-custom w-full h-full flex flex-col md:flex-row items-center gap-6 md:gap-14 lg:gap-24">
        
        {/* Left Info Panel */}
        <motion.div
          className="relative flex flex-col justify-center gap-6 w-full md:w-[48%] shrink-0 order-2 md:order-1 pb-4 md:pb-8"
        >
          {/* Category with bottom underline line */}
          <p
            className="font-[Space_Grotesk,sans-serif] font-semibold text-[16px] md:text-[18px] tracking-wide border-b w-fit pb-1"
            style={{ color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
          >
            {category}
          </p>

          {/* Title Heading */}
          <h3
            className="font-[Space_Grotesk,sans-serif] font-bold text-[36px] md:text-[48px] lg:text-[56px] uppercase leading-none tracking-widest cursor-target w-fit"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
            <span
              className="md:hidden text-[16px] pl-4 tracking-wider font-extrabold font-[Space_Grotesk,sans-serif]"
              style={{ color: 'var(--text-muted)', verticalAlign: 'top' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </h3>

          {/* Description Paragraph */}
          <p
            className="font-[Space_Grotesk,sans-serif] font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed md:tracking-wide [word-spacing:2px] hyphens-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="cursor-target font-[Space_Grotesk,sans-serif] font-semibold text-[12px] md:text-[13px] px-[12px] py-1.5 rounded-[6px] tracking-wide"
                style={{ border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap gap-4 pt-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none cursor-target flex items-center gap-2.5 font-[Space_Grotesk,sans-serif] font-bold text-[15px] md:text-[17px] py-3.5 px-7 rounded-[8px] transition-all hover:scale-105 active:scale-95"
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', boxShadow: '0 6px 20px var(--shadow-btn)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none cursor-target flex items-center gap-2.5 font-[Space_Grotesk,sans-serif] font-bold text-[15px] md:text-[17px] py-3.5 px-7 rounded-[8px] transition-all border hover:scale-105 active:scale-95"
                style={{
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: '0 6px 20px var(--shadow-btn)',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Source
              </a>
            )}
          </div>

          {/* Corner Counter */}
          <span
            className="cursor-target hidden md:flex items-baseline absolute bottom-6 right-0 font-[Space_Grotesk,sans-serif] font-extrabold leading-none select-none"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="text-[50px]">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-[20px]">/{String(total).padStart(2, '0')}</span>
          </span>
        </motion.div>

        {/* Mobile Right Screenshot Container */}
        <div className="w-full md:w-[55%] shrink-0 order-1 md:order-2 flex items-center justify-center">
          <div
            className="cursor-target w-full overflow-hidden rounded-xl md:hidden"
            style={{ border: '3px solid var(--border)', boxShadow: '0 8px 40px var(--shadow-color)', maxHeight: '65vh' }}
          >
            <img
              src={image}
              alt={`${title} screenshot`}
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="lazy"
              style={{ display: 'block', maxHeight: '65vh' }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { threshold: 0.2, once: true });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (val) => {
    const idx = Math.min(Math.floor(val * PROJECTS_DATA.length), PROJECTS_DATA.length - 1);
    if (idx !== activeIndex && idx >= 0) {
      setActiveIndex(idx);
    }
  });

  return (
    <section id="projects" className="pt-25 md:pt-30 lg:pt-[150px]" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container-custom">
        <div ref={headerRef}>
          <SectionHeader
            label="MY WORK"
            headingLines={['FEATURED', 'PROJECTS']}
            description="Through these projects, I showcase my ability to build production-ready applications that are scalable, performant, and designed to deliver meaningful real-world impact."
            inView={headerInView}
          />
        </div>
      </div>

      {/* Scroll-Pinned Sticky Container */}
      <div ref={sectionRef} className="relative w-full" style={{ height: `${(PROJECTS_DATA.length + 1) * 100}vh` }}>
        <div className="sticky top-0 w-full flex items-center justify-center overflow-hidden h-screen">
          
          {/* Card Items Stack */}
          {PROJECTS_DATA.map((proj, idx) => (
            <ProjectCardItem
              key={proj.id}
              project={proj}
              index={idx}
              total={PROJECTS_DATA.length}
              isActive={activeIndex === idx}
            />
          ))}

          {/* Desktop Right Screenshot Overlay Container */}
          <div className="hidden md:flex absolute top-0 left-0 w-full h-full pointer-events-none z-20 pt-10 md:pt-0">
            <div className="container-custom w-full h-full flex flex-col md:flex-row items-center gap-5 md:gap-12 lg:gap-20">
              <div className="w-full md:w-[45%] shrink-0" />
              <div className="w-full md:w-[55%] shrink-0 flex items-center justify-center pointer-events-auto">
                <ProjectBrowserFrame
                  image={PROJECTS_DATA[activeIndex].image}
                  title={PROJECTS_DATA[activeIndex].title}
                  liveUrl={PROJECTS_DATA[activeIndex].liveUrl}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
