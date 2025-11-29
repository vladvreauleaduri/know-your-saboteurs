
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { QUESTIONS } from '../constants';
import { AssessmentResult } from '../types';
import { JudgeFace, DoodleStar } from '../Illustrations';

interface QuizProps {
    onComplete: (results: AssessmentResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  // Animation variants
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0, rotate: direction > 0 ? 5 : -5 }),
    center: { x: 0, opacity: 1, rotate: 0 },
    exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0, rotate: direction > 0 ? -5 : 5 })
  };

  const currentQuestion = QUESTIONS[currentIndex];

  const handleAnswer = (score: number) => {
    if (!currentQuestion) return;

    const updatedAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(updatedAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalScores: Record<string, number> = {};
      Object.entries(updatedAnswers).forEach(([qId, ansScore]) => {
          const q = QUESTIONS.find(item => item.id === Number(qId));
          if (q) {
              finalScores[q.saboteur] = (finalScores[q.saboteur] || 0) + (ansScore as number);
          }
      });
      onComplete(finalScores);
    }
  };

  const handleBack = () => {
      if (currentIndex > 0) {
          setDirection(-1);
          setCurrentIndex(prev => prev - 1);
          setShowWarning(true);
          const timer = setTimeout(() => setShowWarning(false), 4000);
          return () => clearTimeout(timer);
      }
  };

  const progress = ((currentIndex) / QUESTIONS.length) * 100;

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-12 w-full max-w-4xl mx-auto relative overflow-hidden">
      
      {/* The Judge watching you */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-24 right-4 md:right-10 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none"
      >
        <JudgeFace className="w-full h-full text-gray-900 dark:text-white" />
      </motion.div>

      {/* Progress */}
      <div className="w-full max-w-xl mb-12 relative">
          <div className="h-4 bg-gray-200 dark:bg-[#333] rounded-full overflow-hidden border border-gray-300 dark:border-[#444]">
            <motion.div 
                className="h-full bg-sketch-slate"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
                style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm font-display font-bold text-gray-400 dark:text-gray-500">
              <span>Start</span>
              <span>Finish</span>
          </div>
      </div>

      <div className="w-full max-w-2xl relative perspective-1000">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white dark:bg-[#202020] rounded-[2rem] p-8 md:p-12 border-2 border-gray-200 dark:border-[#333] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative z-10"
            >
                {/* Decoration */}
                <DoodleStar className="absolute -top-6 -left-6 w-16 h-16 text-sketch-ochre -z-10 rotate-12" />

                {currentIndex > 0 && (
                    <button 
                        onClick={handleBack}
                        className="absolute top-8 left-8 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-slate focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#202020]"
                        aria-label="Previous question"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                <div className="text-center mb-10 mt-4 relative">
                    {/* Encouragement Pop-up at Question 15 */}
                    <AnimatePresence>
                        {currentIndex === 14 && (
                            <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute -top-9 left-0 right-0 mx-auto w-max px-4 py-2 bg-sketch-sage text-white text-xs font-bold rounded-xl shadow-lg z-20 pointer-events-none"
                            >
                                🚀 Keep going! Only 3 left!
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-sketch-sage"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <span className="inline-block px-4 py-1 rounded-full bg-gray-100 dark:bg-[#333] text-gray-500 dark:text-gray-300 text-sm font-bold tracking-wider mb-6">
                        QUESTION {currentIndex + 1}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black font-display text-gray-900 dark:text-white leading-tight">
                        {currentQuestion.text}
                    </h2>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-2">
                        <span>Disagree</span>
                        <span>Agree</span>
                    </div>
                    <div className="grid grid-cols-5 gap-3 md:gap-6">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                onClick={() => handleAnswer(value)}
                                aria-label={`Rate ${value} out of 5`}
                                className={`
                                    aspect-square rounded-2xl font-black text-xl md:text-2xl transition-all duration-200 flex items-center justify-center border-b-4 active:border-b-0 active:translate-y-1
                                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#202020]
                                    ${value === 1 ? 'bg-white border-gray-200 text-gray-400 hover:border-sketch-rust hover:text-sketch-rust hover:bg-red-50 dark:bg-[#333] dark:border-[#444] dark:text-gray-400 dark:hover:bg-red-900/20 focus-visible:ring-sketch-rust' : ''}
                                    ${value === 2 ? 'bg-white border-gray-200 text-gray-400 hover:border-sketch-ochre hover:text-sketch-ochre hover:bg-orange-50 dark:bg-[#333] dark:border-[#444] dark:text-gray-400 dark:hover:bg-orange-900/20 focus-visible:ring-sketch-ochre' : ''}
                                    ${value === 3 ? 'bg-white border-gray-200 text-gray-400 hover:border-gray-500 hover:text-gray-600 hover:bg-gray-50 dark:bg-[#333] dark:border-[#444] dark:text-gray-400 dark:hover:bg-[#444] focus-visible:ring-gray-400' : ''}
                                    ${value === 4 ? 'bg-white border-gray-200 text-gray-400 hover:border-sketch-sage hover:text-sketch-sage hover:bg-green-50 dark:bg-[#333] dark:border-[#444] dark:text-gray-400 dark:hover:bg-green-900/20 focus-visible:ring-sketch-sage' : ''}
                                    ${value === 5 ? 'bg-white border-gray-200 text-gray-400 hover:border-sketch-slate hover:text-sketch-slate hover:bg-blue-50 dark:bg-[#333] dark:border-[#444] dark:text-gray-400 dark:hover:bg-blue-900/20 focus-visible:ring-sketch-slate' : ''}
                                    ${answers[currentQuestion.id] === value ? '!bg-gray-900 !text-white !border-gray-900 dark:!bg-white dark:!text-gray-900 dark:!border-white scale-110 shadow-lg' : ''}
                                `}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

        <AnimatePresence>
            {showWarning && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute -bottom-20 left-0 right-0 mx-auto w-max max-w-[90%] flex items-center gap-3 px-6 py-4 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-2xl shadow-xl z-20"
                >
                    <AlertCircle className="shrink-0 text-sketch-ochre" />
                    <p className="font-medium text-sm">Trust your gut! Overthinking feeds the Saboteurs.</p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
