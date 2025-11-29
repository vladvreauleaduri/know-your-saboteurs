import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SaboteurType } from '../types';
import { SABOTEURS } from '../constants';
import { getSaboteurFace, DoodleArrow, DoodleStar, DoodleCoil, DoodleUnderline } from '../Illustrations';

interface HeroProps {
    onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    // Floating animation variants
    const float = (delay: number) => ({
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 5,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    });

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-12 relative overflow-hidden"
        >
            {/* Background Doodles & Faces */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-20">
                <motion.div animate={float(0)} className="absolute top-[15%] left-[10%] w-24 md:w-32 text-gray-900 dark:text-white">
                    {getSaboteurFace(SaboteurType.Controller, "w-full h-full", SABOTEURS[SaboteurType.Controller].color)}
                </motion.div>
                <motion.div animate={float(2)} className="absolute bottom-[20%] left-[5%] w-20 md:w-28 text-gray-900 dark:text-white">
                    {getSaboteurFace(SaboteurType.Pleaser, "w-full h-full", SABOTEURS[SaboteurType.Pleaser].color)}
                </motion.div>
                <motion.div animate={float(1)} className="absolute top-[20%] right-[10%] w-28 md:w-36 text-gray-900 dark:text-white">
                    {getSaboteurFace(SaboteurType.HyperAchiever, "w-full h-full", SABOTEURS[SaboteurType.HyperAchiever].color)}
                </motion.div>
                <motion.div animate={float(3)} className="absolute bottom-[15%] right-[15%] w-24 md:w-32 text-gray-900 dark:text-white">
                    {getSaboteurFace(SaboteurType.Stickler, "w-full h-full", SABOTEURS[SaboteurType.Stickler].color)}
                </motion.div>
                 
                {/* Random Scribbles */}
                <DoodleCoil className="absolute top-1/2 left-[15%] w-16 text-sketch-slate opacity-50" />
                <DoodleStar className="absolute bottom-[10%] right-[40%] w-12 text-sketch-ochre opacity-50" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 relative inline-block"
                >
                    <h1 className="text-6xl md:text-8xl font-black font-display text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                        Who is driving<br/>
                        <span className="relative inline-block mt-2">
                             your mind?
                             <DoodleUnderline className="absolute -bottom-4 left-0 w-full h-6 text-sketch-rust" />
                        </span>
                    </h1>
                </motion.div>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                    Uncover the hidden voices holding you back. <br className="hidden md:block"/>
                    A fun, guided journey to self-discovery.
                </p>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center relative z-10">
                    <div className="relative inline-block">
                        <button 
                            onClick={onStart}
                            className="relative z-10 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all duration-200 flex items-center gap-3 border-2 border-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sketch-rust focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#121212]"
                        >
                            Start Now
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        <DoodleArrow className="absolute -bottom-16 -right-24 w-24 h-16 text-gray-400 -rotate-12 hidden md:block" />
                        <span className="absolute -bottom-12 -right-48 text-sm font-display text-gray-500 -rotate-6 hidden md:block">Takes 5 mins!</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-24 w-full max-w-5xl overflow-hidden">
                <div className="flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                   {[SaboteurType.Judge, SaboteurType.Victim, SaboteurType.Restless, SaboteurType.HyperRational].map((type) => (
                       <div key={type} className="w-16 h-16 md:w-20 md:h-20">
                          {getSaboteurFace(type, "w-full h-full", SABOTEURS[type].color)}
                       </div>
                   ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Hero;