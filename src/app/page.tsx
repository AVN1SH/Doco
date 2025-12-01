"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeatureShowcase from '../components/FeatureShowcase';
import Footer from '../components/Footer';
import { AppState } from '../types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    return false;
  });

  // Apply Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 overflow-x-hidden selection:bg-pink-200 dark:selection:bg-pink-900">
      
      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 transition-colors duration-300">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setAppState(AppState.LANDING)}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-[#6366f1] to-[#ec4899] rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
            D
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-gray-800 dark:text-white">Doco</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 flex-grow container mx-auto px-4 relative">
        <AnimatePresence mode="wait">
          
          {appState === AppState.LANDING && (
            <motion.div
              key="landing"
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col"
            >
              <Hero />
              <FeatureShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Decorative Background Mesh */}
      <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200 dark:bg-indigo-900 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-100 dark:bg-pink-900 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </div>
  );
};

export default App;