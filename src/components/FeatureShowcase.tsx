import React from 'react';
import { motion } from 'framer-motion';

const FeatureShowcase: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[3rem] p-10 md:p-20 shadow-xl overflow-hidden transition-colors duration-300">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200/50 dark:bg-indigo-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-200/50 dark:bg-pink-500/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Step 1: Upload */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center gap-4 group"
          >
            <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-3xl shadow-lg flex items-center justify-center text-4xl relative group-hover:scale-110 transition-all duration-300">
              <span className="absolute -top-4 -left-4 text-3xl animate-bounce delay-100">📄</span>
              <span className="absolute -bottom-2 -right-4 text-3xl animate-bounce delay-700">📊</span>
              📁
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white">Upload Doc</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">PDFs, Images, Text</p>
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-gray-300 dark:text-gray-600"
          >
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

          {/* Step 2: AI Processing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center text-center gap-4"
          >
             <div className="w-32 h-32 bg-gradient-to-br from-[#6366f1] to-[#ec4899] rounded-full shadow-xl flex items-center justify-center text-5xl text-white relative">
                 <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
                 🤖
             </div>
             <div>
              <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white">AI Magic</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Analyzes & Summarizes</p>
            </div>
          </motion.div>

           {/* Arrow 2 */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="hidden md:block text-gray-300 dark:text-gray-600"
          >
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

          {/* Step 3: Result */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center text-center gap-4"
          >
             <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-3xl shadow-lg flex items-center justify-center text-4xl hover:scale-110 transition-all duration-300">
                📝
             </div>
             <div>
              <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white">Instant Report</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Insights & Actions</p>
            </div>
          </motion.div>
        </div>

        {/* Floating elements representing text extraction */}
        <motion.div 
            animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full mt-[-60px] bg-white dark:bg-slate-700 px-3 py-1 rounded-lg shadow-sm text-xs font-mono text-indigo-600 dark:text-indigo-300 hidden md:block"
        >
            "Key Points..."
        </motion.div>
         <motion.div 
            animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full mt-[-60px] ml-10 bg-white dark:bg-slate-700 px-3 py-1 rounded-lg shadow-sm text-xs font-mono text-pink-600 dark:text-pink-300 hidden md:block"
        >
            "Summary..."
        </motion.div>

      </div>
    </div>
  );
};

export default FeatureShowcase;