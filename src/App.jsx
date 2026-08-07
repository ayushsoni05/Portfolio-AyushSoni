import { lazy, Suspense, useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import PrepzoMono from './components/Prepzo/PrepzoMono';

const Services = lazy(() => import('./components/Services/Services'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const TechStack = lazy(() => import('./components/TechStack/TechStack'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Contact = lazy(() => import('./components/Contact/Contact'));

function MainContent() {
  const { theme } = useTheme();
  const cursorColor = theme === 'dark' ? '#ffffff' : '#000000';
  const [startHero, setStartHero] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    return window.location.pathname.toLowerCase().includes('prepzo') ? 'prepzo' : 'portfolio';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.toLowerCase().includes('prepzo')) {
        setViewMode('prepzo');
      } else {
        setViewMode('portfolio');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (viewMode === 'prepzo') {
    return (
      <div className="relative">
        <button
          onClick={() => {
            window.history.pushState({}, '', '/');
            setViewMode('portfolio');
          }}
          className="fixed top-6 right-6 z-[999] px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-full shadow-2xl transition-all flex items-center gap-2 cursor-pointer font-mono"
        >
          ← Back to Portfolio
        </button>
        <PrepzoMono />
      </div>
    );
  }

  return (
    <SmoothScroll>
      {!loaderFinished && (
        <Preloader
          onExitStart={() => setStartHero(true)}
          onComplete={() => setLoaderFinished(true)}
        />
      )}

      <CustomCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        hoverDuration={0.2}
        parallaxOn={true}
        cursorColor={cursorColor}
        cursorColorOnTarget={cursorColor}
      />

      {/* Floating Toggle Button to View Prepzo MONO Landing Page */}
      <button
        onClick={() => {
          window.history.pushState({}, '', '/prepzo');
          setViewMode('prepzo');
        }}
        className="cursor-target fixed top-6 right-24 z-[99] px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold text-xs rounded-full shadow-2xl transition-all flex items-center gap-2 border border-white/20 hover:scale-105 font-mono cursor-pointer"
        title="View Prepzo MONO Landing Page Replica"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Prepzo MONO Site
      </button>

      <Navbar />

      <main>
        <Hero startAnimation={loaderFinished || startHero} />

        <Suspense fallback={null}>
          <Services />
          <Projects />
          <TechStack />
          <Experience />
          <Contact />
        </Suspense>
      </main>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
