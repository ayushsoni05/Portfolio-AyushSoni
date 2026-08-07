import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// React Icons Imports
import {
  SiPython, SiC, SiCplusplus, SiHtml5, SiJavascript, SiNextdotjs, SiTypescript,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiMysql, SiThreedotjs,
  SiPrisma, SiDocker, SiIntellijidea, SiPostman, SiGit, SiGithub, SiFigma,
  SiMarkdown, SiRender, SiPostgresql, SiSupabase, SiVercel, SiVite,
  SiFlask, SiDjango, SiRedis, SiOpencv, SiNumpy, SiJsonwebtokens,
  SiUbuntu, SiReactrouter, SiAuth0, SiNutanix
} from 'react-icons/si';
import { FaJava, FaCss3Alt, FaAws, FaShieldHalved } from 'react-icons/fa6';

// --- Custom Individual SVG Icons ---

// GitHub Actions Workflow Icon
function CustomGHActions({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// OpenAI Flower Icon
function CustomOpenAI({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.281 9.77a6.071 6.071 0 0 0-.518-4.945 6.082 6.082 0 0 0-4.326-3.042A6.08 6.08 0 0 0 12.4.52a6.084 6.084 0 0 0-4.945.518A6.082 6.082 0 0 0 4.413 5.36 6.08 6.08 0 0 0 2.65 9.42a6.084 6.084 0 0 0 .518 4.945 6.082 6.082 0 0 0 4.326 3.042 6.08 6.08 0 0 0 5.038 1.264 6.084 6.084 0 0 0 4.945-.518 6.082 6.082 0 0 0 3.042-4.326 6.08 6.08 0 0 0 1.762-4.057zm-9.356 12.78a4.558 4.558 0 0 1-2.905-1.042l.142-.082 4.847-2.798a.776.776 0 0 0 .388-.672v-6.837l2.046 1.181a.077.077 0 0 1 .039.067v5.626a4.57 4.57 0 0 1-4.557 4.557zm-8.869-4.887a4.558 4.558 0 0 1-.555-3.043l.142.085 4.847 2.798a.776.776 0 0 0 .776 0l5.921-3.419v2.363a.077.077 0 0 1-.039.067l-4.872 2.813a4.57 4.57 0 0 1-6.22-1.664zm-1.127-10.15A4.558 4.558 0 0 1 5.28 4.67l.002.165v5.597a.776.776 0 0 0 .388.672l5.921 3.419-2.046 1.181a.077.077 0 0 1-.078 0L4.595 13.09a4.57 4.57 0 0 1-1.664-6.22zm16.596 3.084l-5.921-3.419 2.046-1.181a.077.077 0 0 1 .078 0l4.872 2.813a4.57 4.57 0 0 1 1.664 6.22 4.558 4.558 0 0 1-2.35 2.848l-.002-.165v-5.597a.776.776 0 0 0-.387-.672zm2.254-4.23a4.558 4.558 0 0 1 .555 3.043l-.142-.085-4.847-2.798a.776.776 0 0 0-.776 0l-5.921 3.419V7.635a.077.077 0 0 1 .039-.067l4.872-2.813a4.57 4.57 0 0 1 6.22 1.664zM9.41 8.877l2.046-1.181a.077.077 0 0 1 .078 0l4.872 2.813a4.57 4.57 0 0 1 1.664 6.22 4.558 4.558 0 0 1-2.35-2.848l.002.165v5.597a.776.776 0 0 0-.388.672l-5.921-3.419v-7.519z" />
    </svg>
  );
}

// Google Gemini Star Icon
function CustomGemini({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.93 4.68-.96 2.19-2.58 3.81t-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.93a12.3 12.3 0 0 1 3.81 2.58 12.3 12.3 0 0 1 2.55 3.81z" />
    </svg>
  );
}

// Socket.io Icon
function CustomSocketIO({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128">
      <g fill="currentColor" fillRule="evenodd">
        <path d="M63.951.001C28.696.001.001 28.696.001 63.951s28.695 63.95 63.95 63.95 63.95-28.695 63.95-63.95S99.206.001 63.95.001zm0 10.679c29.484 0 53.272 23.787 53.272 53.271 0 29.485-23.788 53.272-53.272 53.272-29.484 0-53.272-23.787-53.272-53.272 0-29.484 23.788-53.271 53.272-53.271z" />
        <path d="M48.39 60.716c14.004-11.44 27.702-23.278 42.011-34.384-7.505 11.533-15.224 22.913-22.729 34.445-6.437.03-12.875.03-19.282-.061zM60.228 67.092c6.468 0 12.905 0 19.342.092-14.095 11.38-27.732 23.309-42.071 34.384 7.505-11.533 15.224-22.943 22.729-34.476z" />
      </g>
    </svg>
  );
}

// Zustand Bear Head Icon
function CustomZustand({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 7c.83 0 1.5.67 1.5 1.5S9.83 12 9 12s-1.5-.67-1.5-1.5S8.17 9 9 9zm6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
    </svg>
  );
}

// React Three Fiber Atom + Cube Icon
function CustomR3F({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// SQLAlchemy Database Flame Icon
function CustomSQLAlchemy({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.5 5 5 8.5 5 13a7 7 0 0 0 14 0c0-4.5-4.5-8-7-11zm0 16a4 4 0 0 1-4-4c0-2.2 2-4.5 4-6 2 1.5 4 3.8 4 6a4 4 0 0 1-4 4z"/>
    </svg>
  );
}

// Passport.js Authentication Badge Key Icon
function CustomPassport({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 8c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/>
    </svg>
  );
}

// MediaPipe Neural Landmark Grid Icon
function CustomMediaPipe({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="4" r="2.5" />
      <circle cx="4" cy="12" r="2.5" />
      <circle cx="20" cy="12" r="2.5" />
      <circle cx="12" cy="20" r="2.5" />
      <path d="M12 6.5v11M6.5 12h11M7.5 7.5l9 9M16.5 7.5l-9 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Nutanix AOS Storage Cluster Icon
function CustomNutanixAOS({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="17" width="18" height="4" rx="1" />
      <circle cx="7" cy="5" r="1" fill="var(--bg-primary)" />
      <circle cx="7" cy="12" r="1" fill="var(--bg-primary)" />
      <circle cx="7" cy="19" r="1" fill="var(--bg-primary)" />
    </svg>
  );
}

// AHV Hypervisor Virtual Machine Shield Icon
function CustomAHV({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v6H9V9z" />
    </svg>
  );
}

// Prism Central Control Hub Diamond Icon
function CustomPrismCentral({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l9 9-9 9-9-9 9-9zm0 3.5L5.5 11 12 16.5 18.5 11 12 5.5z" />
    </svg>
  );
}

// Speakeasy 2FA Key Lock Icon
function CustomSpeakeasy({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  );
}

// Custom Icons Registry
const CUSTOM_ICONS = {
  CustomGHActions,
  CustomOpenAI,
  CustomGemini,
  CustomSocketIO,
  CustomZustand,
  CustomR3F,
  CustomSQLAlchemy,
  CustomPassport,
  CustomMediaPipe,
  CustomNutanixAOS,
  CustomAHV,
  CustomPrismCentral,
  CustomSpeakeasy,
};

const SI_ICONS = {
  SiPython, SiC, SiCplusplus, SiHtml5, SiJavascript, SiNextdotjs, SiTypescript,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiMysql, SiThreedotjs,
  SiPrisma, SiDocker, SiIntellijidea, SiPostman, SiGit, SiGithub, SiFigma,
  SiMarkdown, SiRender, SiPostgresql, SiSupabase, SiVercel, SiVite,
  SiFlask, SiDjango, SiRedis, SiOpencv, SiNumpy, SiJsonwebtokens,
  SiUbuntu, SiReactrouter, SiAuth0, SiNutanix
};

const FA_ICONS = {
  FaJava, FaCss3Alt, FaAws, FaShieldHalved
};

function getIconComponent(iconName, iconPkg) {
  if (iconPkg === 'custom') return CUSTOM_ICONS[iconName] || null;
  if (iconPkg === 'si') return SI_ICONS[iconName] || null;
  if (iconPkg === 'fa6') return FA_ICONS[iconName] || null;
  return null;
}

// 44 Unique Tech Items matching 3-Row target layout (14-15 per row) with individual brand icons
const TECH_ITEMS = [
  // --- ROW 1: Languages & Core Web ---
  { name: 'C', iconName: 'SiC', iconPkg: 'si' },
  { name: 'C++', iconName: 'SiCplusplus', iconPkg: 'si' },
  { name: 'Java', iconName: 'FaJava', iconPkg: 'fa6' },
  { name: 'Python', iconName: 'SiPython', iconPkg: 'si' },
  { name: 'JavaScript', iconName: 'SiJavascript', iconPkg: 'si' },
  { name: 'TypeScript', iconName: 'SiTypescript', iconPkg: 'si' },
  { name: 'HTML5', iconName: 'SiHtml5', iconPkg: 'si' },
  { name: 'CSS3', iconName: 'FaCss3Alt', iconPkg: 'fa6' },
  { name: 'React 19', iconName: 'SiReact', iconPkg: 'si' },
  { name: 'Next.js', iconName: 'SiNextdotjs', iconPkg: 'si' },
  { name: 'Vite', iconName: 'SiVite', iconPkg: 'si' },
  { name: 'Tailwind CSS', iconName: 'SiTailwindcss', iconPkg: 'si' },
  { name: 'Zustand', iconName: 'CustomZustand', iconPkg: 'custom' },
  { name: 'Three.js', iconName: 'SiThreedotjs', iconPkg: 'si' },
  { name: 'React Three Fiber', iconName: 'CustomR3F', iconPkg: 'custom' },

  // --- ROW 2: Backend, Databases & AI ---
  { name: 'Node.js', iconName: 'SiNodedotjs', iconPkg: 'si' },
  { name: 'Express.js', iconName: 'SiExpress', iconPkg: 'si' },
  { name: 'Flask', iconName: 'SiFlask', iconPkg: 'si' },
  { name: 'Django REST', iconName: 'SiDjango', iconPkg: 'si' },
  { name: 'SQLAlchemy', iconName: 'CustomSQLAlchemy', iconPkg: 'custom' },
  { name: 'Passport.js (OAuth 2.0)', iconName: 'CustomPassport', iconPkg: 'custom' },
  { name: 'MongoDB (Mongoose)', iconName: 'SiMongodb', iconPkg: 'si' },
  { name: 'MySQL', iconName: 'SiMysql', iconPkg: 'si' },
  { name: 'Redis', iconName: 'SiRedis', iconPkg: 'si' },
  { name: 'Socket.io (WebSockets)', iconName: 'CustomSocketIO', iconPkg: 'custom' },
  { name: 'OpenAI API', iconName: 'CustomOpenAI', iconPkg: 'custom' },
  { name: 'Google Gemini Pro', iconName: 'CustomGemini', iconPkg: 'custom' },
  { name: 'OpenCV', iconName: 'SiOpencv', iconPkg: 'si' },
  { name: 'MediaPipe', iconName: 'CustomMediaPipe', iconPkg: 'custom' },
  { name: 'NumPy', iconName: 'SiNumpy', iconPkg: 'si' },

  // --- ROW 3: Cloud, Infrastructure, Security & DevOps ---
  { name: 'AWS Cloud', iconName: 'FaAws', iconPkg: 'fa6' },
  { name: 'Nutanix Architecture (HCI)', iconName: 'SiNutanix', iconPkg: 'si' },
  { name: 'Nutanix AOS', iconName: 'CustomNutanixAOS', iconPkg: 'custom' },
  { name: 'AHV Hypervisor', iconName: 'CustomAHV', iconPkg: 'custom' },
  { name: 'Prism Central', iconName: 'CustomPrismCentral', iconPkg: 'custom' },
  { name: 'JWT', iconName: 'SiJsonwebtokens', iconPkg: 'si' },
  { name: 'BcryptJS', iconName: 'FaShieldHalved', iconPkg: 'fa6' },
  { name: 'Speakeasy (2FA/MFA)', iconName: 'CustomSpeakeasy', iconPkg: 'custom' },
  { name: 'Docker', iconName: 'SiDocker', iconPkg: 'si' },
  { name: 'GitHub Actions (CI/CD)', iconName: 'CustomGHActions', iconPkg: 'custom' },
  { name: 'Git', iconName: 'SiGit', iconPkg: 'si' },
  { name: 'GitHub', iconName: 'SiGithub', iconPkg: 'si' },
  { name: 'Postman', iconName: 'SiPostman', iconPkg: 'si' },
  { name: 'Linux (Ubuntu)', iconName: 'SiUbuntu', iconPkg: 'si' },
  { name: 'Markdown', iconName: 'SiMarkdown', iconPkg: 'si' },
];

// --- Magnet Proximity Component ---
function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 5,
  activeTransition = 'transform 0.8s ease-out',
  inactiveTransition = 'transform 0.8s ease-in-out',
}) {
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (disabled) {
      setPos({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);

      if (dx < rect.width / 2 + padding && dy < rect.height / 2 + padding) {
        setIsActive(true);
        setPos({
          x: (e.clientX - cx) / magnetStrength,
          y: (e.clientY - cy) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  const transition = isActive ? activeTransition : inactiveTransition;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// --- Tech Badge Component (1:1 Exact Specs) ---
function TechBadge({ tech, isNearest, reduced, onRef }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  const IconComp = getIconComponent(tech.iconName, tech.iconPkg);

  return (
    <Magnet disabled={reduced || !isNearest}>
      <div
        ref={onRef}
        aria-label={tech.name}
        onClick={() => setClicked(true)}
        className="group relative cursor-target flex h-[56px] w-[56px] items-center justify-center cursor-none"
        style={{ color: 'var(--text-primary)' }}
      >
        {IconComp && <IconComp size={36} />}

        {/* Hover / Click Tooltip */}
        <span
          className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 transition-opacity duration-300 whitespace-nowrap rounded-[6px] text-[13px] font-medium font-[Space_Grotesk,sans-serif] ${
            clicked ? 'opacity-100 delay-0' : 'opacity-0 md:group-hover:opacity-100 md:group-hover:delay-300'
          }`}
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)',
            boxShadow: '0 4px 14px var(--shadow-color)',
            zIndex: 50
          }}
        >
          {tech.name}
        </span>
      </div>
    </Magnet>
  );
}

const NEAREST_COUNT = 8;

export default function TechStack() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { threshold: 0.2, once: true });

  const itemRefs = useRef([]);
  const rafId = useRef(null);
  const mousePos = useRef({ x: -9999, y: -9999 });

  const [nearestSet, setNearestSet] = useState(new Set());

  const handleRef = useCallback((el, index) => {
    itemRefs.current[index] = el;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setNearestSet(new Set());
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          const { x, y } = mousePos.current;

          const distances = itemRefs.current.map((el, i) => {
            if (!el) return { i, dist: Infinity };
            const rect = el.getBoundingClientRect();
            const dx = x - (rect.left + rect.width / 2);
            const dy = y - (rect.top + rect.height / 2);
            return { i, dist: dx * dx + dy * dy };
          });

          distances.sort((a, b) => a.dist - b.dist);
          const topSet = new Set(distances.slice(0, NEAREST_COUNT).map((d) => d.i));

          setNearestSet((prev) => {
            if (prev.size !== topSet.size) return topSet;
            for (let item of topSet) {
              if (!prev.has(item)) return topSet;
            }
            return prev;
          });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  const gridVariants = { hidden: {}, visible: {} };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (customIndex) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: customIndex * 0.06 + 0.1 },
    }),
  };

  return (
    <section id="skills" className="pt-5 md:pt-0" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-custom">
        <div ref={headerRef}>
          <SectionHeader
            label="MY TECH STACK"
            headingLines={['WHAT I', 'USE']}
            description="I utilize a comprehensive suite of modern technologies to build robust, scalable, and high-performance digital solutions."
            inView={headerInView}
          />
        </div>

        {/* Grid Container with 44 Individual Unique Brand Icons */}
        <motion.div
          className="flex flex-wrap gap-8 justify-center pt-15 md:pt-20"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TECH_ITEMS.map((tech, idx) => {
            const customIdx = Math.min(idx, TECH_ITEMS.length - 1 - idx);
            return (
              <motion.div key={`${tech.name}-${idx}`} variants={itemVariants} custom={customIdx}>
                <TechBadge
                  tech={tech}
                  isNearest={nearestSet.has(idx)}
                  reduced={reducedMotion}
                  onRef={(el) => handleRef(el, idx)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
