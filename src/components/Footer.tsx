import React from 'react';
import { GithubIcon, LinkedInIcon, XIcon, SunIcon, MoonIcon } from './Icons';

interface FooterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <footer className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-gray-100 dark:border-slate-800 py-8 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-[#6366f1] to-[#ec4899] rounded-md flex items-center justify-center text-white text-xs font-bold shadow-md">
                D
            </div>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Doco AI
            </span>
        </div>

        <div className="flex items-center gap-6">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                aria-label="Toggle Dark Mode"
            >
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2"></div>
            <a href="https://github.com/AVN1SH" target='_blank' className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/avnish-kumar-sharma" target='_blank' className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href="https://x.com/AvnishKrSharma" target='_blank' className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <XIcon className="w-5 h-5" />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;