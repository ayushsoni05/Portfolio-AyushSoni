import { useState, useRef } from 'react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ContainerScroll, CardSticky } from '@/components/ui/cards-stack';

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
    role: 'Senior Secondary (RBSE -- Class XII)',
    company: 'Ornate EduSystem',
    jobType: 'Didwana, Rajasthan',
    duration: { start: 'Apr 2021', end: 'Apr 2022' },
    points: [
      'Completed Senior Secondary Education (Class 12th RBSE Board) with specialization in Physics, Chemistry, and Mathematics (PCM).',
      'Developed strong analytical, calculus, coordinate geometry, and logical problem-solving fundamentals serving as the foundation for Data Structures & Algorithms.',
      'Achieved outstanding academic performance across Mathematics and Physical Sciences in Rajasthan state board examinations.',
      'Actively participated in regional mathematics olympiads, science exhibitions, and competitive problem-solving seminars.'
    ],
    techStack: ['Mathematics (Calculus & Algebra)', 'Physics', 'Chemistry', 'Problem Solving', 'Analytical Logic']
  },
  {
    id: 'edu-3',
    role: 'Secondary (CBSE -- Class X)',
    company: 'Swami Vivekanand Govt. Model School',
    jobType: 'Didwana, Rajasthan',
    duration: { start: 'Apr 2019', end: 'Apr 2020' },
    points: [
      'Graduated Secondary Education (Class 10th CBSE Board) with high academic distinction and top grades across all core subjects.',
      'Formed strong foundational knowledge in Computer Applications, Information Technology, General Science, and Mathematics.',
      'Recognized for active leadership and participation in school-level STEM projects, science fairs, and introductory computer programming workshops.',
      'Secured top positions in inter-school mathematics quizzes, science talent searches, and logical reasoning competitions.'
    ],
    techStack: ['Mathematics', 'Computer Foundations', 'Information Technology', 'Science', 'Logic']
  }
];

const CERTIFICATIONS = [
  {
    id: 'cert-1',
    title: 'IBM Generative AI Engineering',
    issuer: 'IBM Certification',
    year: '2024',
    badge: 'AI & LLM Architecture',
    accentColor: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(15, 23, 42, 0.95))',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    description: 'Mastered Large Language Models (LLMs), Prompt Engineering, RAG (Retrieval-Augmented Generation) architectures, fine-tuning generative models, and deploying autonomous AI agents with LangChain & Python.',
    skills: ['Generative AI', 'LLMs', 'RAG Architecture', 'Prompt Engineering', 'LangChain', 'Python AI'],
    icon: '🤖',
    image: '/assets/cert-ibm-genai.jpg'
  },
  {
    id: 'cert-2',
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta Certified Professional',
    year: '2024',
    badge: 'Frontend Engineering',
    accentColor: '#60a5fa',
    bgGradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(15, 23, 42, 0.95))',
    borderColor: 'rgba(96, 165, 250, 0.4)',
    description: 'Advanced React 19 component architecture, state management with Redux & Zustand, responsive UI/UX design patterns, web application performance tuning, accessibility (WCAG), and Jest E2E testing.',
    skills: ['React 19', 'JavaScript (ES6+)', 'Redux & Zustand', 'UI/UX Architecture', 'CSS3 & Tailwind', 'Jest Testing'],
    icon: '⚛️',
    image: '/assets/cert-meta-frontend.jpg'
  },
  {
    id: 'cert-3',
    title: 'IBM Python for Data Science & AI',
    issuer: 'IBM Certification',
    year: '2023',
    badge: 'Data Science & Machine Learning',
    accentColor: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(24, 24, 27, 0.95))',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    description: 'In-depth specialization in Python programming, numerical data processing with NumPy, data manipulation with Pandas, computer vision modeling with OpenCV, and RESTful API integrations.',
    skills: ['Python 3', 'NumPy', 'Pandas', 'OpenCV', 'REST APIs', 'Data Analysis'],
    icon: '🐍',
    image: '/assets/cert-ibm-python.jpg'
  },
  {
    id: 'cert-4',
    title: 'Cisco JavaScript Essentials 1 & 2',
    issuer: 'Cisco Networking Academy',
    year: '2023',
    badge: 'Core Language Mechanics',
    accentColor: '#c084fc',
    bgGradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(24, 24, 27, 0.95))',
    borderColor: 'rgba(192, 132, 252, 0.4)',
    description: 'Comprehensive mastery of JavaScript core engine mechanics, asynchronous control flow (Promises, async/await), DOM APIs, closure encapsulation, prototype inheritance, and security best practices.',
    skills: ['JavaScript ES6+', 'Async / Await', 'DOM API', 'OOP Concepts', 'Web Security', 'Algorithms'],
    icon: '⚡',
    image: '/assets/cert-cisco-js.jpg'
  },
  {
    id: 'cert-5',
    title: 'Infosys DBMS Fundamentals',
    issuer: 'Infosys Certification',
    year: '2023',
    badge: 'Database Engineering',
    accentColor: '#2dd4bf',
    bgGradient: 'linear-gradient(135deg, rgba(45, 212, 191, 0.15), rgba(15, 23, 42, 0.95))',
    borderColor: 'rgba(45, 212, 191, 0.4)',
    description: 'Relational database architecture, advanced SQL query design, database normalization (1NF-3NF), indexing strategies, transaction ACID compliance, and MySQL performance optimization.',
    skills: ['Relational DBMS', 'SQL Query Tuning', 'Database Normalization', 'ACID Properties', 'MySQL', 'Indexing'],
    icon: '🛢️',
    image: '/assets/cert-infosys-dbms.jpg'
  }
];

function CenteredTabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="mb-8 md:mb-10 flex justify-center w-full pt-10">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <button
          onClick={() => setActiveTab('experience')}
          className={`cursor-target cursor-none font-[Space_Grotesk,sans-serif] text-[16px] md:text-[22px] font-bold tracking-widest uppercase transition-all duration-300 ${
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
          className={`cursor-target cursor-none font-[Space_Grotesk,sans-serif] text-[16px] md:text-[22px] font-bold tracking-widest uppercase transition-all duration-300 ${
            activeTab === 'education'
              ? 'text-[var(--text-primary)] opacity-100 scale-105'
              : 'text-[var(--text-secondary)] opacity-40 hover:opacity-80 blur-[0.5px]'
          }`}
        >
          EDUCATION
        </button>
        <span className="text-[var(--text-muted)] text-[18px] select-none">•</span>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`cursor-target cursor-none font-[Space_Grotesk,sans-serif] text-[16px] md:text-[22px] font-bold tracking-widest uppercase transition-all duration-300 ${
            activeTab === 'certifications'
              ? 'text-[var(--text-primary)] opacity-100 scale-105'
              : 'text-[var(--text-secondary)] opacity-40 hover:opacity-80 blur-[0.5px]'
          }`}
        >
          CERTIFICATIONS
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

{/* --- Certifications: image cards with hover-to-reveal description --- */}
function CertificationsStack() {
  const { theme } = useTheme();

  return (
    <div className="w-full pt-10 md:pt-16 pb-20">
      <div className="grid md:grid-cols-2 md:gap-10 xl:gap-16">
        {/* LEFT — Sticky info panel */}
        <div className="left-0 top-0 md:sticky md:h-svh md:py-12 mb-8 md:mb-0">
          <p
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            verified credentials
          </p>
          <h2
            className="mb-6 mt-4 text-3xl md:text-4xl font-bold tracking-tight font-[Space_Grotesk,sans-serif]"
            style={{ color: 'var(--text-primary)' }}
          >
            Professional{' '}
            <span style={{ color: '#60a5fa' }}>Certifications</span>
          </h2>
          <p
            className="max-w-prose text-sm md:text-base leading-relaxed font-[Space_Grotesk,sans-serif]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Industry credentials from IBM, Meta, Cisco, and Infosys — validating
            technical mastery across AI Engineering, Frontend Development, Data
            Science, and Database Engineering. Hover over a card to see details.
          </p>
        </div>

        {/* RIGHT — Scrolling card stack with 400vh runway */}
        <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
          {CERTIFICATIONS.map((cert, index) => (
            <CardSticky
              key={cert.id}
              index={index + 2}
              incrementY={30}
              incrementZ={8}
              className="group cursor-target overflow-hidden shadow-lg transition-all duration-300"
              style={{
                borderRadius: '18px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 25px 60px var(--shadow-color), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
              }}
            >
              {/* ── Mac Browser Top Bar ── */}
              <div
                className="flex items-center relative shrink-0 h-[42px] md:h-[46px] px-[14px] md:px-[18px]"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderBottom: theme === 'light' ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                }}
              >
                {/* Traffic Dot Buttons */}
                <div className="flex absolute left-[14px] md:left-[18px] gap-[7px] md:gap-[9px]">
                  <span className="w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[50%]" style={{ backgroundColor: '#ff5f56' }} />
                  <span className="w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[50%]" style={{ backgroundColor: '#ffbd2e' }} />
                  <span className="w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[50%]" style={{ backgroundColor: '#27c93f' }} />
                </div>

                {/* Domain Pill — cert issuer */}
                <div
                  className="flex items-center justify-center h-[26px] md:h-[28px] rounded-[8px] text-[12px] md:text-[14px] font-semibold py-3 px-4 md:px-5 max-w-[60%] whitespace-nowrap overflow-hidden text-ellipsis tracking-wide font-[Space_Grotesk,sans-serif]"
                  style={{
                    margin: '0 auto',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-strong)',
                    color: theme === 'light' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {cert.issuer}
                </div>
              </div>

              {/* ── Certificate Image + Hover Overlay ── */}
              <div className="relative w-full aspect-[3/2] overflow-hidden m-[14px] mt-0 rounded-xl" style={{ width: 'calc(100% - 28px)', border: '1px solid var(--border-strong)' }}>
                {/* Certificate image */}
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Index number badge — always visible */}
                <div
                  className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md"
                  style={{
                    backgroundColor: 'rgba(9, 9, 11, 0.7)',
                    border: `1px solid ${cert.borderColor}`,
                  }}
                >
                  <span className="text-sm md:text-base font-bold font-mono" style={{ color: cert.accentColor }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Hover overlay — slides up from bottom */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(to top, rgba(9, 9, 11, 0.97) 55%, rgba(9, 9, 11, 0.85) 75%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(250, 250, 250, 0.97) 55%, rgba(250, 250, 250, 0.85) 75%, transparent 100%)',
                  }}
                >
                  {/* Title + Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-lg">{cert.icon}</span>
                    <h3 className="text-base md:text-lg font-bold font-[Space_Grotesk,sans-serif]" style={{ color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h3>
                    <span
                      className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                      style={{ color: cert.accentColor, borderColor: cert.borderColor, backgroundColor: `${cert.accentColor}15` }}
                    >
                      {cert.badge}
                    </span>
                  </div>

                  {/* Issuer + Year */}
                  <p className="text-xs font-mono mb-2" style={{ color: cert.accentColor }}>
                    {cert.issuer} • {cert.year}
                  </p>

                  {/* Description */}
                  <p className="text-[13px] md:text-sm leading-relaxed mb-3 font-[Space_Grotesk,sans-serif]" style={{ color: 'var(--text-secondary)' }}>
                    {cert.description}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[10px] md:text-[11px] font-[Space_Grotesk,sans-serif] font-medium rounded border"
                        style={{
                          color: 'var(--text-secondary)',
                          borderColor: 'var(--border)',
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>
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

  const getHeadingLines = () => {
    if (activeTab === 'experience') return ['WORK', 'EXPERIENCE'];
    if (activeTab === 'education') return ['EDUCATION &', 'ACADEMICS'];
    return ['VERIFIED', 'CERTIFICATIONS'];
  };

  const getDescription = () => {
    if (activeTab === 'experience') {
      return 'A timeline of my professional experience, showcasing the internships, projects, and real-world engineering challenges that have shaped my growth as a full-stack developer.';
    }
    if (activeTab === 'education') {
      return 'My academic background, highlighting the foundational knowledge and coursework that shapes my approach to software engineering.';
    }
    return 'Industry certifications and professional credentials validating my technical mastery across AI Engineering, Frontend Development, Data Science, and DBMS.';
  };

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
                headingLines={getHeadingLines()}
                description={getDescription()}
                inView={headerInView}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: cubicEase }}
          >
            {activeTab === 'certifications' ? (
              <CertificationsStack />
            ) : (
              <TimelineList data={data} />
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
