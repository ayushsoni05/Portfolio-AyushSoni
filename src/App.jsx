import { lazy, Suspense, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

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
