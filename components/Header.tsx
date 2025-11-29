
import React from 'react';
import { Theme } from '../types';
import { SaboteurLogo } from '../Illustrations';
import LightSwitch from './LightSwitch';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onLogoClick }) => (
  <header className="fixed top-0 w-full z-50 bg-[#FDFBF7]/95 dark:bg-[#121212]/95 backdrop-blur-sm border-b-2 border-gray-200 dark:border-[#333] transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 relative flex items-center justify-between">
      {/* Left: App Name */}
      <button 
        className="flex items-center space-x-3 cursor-pointer group flex-1 justify-start z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-rust focus-visible:ring-offset-4 rounded-lg dark:focus-visible:ring-offset-[#121212]" 
        onClick={onLogoClick}
        aria-label="Go to Home"
      >
        <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-gray-100 whitespace-nowrap">
          Know Your <span className="text-sketch-rust">Saboteurs</span>
        </span>
      </button>
      
      {/* Center: Composite Logo (Absolutely centered) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
         <button 
            onClick={onLogoClick} 
            className="flex items-center justify-center cursor-pointer group rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sketch-rust focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
            aria-label="Go to Home"
         >
            <SaboteurLogo className="w-20 h-20 md:w-24 md:h-24 group-hover:scale-105 transition-transform duration-300 drop-shadow-md" />
         </button>
      </div>
      
      {/* Right: Theme Switch */}
      <div className="flex items-center justify-end flex-1 z-10">
        <LightSwitch theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  </header>
);

export default Header;
