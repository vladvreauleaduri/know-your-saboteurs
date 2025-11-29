
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const WaitingListForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-sketch-sage/10 dark:bg-sketch-sage/20 p-6 rounded-2xl border border-sketch-sage dark:border-sketch-sage text-center"
           >
             <div className="w-16 h-16 bg-sketch-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-sketch-sage" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h3>
             <p className="text-gray-600 dark:text-gray-300">We'll let you know as soon as spots open up.</p>
             <button 
               onClick={() => setStatus('idle')}
               className="mt-4 text-sm font-bold text-sketch-sage hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-sage focus-visible:ring-offset-2 rounded-lg"
             >
               Add another email
             </button>
           </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="relative"
          >
             <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-sketch-slate transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  className={`
                    block w-full pl-12 pr-12 py-4 bg-white dark:bg-[#333] border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 
                    focus:outline-none focus:ring-4 focus:ring-sketch-slate/30 focus:border-sketch-slate
                    transition-all duration-300 shadow-sm
                    ${status === 'error' 
                      ? 'border-red-300 focus:border-red-500 dark:border-red-800' 
                      : 'border-gray-200 dark:border-[#444]'
                    }
                  `}
                  placeholder="Enter your email address"
                  aria-label="Email address for waiting list"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute inset-y-2 right-2 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sketch-rust focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#333]"
                  aria-label="Submit Email"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
             </div>
             {status === 'error' && (
               <motion.p 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="text-red-500 text-sm mt-2 font-medium pl-2 flex items-center gap-1"
               >
                 <AlertCircle size={14} /> Please enter a valid email address.
               </motion.p>
             )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WaitingListForm;
