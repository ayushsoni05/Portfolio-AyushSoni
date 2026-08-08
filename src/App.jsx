import { lazy, Suspense, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import TechStack from './components/TechStack/TechStack';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';

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
