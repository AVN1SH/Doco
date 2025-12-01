import React from 'react';
import { motion } from 'framer-motion';

const Processing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-gray-100 dark:border-slate-700 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-t-[#6366f1] border-r-transparent border-b-transparent border-l-transparent rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-4xl"
        >
          🤖
        </motion.div>
      </div>
      <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-white mb-2">Reading Document...</h3>
      <p className="text-gray-500 dark:text-gray-400">Our AI elves are working their magic</p>
    </div>
  );
};

export default Processing;