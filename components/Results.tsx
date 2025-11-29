
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, BrainCircuit, BookOpen, ChevronDown, Info, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { SABOTEURS } from '../constants';
import { SaboteurType, AssessmentResult, Theme } from '../types';
import { getSaboteurAnalysis } from '../services/geminiService';
import { getSaboteurFace, DoodleCoil, DoodleArrow } from '../Illustrations';
import SpiderChart from './SpiderChart';

interface ResultsProps {
    results: AssessmentResult;
    onRetake: () => void;
    onProgramDetails: () => void;
    theme: Theme;
}

const Results: React.FC<ResultsProps> = ({ results, onRetake, onProgramDetails, theme }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [expandedSaboteur, setExpandedSaboteur] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => {
    return Object.values(SaboteurType).map(type => ({
      subject: type,
      A: results[type] || 0,
      fullMark: 10,
    }));
  }, [results]);

  const topSaboteur = useMemo(() => {
    let max = -1;
    let type = SaboteurType.Judge;
    Object.entries(results).forEach(([key, val]) => {
      const score = val as number;
      if (score > max) {
        max = score;
        type = key as SaboteurType;
      }
    });
    return type;
  }, [results]);

  useEffect(() => {
    const fetchInsight = async () => {
      const topThree = Object.entries(results)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 3)
        .map(([type, score]) => ({ type: type as SaboteurType, score: score as number }));
      
      const text = await getSaboteurAnalysis(topThree);
      setAiAnalysis(text);
      setLoading(false);
    };
    fetchInsight();
  }, [results]);

  const info = SABOTEURS[topSaboteur];

  const toggleExpand = (key: string) => {
      setExpandedSaboteur(prev => prev === key ? null : key);
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);

    try {
        const element = printRef.current;
        const canvas = await html2canvas(element, {
            scale: 2, // Improve resolution
            useCORS: true,
            backgroundColor: theme === 'dark' ? '#121212' : '#FDFBF7',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('KnowYourSaboteurs-Report.pdf');

    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto"
    >
      <div ref={printRef} className="p-4 md:p-8 bg-[#FDFBF7] dark:bg-[#121212]">
        <div className="text-center mb-16 relative">
            <DoodleCoil className="absolute top-0 left-10 w-24 h-24 text-gray-200 dark:text-[#333] -rotate-45 hidden md:block" />
            
            <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 text-gray-900 dark:text-white relative"
            >
                {/* Dynamic color blob background based on result */}
                <div className="absolute inset-0 blur-3xl opacity-40 rounded-full scale-110" style={{ backgroundColor: info.color }}></div>
                {getSaboteurFace(topSaboteur, "w-full h-full relative z-10", info.color)}
            </motion.div>

            <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">You are being sabotaged by</h2>
            <h1 className="text-5xl md:text-7xl font-black font-display text-gray-900 dark:text-white mb-6">
                The <span style={{ color: info.color }}>{info.type}</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                {info.description}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Column: Data */}
            <div className="lg:col-span-5 space-y-8">
                <div className="bg-white dark:bg-[#202020] rounded-[2rem] p-6 shadow-xl border-2 border-gray-200 dark:border-[#333] relative overflow-hidden">
                    <div className="h-[300px] w-full relative z-10">
                        <SpiderChart data={data} color={info.color} theme={theme} />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#202020] rounded-[2rem] p-8 shadow-xl border-2 border-gray-200 dark:border-[#333]">
                    <h3 className="text-xl font-black font-display mb-6 dark:text-white flex items-center gap-2">
                        <span className="text-2xl">📋</span> Saboteur Lineup
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(SABOTEURS)
                            .sort((a, b) => (results[b[0]] || 0) - (results[a[0]] || 0))
                            .map(([key, sab]) => {
                            const score = results[key] || 0;
                            const isHigh = score > 5;
                            
                            return (
                            <div key={key} className="group border border-gray-200 dark:border-[#333] rounded-2xl transition-all duration-300 hover:shadow-md bg-transparent">
                                <button 
                                    onClick={() => toggleExpand(key)}
                                    className={`w-full flex justify-between items-center p-4 bg-white/50 dark:bg-[#333]/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#444] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-slate focus-visible:ring-inset ${expandedSaboteur === key ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                    aria-expanded={expandedSaboteur === key}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#444] p-1 shadow-sm border border-gray-100 dark:border-[#555]">
                                            {getSaboteurFace(sab.type, "w-full h-full", sab.color)}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200 leading-tight">{sab.type}</h4>
                                            <div className="w-24 h-1.5 mt-1 bg-gray-200 dark:bg-[#444] rounded-full overflow-hidden">
                                                <div className="h-full" style={{ width: `${((results[key] || 0) / 10) * 100}%`, backgroundColor: sab.color }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center gap-1.5 ${isHigh ? 'text-sketch-rust font-bold' : 'text-gray-500 dark:text-gray-400 font-bold'}`}>
                                            <span className="text-sm font-mono">
                                                {score}/10
                                            </span>
                                            
                                            <div 
                                                className="group/tooltip relative flex items-center"
                                                tabIndex={0}
                                                role="button"
                                                aria-label="Score info"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Info size={15} className={`cursor-help opacity-80 hover:opacity-100 focus:opacity-100 ${isHigh ? '' : 'text-gray-400 dark:text-gray-600'}`} />
                                                <div className="absolute bottom-full right-[-10px] mb-2 w-48 p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-xl shadow-xl opacity-0 group-hover/tooltip:opacity-100 group-focus/tooltip:opacity-100 transition-opacity pointer-events-none z-50 font-medium leading-relaxed border border-gray-100 dark:border-slate-200 text-left">
                                                    {isHigh 
                                                        ? "High involvement: This saboteur is involved in your daily activities or situations in general."
                                                        : "Low to Moderate involvement: This saboteur has limited influence on your daily life currently."
                                                    }
                                                    <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronDown 
                                            size={18} 
                                            className={`text-gray-400 transition-transform duration-300 ${expandedSaboteur === key ? 'rotate-180' : ''}`} 
                                        />
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedSaboteur === key && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 bg-white dark:bg-[#202020] border-t border-gray-100 dark:border-[#333] text-sm rounded-b-2xl">
                                                <div className="mb-4">
                                                    <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        <span className="text-lg">🧐</span> Characteristics
                                                    </h5>
                                                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                                                        {sab.characteristics.map((char, i) => (
                                                            <li key={i}>{char}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        <span className="text-lg">🤥</span> The Lies they tell
                                                    </h5>
                                                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                                                        {sab.lies.map((lie, i) => (
                                                            <li key={i} className="italic">"{lie}"</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )})}
                    </div>
                </div>
            </div>

            {/* Right Column: Coach's Insights */}
            <div className="lg:col-span-7 flex flex-col h-full">
                <div className="bg-white dark:bg-[#202020] rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] border-2 border-gray-200 dark:border-[#333] overflow-hidden flex flex-col h-full min-h-[600px] relative">
                    <DoodleArrow className="absolute -top-4 -right-4 w-32 h-20 text-sketch-slate rotate-12 opacity-20" />
                    
                    <div className="px-8 py-6 border-b-2 border-gray-100 dark:border-[#333] flex items-center justify-between bg-gray-50 dark:bg-[#333]/30">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-900 text-white rounded-2xl shadow-lg rotate-3">
                                <BrainCircuit size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white leading-none">Coach's Corner</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Personalized Insights</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 flex-grow bg-white dark:bg-[#202020] relative">
                        {loading ? (
                            <div className="flex flex-col space-y-6 w-full h-full">
                                {/* Loading Message with Icon */}
                                <div className="flex items-center justify-center space-x-3 text-sketch-slate mb-4">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                    <BrainCircuit size={32} />
                                    </motion.div>
                                    <span className="font-display font-bold text-lg animate-pulse text-gray-500 dark:text-gray-300">
                                        Gathering your insights...
                                    </span>
                                </div>

                                {/* Skeleton Text Blocks */}
                                <div className="space-y-4 animate-pulse opacity-60">
                                    {/* Section 1 */}
                                    <div className="h-6 bg-gray-200 dark:bg-[#333] rounded-md w-1/3 mb-2"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-full"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-11/12"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-full"></div>
                                    
                                    {/* Section 2 */}
                                    <div className="h-6 bg-gray-200 dark:bg-[#333] rounded-md w-1/4 mt-6 mb-2"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-10/12"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-full"></div>
                                    
                                    {/* Section 3 */}
                                    <div className="h-6 bg-gray-200 dark:bg-[#333] rounded-md w-2/5 mt-6 mb-2"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-full"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-[#333]/50 rounded-md w-4/5"></div>
                                </div>
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="prose dark:prose-invert prose-lg max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-headings:font-display font-black prose-headings:text-gray-900 dark:prose-headings:text-white prose-strong:text-sketch-slate"
                            >
                                <ReactMarkdown
                                    components={{
                                        h2: ({node, ...props}) => <h2 className="text-2xl font-black mt-8 mb-4 flex items-center gap-3" {...props} />,
                                        p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                                        li: ({node, ...props}) => <li className="mb-2" {...props} />
                                    }}
                                >
                                    {aiAnalysis}
                                </ReactMarkdown>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 pb-12 flex-wrap">
        <button 
            onClick={onRetake}
            className="group relative px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden min-w-[200px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sketch-slate focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
        >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-sketch-slate via-sketch-rust to-sketch-ochre opacity-0 group-hover:opacity-10 transition-opacity"></div>
            {/* Shimmer Beam */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(255,255,255,0.5)_180deg,transparent_270deg)] animate-[spin_3s_linear_infinite]" />
            </div>
            <RefreshCcw size={20} className="group-hover:-rotate-180 transition-transform duration-700" />
            Retake
        </button>
        
        <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="group relative px-6 py-4 bg-sketch-clay text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden min-w-[200px] disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sketch-clay focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
        >
             {isDownloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            )}
             {/* Shimmer Beam */}
             <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(255,255,255,0.5)_180deg,transparent_270deg)] animate-[spin_3s_linear_infinite]" />
            </div>
            {isDownloading ? 'Generating...' : 'Download Report'}
        </button>

        <button 
            onClick={onProgramDetails}
            className="group relative px-6 py-4 bg-white dark:bg-[#202020] text-gray-900 dark:text-white border-2 border-gray-200 dark:border-[#333] rounded-full font-bold text-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121212]"
        >
             {/* Shimmer Beam */}
             <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(0,0,0,0.1)_180deg,transparent_270deg)] dark:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(255,255,255,0.2)_180deg,transparent_270deg)] animate-[spin_3s_linear_infinite]" />
            </div>
            <BookOpen size={20} className="text-sketch-slate" />
            Program Details
        </button>
      </div>
    </motion.div>
  );
};

export default Results;
