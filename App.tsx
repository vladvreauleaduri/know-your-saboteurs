
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AssessmentResult, Theme } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import Results from './components/Results';
import ProgramDetails from './components/ProgramDetails';

// --- Main App Logic ---

enum AppState {
  Hero = 'hero',
  Quiz = 'quiz',
  Results = 'results',
  ProgramDetails = 'program_details'
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [appState, setAppState] = useState<AppState>(AppState.Hero);
  const [results, setResults] = useState<AssessmentResult>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleStart = () => {
    setAppState(AppState.Quiz);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (scores: AssessmentResult) => {
    setResults(scores);
    setAppState(AppState.Results);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setResults({});
    setAppState(AppState.Hero);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProgramDetails = () => {
    setAppState(AppState.ProgramDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleLogoClick = () => {
    setAppState(AppState.Hero);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#121212] transition-colors duration-300 font-sans overflow-x-hidden selection:bg-sketch-ochre selection:text-white flex flex-col relative">
      
      {/* Flashlight/Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: theme === 'dark' 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(230, 93, 77, 0.08), transparent 40%)`
            : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(230, 93, 77, 0.05), transparent 40%)`,
        }}
      />

      <Header theme={theme} toggleTheme={toggleTheme} onLogoClick={handleLogoClick} />
      
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {appState === AppState.Hero && (
            <Hero key="hero" onStart={handleStart} />
          )}
          {appState === AppState.Quiz && (
            <Quiz key="quiz" onComplete={handleComplete} />
          )}
          {appState === AppState.Results && (
            <Results key="results" results={results} onRetake={handleRetake} onProgramDetails={handleProgramDetails} theme={theme} />
          )}
          {appState === AppState.ProgramDetails && (
              <ProgramDetails key="program" results={results} onBack={() => {
                  if (Object.keys(results).length > 0) {
                      setAppState(AppState.Results);
                  } else {
                      setAppState(AppState.Hero);
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }} theme={theme} />
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
