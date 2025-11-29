
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface LightSwitchProps {
  theme: Theme;
  toggleTheme: () => void;
}

const LightSwitch: React.FC<LightSwitchProps> = ({ theme, toggleTheme }) => {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white dark:bg-[#333] shadow-md border border-gray-200 dark:border-[#444] flex items-center justify-center transition-colors relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-rust focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
                aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {theme === 'light' ? (
                        <motion.div
                            key="sun"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun className="w-6 h-6 text-sketch-ochre fill-sketch-ochre" />
                        </motion.div>
                    ) : (
                         <motion.div
                            key="moon"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon className="w-6 h-6 text-sketch-slate fill-sketch-slate" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}

export default LightSwitch;
