"use client";
import { motion } from 'framer-motion';
import { SparklesIcon } from './Icons';
import { useRouter } from 'next/navigation';


const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <motion.div 
           animate={{ rotate: [0, 10, -10, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-12 -left-12 text-6xl opacity-80"
        >
            📄
        </motion.div>
        <motion.div 
           animate={{ rotate: [0, -5, 5, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute -top-8 -right-12 text-6xl opacity-80"
        >
            📊
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight transition-colors duration-300">
          Unlock Insights from<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899]">
            Any Document
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mb-10 font-sans transition-colors duration-300"
      >
        Drag, drop, and let our AI magic summarize, extract data, and answer questions from your PDFs and images instantly.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => router.push("/ask")}
        className="group relative flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
      >
        <SparklesIcon className="w-5 h-5 text-yellow-300 dark:text-yellow-600 group-hover:animate-spin" />
        Get Started
      </motion.button>
      
      {/* Floating Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-10 md:left-32 w-24 h-24 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl -z-10"
      />
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute top-20 right-10 md:right-32 w-32 h-32 bg-pink-200 dark:bg-pink-900 rounded-full blur-3xl -z-10"
      />
    </div>
  );
};

export default Hero;