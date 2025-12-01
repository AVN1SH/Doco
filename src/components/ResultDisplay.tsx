import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult, UploadedFile } from '../types';
import { CheckCircleIcon } from './Icons';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    if(!result.actionItems || !result.keyPoints || !result.summary || !result.tone) return null;
  return (
    <div className="w-full max-w-4xl pt-10">
        {/* Right Col: Analysis */}
        <div className="flex flex-col gap-6">
            
            {/* Summary Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-display font-bold text-gray-800 dark:text-white">Executive Summary</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                        ${result.tone.toLowerCase().includes('urgent') 
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                            : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                        {result.tone} Tone
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {result.summary}
                </p>
            </motion.div>

            {/* Key Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 transition-colors"
                >
                     <h3 className="text-indigo-900 dark:text-indigo-300 font-bold mb-4 flex items-center gap-2">
                        <span>🎯</span> Key Findings
                     </h3>
                     <ul className="space-y-3">
                        {result.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-indigo-800 dark:text-indigo-200 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-300 shrink-0"/>
                                {point}
                            </li>
                        ))}
                     </ul>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-3xl border border-pink-100 dark:border-pink-900/30 transition-colors"
                >
                     <h3 className="text-pink-900 dark:text-pink-300 font-bold mb-4 flex items-center gap-2">
                        <span>⚡</span> Action Items
                     </h3>
                     <ul className="space-y-3">
                        {result.actionItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-pink-800 dark:text-pink-200 text-sm font-medium">
                                <CheckCircleIcon className="w-5 h-5 text-pink-400 dark:text-pink-300 shrink-0" />
                                {item}
                            </li>
                        ))}
                     </ul>
                </motion.div>
            </div>
        </div>
    </div>
  );
};

export default ResultDisplay;