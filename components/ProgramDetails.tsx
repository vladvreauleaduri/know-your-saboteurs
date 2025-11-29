
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Map, Calendar, Trophy, ArrowRight, X } from 'lucide-react';

import { SABOTEURS } from '../constants';
import { SaboteurType, AssessmentResult, Theme } from '../types';
import { getSaboteurFace, DoodleStar, DoodleCoil } from '../Illustrations';
import SpiderChart from './SpiderChart';
import WaitingListForm from './WaitingListForm';

interface ProgramDetailsProps {
    results: AssessmentResult;
    onBack: () => void;
    theme: Theme;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ results, onBack, theme }) => {
    const [selectedSaboteur, setSelectedSaboteur] = useState<SaboteurType | null>(null);

    const hasResults = Object.keys(results).length > 0;
    const sortedSaboteurs = useMemo(() => {
        if (!hasResults) return Object.values(SABOTEURS);
        return Object.values(SABOTEURS).sort((a, b) => (results[b.type] || 0) - (results[a.type] || 0));
    }, [results]);

    const phases = [
        {
            title: "Discovery Phase",
            duration: "4 Weeks",
            icon: <Map className="w-6 h-6" />,
            color: "bg-sketch-slate",
            desc: "Uncover the root causes of your self-sabotage. We dive deep into the neural pathways that trigger your Saboteurs and start building your Jedi reflexes."
        },
        {
            title: "Testing & Calibration",
            duration: "3 Weeks",
            icon: <Calendar className="w-6 h-6" />,
            color: "bg-sketch-ochre",
            desc: "Put your new mental muscles to the test. Real-world scenarios, feedback loops, and adjusting your strategies to ensure lasting change."
        },
        {
            title: "Challenges",
            duration: "2 Weeks",
            icon: <Trophy className="w-6 h-6" />,
            color: "bg-sketch-rust",
            desc: "Intensive 'Boss Battles' against your top Saboteurs. Solidify your Sage powers and graduate with a renewed operating system."
        }
    ];

    const handleKeyDown = (e: React.KeyboardEvent, type: SaboteurType) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedSaboteur(type);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto"
        >
            <button 
                onClick={onBack} 
                className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-slate focus-visible:ring-offset-2 rounded-lg dark:focus-visible:ring-offset-[#121212]"
            >
                <ChevronLeft size={20} /> Back to Results
            </button>

            <div className="text-center mb-16">
                 <h1 className="text-4xl md:text-6xl font-black font-display text-gray-900 dark:text-white mb-4">
                    The <span className="text-sketch-slate">Program</span> Details
                 </h1>
                 <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    A comprehensive journey to master your mind and silence the inner critics.
                 </p>
            </div>

            {/* User Report Summary (If they have results) */}
            {hasResults && (
                <div className="mb-20 bg-white dark:bg-[#202020] rounded-[2.5rem] p-8 md:p-12 shadow-xl border-2 border-gray-200 dark:border-[#333] relative overflow-hidden">
                    <DoodleStar className="absolute top-10 right-10 w-24 h-24 text-sketch-ochre opacity-20 rotate-12" />
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="w-full md:w-1/3 h-[300px]">
                            <SpiderChart 
                                data={Object.values(SaboteurType).map(t => ({ subject: t, A: results[t] || 0, fullMark: 10 }))} 
                                color="#5B86A8" 
                                theme={theme} 
                            />
                        </div>
                        <div className="w-full md:w-2/3 text-left">
                            <h2 className="text-3xl font-black font-display mb-4 text-gray-900 dark:text-white">Your Personal Saboteur Landscape</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Based on your assessment, your mind is primarily influenced by the 
                                <strong className="text-sketch-rust mx-1">{sortedSaboteurs[0].type}</strong> 
                                and 
                                <strong className="text-sketch-ochre mx-1">{sortedSaboteurs[1].type}</strong>. 
                                The program is customized to target these specific patterns.
                            </p>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-gray-100 dark:bg-[#333] rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300">
                                    Total Saboteurs Active: {Object.values(results).filter(s => (s as number) > 5).length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* The Framework Timeline */}
            <div className="mb-24">
                <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12 text-gray-900 dark:text-white">The 3-Step Framework</h2>
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-gray-200 dark:bg-[#333] -translate-y-1/2 rounded-full z-0"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {phases.map((phase, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-[#202020] p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-[#333] flex flex-col items-center text-center relative overflow-hidden group"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${phase.color} text-white flex items-center justify-center shadow-lg mb-6 rotate-3 group-hover:rotate-12 transition-transform duration-300`}>
                                    {phase.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">{phase.title}</h3>
                                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#333] rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                    {phase.duration}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {phase.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Saboteur Library */}
            <div className="mb-24">
                <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-4 text-gray-900 dark:text-white">Saboteur Encyclopedia</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Tap on any card to reveal full details, characteristics, and lies.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedSaboteurs.map((sab) => (
                        <motion.div
                            key={sab.type}
                            onClick={() => setSelectedSaboteur(sab.type)}
                            onKeyDown={(e) => handleKeyDown(e, sab.type)}
                            role="button"
                            tabIndex={0}
                            className={`
                                cursor-pointer bg-white dark:bg-[#202020] rounded-3xl p-6 shadow-md hover:shadow-xl border-2 border-transparent hover:border-${sab.color === '#C05746' ? 'red-500' : 'gray-200'} transition-all duration-300 group
                                ${results[sab.type] && results[sab.type] > 7 ? 'ring-2 ring-offset-2 ring-sketch-rust dark:ring-offset-[#121212]' : ''}
                                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sketch-slate focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#121212]
                            `}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-[#333] p-2 group-hover:scale-110 transition-transform duration-300">
                                    {getSaboteurFace(sab.type, "w-full h-full", sab.color)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{sab.type}</h3>
                                    {hasResults && (
                                        <div className="text-sm font-medium text-gray-500">Your Score: {results[sab.type] || 0}/10</div>
                                    )}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                {sab.description}
                            </p>
                            <div className="mt-4 flex items-center text-sketch-slate font-bold text-sm">
                                Read Full Profile <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Waiting List Section */}
            <div id="waitlist" className="bg-gray-900 dark:bg-black rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
                 <DoodleCoil className="absolute top-10 left-10 w-32 text-gray-700 dark:text-[#333] opacity-30" />
                 <DoodleStar className="absolute bottom-10 right-10 w-24 text-gray-700 dark:text-[#333] opacity-30 rotate-12" />
                 
                 <div className="relative z-10 max-w-2xl mx-auto">
                     <h2 className="text-3xl md:text-5xl font-black font-display text-white mb-6">
                        Ready to Quiet the Noise?
                     </h2>
                     <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                        Join the waiting list for our next cohort. Get exclusive tips, early access to new tools, and a spot in the Upskill Dojo.
                     </p>
                     
                     <WaitingListForm />
                     
                     <p className="mt-6 text-sm text-gray-500 font-medium">
                        No spam. Just pure mental fitness.
                     </p>
                 </div>
            </div>

            {/* Detailed Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                    {selectedSaboteur && (
                        <motion.div 
                           className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto p-4"
                        >
                             <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedSaboteur(null)}
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                className="w-full max-w-3xl h-auto max-h-[85vh] bg-white dark:bg-[#202020] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative z-10"
                            >
                                <div className="relative h-32 md:h-48 shrink-0 overflow-hidden">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: SABOTEURS[selectedSaboteur].color }}></div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedSaboteur(null); }}
                                        className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white dark:bg-black/20 dark:hover:bg-black/40 rounded-full transition-colors z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-white"
                                        aria-label="Close details"
                                    >
                                        <X size={24} className="text-gray-900 dark:text-white" />
                                    </button>
                                    <div className="absolute -bottom-12 -right-12 w-64 h-64 opacity-20 rotate-12 pointer-events-none">
                                        {getSaboteurFace(selectedSaboteur, "w-full h-full", SABOTEURS[selectedSaboteur].color)}
                                    </div>
                                    <div className="absolute bottom-6 left-8">
                                        <h2 className="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white">
                                            {selectedSaboteur}
                                        </h2>
                                    </div>
                                </div>
                                
                                <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                    <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-8 leading-relaxed">
                                        {SABOTEURS[selectedSaboteur].description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl">
                                            <h3 className="font-bold text-sketch-rust dark:text-red-400 mb-4 flex items-center gap-2">
                                                <span className="text-xl">🤥</span> The Lies
                                            </h3>
                                            <ul className="space-y-3">
                                                {SABOTEURS[selectedSaboteur].lies.map((lie, i) => (
                                                    <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 italic">
                                                        <span className="text-red-400">"</span>
                                                        {lie}
                                                        <span className="text-red-400">"</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl">
                                            <h3 className="font-bold text-sketch-slate dark:text-blue-400 mb-4 flex items-center gap-2">
                                                <span className="text-xl">🧐</span> Characteristics
                                            </h3>
                                            <ul className="space-y-3">
                                                {SABOTEURS[selectedSaboteur].characteristics.map((char, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-sketch-slate mt-2 shrink-0"></span>
                                                        {char}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {hasResults && (
                                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#333] text-center">
                                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Your Assessment Score</p>
                                            <div className="text-4xl font-black font-display text-gray-900 dark:text-white">
                                                {results[selectedSaboteur] || 0}<span className="text-xl text-gray-400">/10</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProgramDetails;
