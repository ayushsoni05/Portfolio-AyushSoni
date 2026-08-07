import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Prepzo Images Array ---
const HERO_IMAGES = [
  { position: 'left', src: '/assets/fullstack.avif', alt: 'Prepzo Full-Stack AI Platform', span: 1 },
  { position: 'left', src: '/assets/realtime.avif', alt: 'Real-Time AI Mock Interview Drill', span: 1 },
  { position: 'center', src: '/assets/project1.png', alt: 'Prepzo Dashboard Workspace', span: 2 },
  { position: 'right', src: '/assets/api.avif', alt: 'ATS Resume Scoring & Analytics', span: 1 },
  { position: 'right', src: '/assets/scalability.avif', alt: 'System Design Architecture', span: 1 },
];

const PREPZO_TIERS = [
  {
    name: 'Core Accelerator',
    tagline: 'Essential AI Resume & ATS Keyword Optimization',
    features: ['Structured JSON Resume Parsing', 'ATS Keyword Match Score', '70+ Resume Rubric Checks', 'Standard Practice Drills'],
    badge: 'Starter',
  },
  {
    name: 'Pro Interviewer',
    tagline: 'Real-Time Voice & Code AI Mock Interviews',
    features: ['Interactive Voice & Speech Analytics', 'Live Code Execution Sandbox', 'System Design Whiteboard', 'Detailed Audio Feedback'],
    badge: 'Popular',
  },
  {
    name: 'Enterprise Placement',
    tagline: 'Full Placement Cell & Hiring Management System',
    features: ['University Cohort Analytics', 'Custom Enterprise Test Suites', 'Automated ELO Leaderboards', 'Dedicated Support Manager'],
    badge: 'Enterprise',
  },
];

const SIGNALS = [
  { label: 'DSA Speed', score: '98/100', color: 'from-blue-500/20 to-indigo-500/20' },
  { label: 'System Design', score: '95/100', color: 'from-purple-500/20 to-pink-500/20' },
  { label: 'Clean Code', score: '99/100', color: 'from-emerald-500/20 to-teal-500/20' },
  { label: 'Communication', score: '92/100', color: 'from-amber-500/20 to-orange-500/20' },
  { label: 'Problem Solving', score: '97/100', color: 'from-cyan-500/20 to-blue-500/20' },
  { label: 'Debugging Speed', score: '94/100', color: 'from-rose-500/20 to-red-500/20' },
  { label: 'SQL Optimization', score: '96/100', color: 'from-violet-500/20 to-purple-500/20' },
  { label: 'Behavioral Score', score: '93/100', color: 'from-lime-500/20 to-green-500/20' },
];

const STATS = [
  { label: 'Active Beta Users', value: '50+' },
  { label: 'Interview Drills', value: '300+' },
  { label: 'Placement Success', value: '98%' },
  { label: 'Prep Speedup', value: '10x' },
];

// --- 1. Floating Pill Navbar Component ---
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-300">
      <div
        className={`flex items-center justify-between px-4 py-2.5 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 pl-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          PREPZO
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Overview
          </a>
          <a href="#tiers" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Tiers
          </a>
          <a href="#signals" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Signals
          </a>
          <a href="#stats" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Impact
          </a>
          <a href="#about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            About
          </a>
        </nav>

        {/* Action CTA Button */}
        <a
          href="https://github.com/ayushsoni05/Prepzo"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 text-xs md:text-sm font-semibold tracking-wide transition-all rounded-full bg-white text-black hover:bg-zinc-200"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}

// --- 2. Hero Section (5-Image Cluster + 35vw Wordmark Parallax) ---
function HeroSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const totalScrollable = containerRef.current.offsetHeight - viewportHeight;
    const currentScroll = Math.max(0, -rect.top);
    const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          handleScroll();
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  // Exact Transform calculations matching MONO
  const centerWidth = 20 + 80 * scrollProgress; // 20% to 100%
  const sideWidth = (100 - centerWidth) / 2;
  const leftX = -sideWidth * (1 - scrollProgress);
  const rightX = sideWidth * (1 - scrollProgress);
  const translateY = 150 * scrollProgress;
  const opacity = 1 - Math.min(1, Math.max(0, (scrollProgress - 0.7) / 0.3));
  const wordmarkOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.3));

  const leftPanels = HERO_IMAGES.filter((img) => img.position === 'left');
  const rightPanels = HERO_IMAGES.filter((img) => img.position === 'right');
  const centerPanel = HERO_IMAGES.find((img) => img.position === 'center');

  return (
    <section id="hero" className="bg-black text-white relative">
      <div ref={containerRef} className="relative" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <div className="relative flex h-full w-full items-stretch justify-center">
            {/* Left Cluster */}
            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: '12px',
                transform: `translateX(${leftX}%) translateY(${translateY}px)`,
                opacity,
              }}
            >
              {leftPanels.map((img, idx) => (
                <div key={idx} className="relative h-full overflow-hidden flex-1">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Center Expanding Panel with 35vw Wordmark Revealed */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{ width: `${centerWidth}%`, height: '100%', flex: '0 0 auto' }}
            >
              {/* Giant 35vw Wordmark PREPZO */}
              <div
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: wordmarkOpacity, transform: 'translateY(-120px)' }}
              >
                <h1 className="whitespace-nowrap text-[32vw] font-black leading-none tracking-tighter text-zinc-900 uppercase font-mono select-none">
                  {'PREPZO'.split('').map((char, idx) => (
                    <span
                      key={idx}
                      className="inline-block"
                      style={{
                        animationDelay: `${0.08 * idx}s`,
                        transition: 'all 1.5s cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Center Panel Image */}
              <img
                src={centerPanel?.src || '/assets/project1.png'}
                alt="Prepzo Workspace Dashboard"
                className="absolute inset-0 z-10 w-full h-full object-cover"
              />
            </div>

            {/* Right Cluster */}
            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: '12px',
                transform: `translateX(${rightX}%) translateY(${translateY}px)`,
                opacity,
              }}
            >
              {rightPanels.map((img, idx) => (
                <div key={idx} className="relative h-full overflow-hidden flex-1">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Overlay Text */}
        <div
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 px-6 pb-12 md:px-12 md:pb-16 text-center transition-opacity"
          style={{ opacity: wordmarkOpacity }}
        >
          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-zinc-300 md:text-3xl lg:text-[2.2rem]">
            AI-powered career acceleration <br /> and placement readiness platform.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- 3. TracksSection ("Surface Options" Pricing Marquee Cards) ---
function TracksSection() {
  const duplicatedTiers = [...PREPZO_TIERS, ...PREPZO_TIERS, ...PREPZO_TIERS];

  return (
    <section id="tiers" className="bg-black py-24 text-white border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold">PLACEMENT TIERS</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3">Tailored Acceleration Tracks</h2>
      </div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden relative w-full">
        <motion.div
          className="flex gap-8 shrink-0 py-4"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          {duplicatedTiers.map((tier, idx) => (
            <div
              key={idx}
              className="w-[340px] md:w-[400px] shrink-0 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {tier.badge}
                  </span>
                  <span className="text-zinc-600 text-sm font-mono">TRACK 0{ (idx % 3) + 1 }</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{tier.name}</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{tier.tagline}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://github.com/ayushsoni05/Prepzo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm font-semibold text-center transition-all block"
              >
                Explore Track
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- 4. TickerSection (Endless Banner Sentence Marquee) ---
function TickerSection() {
  return (
    <section className="bg-zinc-950 py-8 border-y border-zinc-900 overflow-hidden select-none">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex text-2xl md:text-4xl font-black uppercase tracking-tighter text-zinc-700 font-mono"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        >
          <span className="mr-8">
            AI MOCK INTERVIEWS • REAL-TIME VOICE FEEDBACK • ATS RESUME SCORING • SYSTEM DESIGN DRILLS • PLACEMENT ACCELERATOR • DATA STRUCTURES & ALGORITHMS • AI CAREER COACH • 
          </span>
          <span className="mr-8">
            AI MOCK INTERVIEWS • REAL-TIME VOICE FEEDBACK • ATS RESUME SCORING • SYSTEM DESIGN DRILLS • PLACEMENT ACCELERATOR • DATA STRUCTURES & ALGORITHMS • AI CAREER COACH • 
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// --- 5. SignalsSection (Assessment Signals Gallery) ---
function SignalsSection() {
  return (
    <section id="signals" className="bg-black py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold">SKILL BENCHMARKS</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3">Comprehensive Assessment Signals</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
        {SIGNALS.map((sig, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl bg-gradient-to-br ${sig.color} border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105`}
          >
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">SIGNAL 0{idx + 1}</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-4">{sig.label}</h4>
            <div className="flex items-baseline justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-zinc-400 font-mono">Accuracy</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">{sig.score}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 6. EditorialSection (Video / Gradient Panel + 4 Stat Grid) ---
function EditorialSection() {
  return (
    <section id="stats" className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Parallax Media Banner */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-zinc-800 mb-12 group">
          <img
            src="/assets/fullstack.avif"
            alt="Prepzo Architectural System"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-center justify-center p-8 text-center">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Engineered for candidates aiming for top tier tech placements.
            </h3>
          </div>
        </div>

        {/* 4 Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900">
          {STATS.map((stat, idx) => (
            <div key={idx} className="border-b md:border-b-0 border-r border-zinc-900 p-8 text-center last:border-r-0">
              <p className="mb-2 text-xs uppercase tracking-widest text-zinc-500 font-mono">{stat.label}</p>
              <p className="font-bold text-emerald-400 text-5xl font-mono">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 7. TestimonialsSection (Pull Quote Banner) ---
function TestimonialsSection() {
  return (
    <section id="about" className="bg-black py-28 text-white relative border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="text-5xl text-emerald-400 font-serif leading-none block mb-6">“</span>
        <blockquote className="text-2xl md:text-4xl font-medium leading-relaxed tracking-tight text-zinc-200">
          An AI-driven career platform combining interactive interview drills with real-time feedback — engineered for engineers who refuse to compromise on their career trajectory.
        </blockquote>
        <div className="mt-8">
          <p className="font-bold text-white text-lg">Ayush Soni</p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono mt-1">Creator & Full-Stack Architect of Prepzo</p>
        </div>
      </div>
    </section>
  );
}

// --- 8. FooterSection ---
function FooterSection() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-zinc-900">
        <div className="col-span-2">
          <a href="#hero" className="text-2xl font-bold text-white tracking-tight font-mono">PREPZO</a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
            Next-Generation AI Career & Placement Acceleration Platform. Master Technical Interviews, ATS Resume Parsing, and System Design.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold text-white uppercase tracking-widest font-mono">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#hero" className="hover:text-white transition-colors">Overview</a></li>
            <li><a href="#tiers" className="hover:text-white transition-colors">Tiers</a></li>
            <li><a href="#signals" className="hover:text-white transition-colors">Signals</a></li>
            <li><a href="#stats" className="hover:text-white transition-colors">Impact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold text-white uppercase tracking-widest font-mono">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="https://github.com/ayushsoni05/Prepzo" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Source</a></li>
            <li><a href="https://leetcode.com/ayush_soni" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LeetCode Drills</a></li>
            <li><a href="https://www.linkedin.com/in/ayush-soni05" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold text-white uppercase tracking-widest font-mono">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 font-mono">
        <p>© 2026 PREPZO — Created by Ayush Soni. All rights reserved.</p>
        <p className="mt-2 md:mt-0">MONO-Structure Architecture Replica</p>
      </div>
    </footer>
  );
}

// --- MAIN PREPZO MONO LANDING PAGE ASSEMBLY ---
export default function PrepzoMono() {
  return (
    <div className="bg-black text-white selection:bg-emerald-500 selection:text-black font-sans min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <TracksSection />
        <TickerSection />
        <SignalsSection />
        <EditorialSection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </div>
  );
}
