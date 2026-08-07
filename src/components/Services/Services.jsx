import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const SERVICES_DATA = [
  {
    id: 1,
    number: '01',
    title: 'Full-Stack Web Development',
    description: 'Building modern, responsive web applications with React, Node.js, Express, MongoDB, and scalable architectures.',
    image: '/assets/fullstack.avif',
  },
  {
    id: 2,
    number: '02',
    title: 'Real-Time Web Applications',
    description: 'Developing low-latency chat, collaboration, and live data platforms using WebSockets and Socket.IO.',
    image: '/assets/realtime.avif',
  },
  {
    id: 3,
    number: '03',
    title: 'Frontend Development',
    description: 'Creating fast, accessible, and interactive user interfaces with React, Next.js, Tailwind CSS, and modern JavaScript.',
    image: '/assets/frontend.avif',
  },
  {
    id: 4,
    number: '04',
    title: 'Backend & API Development',
    description: 'Designing secure REST APIs, authentication systems, databases, and scalable backend services using Node.js and Express.',
    image: '/assets/api.avif',
  },
  {
    id: 5,
    number: '05',
    title: 'Performance Optimization & Scalability',
    description: 'Optimizing applications for speed, scalability, efficient rendering, caching, and seamless user experiences.',
    image: '/assets/scalability.avif',
  },
];

// Infinite repeated array for smooth carousel looping
const REPEATED_SERVICES = [
  ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA,
  ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA,
  ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA,
  ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA,
  ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA,
];

const INITIAL_INDEX = SERVICES_DATA.length * 3;

function ServiceCard({ service, mobileWidth, isDragging }) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });

  return (
    <div
      className="select-none cursor-target relative shrink-0 flex flex-col overflow-hidden w-[280px] md:w-[386px] h-full transition-colors duration-300 border border-[var(--border)] hover:border-[var(--text-primary)] rounded-xl"
      style={{
        width: mobileWidth ? `${mobileWidth}px` : undefined,
        background: 'var(--bg-secondary)',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          mx: `${e.clientX - rect.left}px`,
          my: `${e.clientY - rect.top}px`,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial Gradient Hover Spotlight */}
      {hovered && !isDragging && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, ${
              theme === 'dark' ? 'rgba(255, 255, 255, 0.112)' : 'rgba(0, 0, 0, 0.08)'
            }, transparent 60%)`,
            zIndex: 20,
          }}
          aria-hidden="true"
        />
      )}

      {/* Image Header */}
      <div
        className="w-full overflow-hidden flex justify-center items-center shrink-0"
        style={{ height: 200 }}
      >
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className={`object-contain select-none pointer-events-none ${
              service.id === 3 ? 'w-[70%] h-[70%]' : 'w-[80%] h-[80%]'
            }`}
            style={{ filter: 'drop-shadow(0 16px 16px var(--shadow-color))' }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-[11px] tracking-widest uppercase"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
          >
            Image coming soon
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 md:px-8 pb-20 flex flex-col flex-1 items-center text-center">
        <h3
          className="font-[Space_Grotesk,sans-serif] font-bold text-[20px] md:text-[23px] leading-tight mb-5"
          style={{ color: 'var(--text-primary)' }}
        >
          {service.title}
        </h3>
        <p
          className="font-[Space_Grotesk,sans-serif] text-[14px] md:text-[15px] leading-[1.7] tracking-wider pt-5 [word-spacing:2px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {service.description}
        </p>
      </div>

      {/* Card Number */}
      <span
        className="absolute bottom-5 right-5 font-[Space_Grotesk,sans-serif] font-light text-4xl md:text-5xl lg:text-[50px] leading-none select-none pointer-events-none"
        style={{ color: 'var(--text-muted)' }}
      >
        {service.number}
      </span>
    </div>
  );
}

export default function Services() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { threshold: 0.2, once: true });
  
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { threshold: 0.1 });

  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isPaused, setIsPaused] = useState(false);
  const [animState, setAnimState] = useState('idle');

  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(280);
  const [stepSize, setStepSize] = useState(296);

  const controls = useAnimation();

  useEffect(() => {
    if (isDesktop) return;
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCardWidth(width);
        setStepSize(width + 16);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isDesktop]);

  useEffect(() => {
    if (reducedMotion || isPaused || animState !== 'idle') return;
    const timer = setInterval(() => {
      setAnimState('autoScrolling');
      setCurrentIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, [reducedMotion, isPaused, animState]);

  useEffect(() => {
    if (sectionInView) {
      setAnimState('jumping');
      setCurrentIndex(INITIAL_INDEX);
    }
  }, [sectionInView]);

  const handleAnimationComplete = () => {
    if (animState === 'dragging') return;
    if (animState === 'jumping') {
      setAnimState('idle');
      return;
    }
    const totalItems = SERVICES_DATA.length;
    const minBound = totalItems * 3;
    const maxBound = totalItems * 4 - 1;

    if (currentIndex < minBound || currentIndex > maxBound) {
      const resetIndex = ((currentIndex % totalItems) + totalItems) % totalItems + minBound;
      setAnimState('jumping');
      setCurrentIndex(resetIndex);
    } else {
      setAnimState('idle');
    }
  };

  const handleDragStart = () => {
    setAnimState('dragging');
  };

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) < 2 && Math.abs(info.velocity.x) < 2) {
      setAnimState('idle');
      return;
    }
    setAnimState('snapping');
    const step = isDesktop ? 426 : stepSize;
    const projectedOffset = info.offset.x + info.velocity.x * 0.35;
    let cardDelta = -Math.round(projectedOffset / step);

    if (cardDelta > 10) cardDelta = 10;
    if (cardDelta < -10) cardDelta = -10;

    setCurrentIndex((prev) => prev + cardDelta);
  };

  const targetX = currentIndex * (isDesktop ? 426 : stepSize);

  useEffect(() => {
    if (animState !== 'dragging') {
      controls.start({
        x: -targetX,
        transition:
          reducedMotion || animState === 'jumping'
            ? { duration: 0 }
            : animState === 'snapping'
            ? { type: 'spring', stiffness: 70, damping: 20, mass: 1 }
            : { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      });
    }
  }, [targetX, animState, reducedMotion, controls]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative pt-0 lg:pt-[100px] overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-custom">
        <div ref={headerRef} className="mb-16 md:mb-24">
          <SectionHeader
            label="MY EXPERTISE"
            headingLines={["WHAT I'M", 'OFFERING']}
            description="I build modern full-stack web applications with fast, responsive frontends, scalable backend APIs, and real-time features. Every solution is optimized for performance, reliability, and exceptional user experience."
            inView={headerInView}
          />
        </div>
      </div>

      <div className="container-custom relative flex justify-center items-stretch pt-15 md:pt-20">
        <div
          className="flex flex-col justify-center w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div ref={containerRef} className="overflow-hidden w-full h-full">
            <motion.div
              ref={carouselRef}
              className="flex gap-4 md:gap-10 h-full items-stretch"
              drag="x"
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              initial={{ x: -targetX }}
              animate={controls}
              onAnimationComplete={handleAnimationComplete}
            >
              {REPEATED_SERVICES.map((serv, idx) => (
                <ServiceCard
                  key={`${serv.id}-${idx}`}
                  service={serv}
                  mobileWidth={isDesktop ? null : cardWidth}
                  isDragging={animState === 'dragging' || animState === 'snapping'}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
