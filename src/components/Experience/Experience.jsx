import { useState, useRef } from 'react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const WORK_EXPERIENCE = [
  {
    id: 'exp-1',
    role: 'Full-Stack SDE & Competitive Programmer',
    company: 'Independent Projects & Open Source',
    jobType: 'Didwana, Rajasthan, India',
    duration: { start: 'Jan 2025', end: 'Present' },
    points: [
      'Architected and deployed 3 production-grade, AI-powered full-stack platforms (Prepzo, Glimmr, Hand Gesture Recognition) using React 19, TypeScript, Node.js, Python, Flask, MongoDB, and MySQL.',
      'Ranked Top 3 in Coding Ninjas Competitive Programming Contest among 200+ participants -- top 1.5% nationally.',
      'Solved 300+ DSA problems (Arrays, Trees, DP, Graphs) on LeetCode & CodeChef, applying algorithmic patterns directly across production codebases.',
      'Engineered real-time multiplayer WebSocket systems (Socket.io), ELO matchmaking, and LLM integrations (OpenAI API, Google Gemini Pro).',
      'Containerized full-stack microservices using Docker and automated GitHub Actions CI/CD pipelines on Linux (Ubuntu), maintaining 99.5% uptime.'
    ],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Python', 'Flask', 'MongoDB', 'MySQL', 'Socket.io', 'OpenAI', 'Gemini Pro', 'Docker', 'GitHub Actions']
  }
];

const EDUCATION = [
  {
    id: 'edu-1',
    role: 'Bachelor of Engineering in Computer Science Engineering (CGPA: 7.97 / 10.0)',
    company: 'Chitkara University',
    jobType: 'Baddi, Himachal Pradesh',
    duration: { start: 'Nov 2022', end: 'Jun 2026' },
    points: [
      'Pursuing a Bachelor of Engineering in Computer Science Engineering with an overall CGPA of 7.97 / 10.0.',
      'Core coursework includes Data Structures & Algorithms, Object-Oriented Programming (OOP), System Design, Database Management Systems (DBMS), Operating Systems, and Web Technologies.',
      'Certifications: IBM Generative AI Engineering, Meta Front-End Developer, IBM Python for Data Science & AI, Cisco JavaScript Essentials 1 & 2, Infosys DBMS Fundamentals.',
      'Shipped 3 production-deployed full-stack projects on Vercel with CI/CD pipelines while maintaining 7.97 CGPA.'
    ],
    techStack: ['DSA', 'OOP', 'System Design', 'DBMS', 'REST APIs', 'Nutanix HCI', 'AWS']
  },
  {
    id: 'edu-2',
    role: 'Senior Secondary (RBSE -- XII)',
    company: 'Ornate EduSystem',
    jobType: 'Didwana, Rajasthan',
    duration: { start: 'Apr 2021', end: 'Apr 2022' },
    points: [
      'Completed Senior Secondary education (Class 12th RBSE board) with focus on Science and Mathematics.',
      'Developed strong analytical, mathematical, and logical problem-solving fundamentals.'
    ],
    techStack: ['Mathematics', 'Physics', 'Chemistry', 'Logic']
  },
  {
    id: 'edu-3',
    role: 'Secondary (CBSE -- X)',
    company: 'Swami Vivekanand Govt. Model School',
    jobType: 'Didwana, Rajasthan',
    duration: { start: 'Apr 2019', end: 'Apr 2020' },
    points: [
      'Completed Secondary education (Class 10th CBSE board) with high academic distinction.',
      'Actively participated in STEM competitions and foundational computer science workshops.'
    ],
    techStack: ['Mathematics', 'Science', 'English', 'Computer Foundations']
  }
];

function CenteredTabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="mb-8 md:mb-10 flex justify-center w-full pt-10">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveTab('experience')}
          className={`cursor-target cursor-none font-[Space_Grotesk,sans-serif] text-[18px] md:text-[22px] font-bold tracking-widest uppercase transition-all duration-300 ${
            activeTab === 'experience'
              ? 'text-[var(--text-primary)] opacity-100 scale-105'
              : 'text-[var(--text-secondary)] opacity-40 hover:opacity-80 blur-[0.5px]'
          }`}
        >
          EXPERIENCE
        </button>
        <span className="text-[var(--text-muted)] text-[18px] select-none">•</span>
        <button
          onClick={() => setActiveTab('education')}
          className={`cursor-target cursor-none font-[Space_Grotesk,sans-serif] text-[18px] md:text-[22px] font-bold tracking-widest uppercase transition-all duration-300 ${
            activeTab === 'education'
              ? 'text-[var(--text-primary)] opacity-100 scale-105'
              : 'text-[var(--text-secondary)] opacity-40 hover:opacity-80 blur-[0.5px]'
          }`}
        >
          EDUCATION
        </button>
      </div>
    </div>
  );
}

function ExperienceCard({ item, inView }) {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ mx: '50%', my: '50%' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      mx: `${e.clientX - rect.left}px`,
      my: `${e.clientY - rect.top}px`,
    });
  };

  const cubicEase = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: cubicEase, staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicEase } },
  };

  return (
    <motion.div
      className="cursor-target rounded-2xl border border-[var(--border)] hover:border-[var(--text-primary)] shadow-lg hover:shadow-xl transition-all duration-300 p-7 md:p-11 lg:p-14 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bright Radial Spotlight Glow on Hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.mx} ${mousePos.my}, ${
              theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'
            }, transparent 60%)`,
            zIndex: 20,
          }}
          aria-hidden="true"
        />
      )}

      {/* Role Title */}
      <motion.h3
        variants={itemVariants}
        className="font-[Space_Grotesk,sans-serif] font-bold text-[28px] md:text-[36px] lg:text-[40px] pb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {item.role}
      </motion.h3>

      {/* Company & Job Type */}
      <motion.p
        variants={itemVariants}
        className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pb-6 text-[16px] md:text-[20px] lg:text-[22px]"
        style={{ color: 'var(--text-primary)' }}
      >
        <span className="font-[Space_Grotesk,sans-serif] font-medium">
          {item.company}
        </span>
        <span className="font-[Space_Grotesk,sans-serif] font-bold text-[20px] md:text-[26px]">
          •
        </span>
        <span className="font-[Space_Grotesk,sans-serif] font-medium">
          {item.jobType}
        </span>
      </motion.p>

      {/* Bullet List Points */}
      <motion.ul variants={itemVariants} className="list-disc list-outside pl-6 space-y-4 pb-8">
        {item.points.map((pt, idx) => (
          <motion.li
            key={idx}
            variants={itemVariants}
            className="font-[Space_Grotesk,sans-serif] font-normal text-[16px] md:text-[18px] lg:text-[19px] leading-[1.85] tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
          >
            {pt}
          </motion.li>
        ))}
      </motion.ul>

      {/* Tech Stack Badges */}
      {item.techStack && (
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="cursor-target inline-block px-[14px] py-[6px] text-[13px] md:text-[14px] font-[Space_Grotesk,sans-serif] font-semibold rounded-[6px] border tracking-wide"
              style={{ color: 'var(--text-secondary)', borderColor: 'var(--text-secondary)', borderWidth: '1px' }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function TimelineItem({ item }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.15, once: true });

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[minmax(220px,320px)_1fr] gap-0 md:gap-16 pb-20 md:pb-30">
      
      {/* Mobile Dot */}
      <div className="md:hidden absolute top-1.5 bottom-20 left-[-45px] w-[20px]">
        <div
          className="sticky top-32 w-[20px] h-[20px] rounded-full shrink-0 flex items-center justify-center"
          style={{ background: 'var(--timeline-dot)' }}
        >
          <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: 'var(--bg-primary)' }} />
        </div>
      </div>

      {/* Date & Sticky Desktop Dot Column */}
      <div className="mb-5 md:mb-0">
        <div className="md:sticky md:top-30 relative">
          <div
            className="hidden md:flex w-[20px] h-[20px] rounded-full shrink-0 absolute left-[-50px] top-1/2 -translate-y-1/2 items-center justify-center"
            style={{ background: 'var(--timeline-dot)' }}
          >
            <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: 'var(--bg-primary)' }} />
          </div>
          <p
            className="font-[Space_Grotesk,sans-serif] font-normal text-[25px] md:text-[40px] lg:text-[45px] leading-[1.2] pb-5"
            style={{ color: 'var(--text-secondary)' }}
          >
            {item.duration.start} –<br />
            {item.duration.end}
          </p>
        </div>
      </div>

      {/* Content Card Column with Mouse Spotlight Glow */}
      <div ref={ref}>
        <ExperienceCard item={item} inView={inView} />
      </div>

    </div>
  );
}

function TimelineList({ data }) {
  const reducedMotion = useReducedMotion();
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 5%', 'end center'],
  });

  const scaleY = reducedMotion ? 1 : scrollYProgress;
  const topOffset = isLg ? '58px' : isMd ? '52px' : '42px';

  return (
    <div ref={containerRef} className="relative pt-15 md:pt-20">
      {/* Masked Timeline Line */}
      <motion.div
        className="absolute w-[2.5px] origin-top"
        style={{
          left: '19px',
          top: topOffset,
          bottom: 0,
          background: 'var(--timeline-dot)',
          scaleY,
          maskImage: 'linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 120px), transparent calc(100% - 30px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 120px), transparent calc(100% - 30px), transparent 100%)',
        }}
      />

      <div className="pl-[55px] md:pl-[60px]">
        {data.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { threshold: 0.2, once: true });

  const data = activeTab === 'experience' ? WORK_EXPERIENCE : EDUCATION;
  const cubicEase = [0.22, 1, 0.36, 1];

  return (
    <section id="experience" className="pt-20 md:pt-30 lg:pt-[100px]" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-custom">
        {/* Centered Top Tab Switcher */}
        <CenteredTabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Section Header */}
        <div ref={headerRef} className="pt-5 md:pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: cubicEase }}
            >
              <SectionHeader
                label="MY JOURNEY"
                headingLines={activeTab === 'experience' ? ['WORK', 'EXPERIENCE'] : ['EDUCATION &', 'ACADEMICS']}
                description={
                  activeTab === 'experience'
                    ? 'A timeline of my professional experience, showcasing the internships, projects, and real-world engineering challenges that have shaped my growth as a full-stack developer.'
                    : 'My academic background, highlighting the foundational knowledge and coursework that shapes my approach to software engineering.'
                }
                inView={headerInView}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: cubicEase }}
          >
            <TimelineList data={data} />
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
