import React from 'react';
import { motion } from 'framer-motion';
import { HistoryItem } from '../types';
import { HistoryIcon } from './Icons';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-12 px-4">
      <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">
        <HistoryIcon className="w-4 h-4" />
        Recent Analyses
      </div>
      
      <div className="grid gap-3">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(item)}
            className="bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700 p-4 rounded-xl cursor-pointer transition-all hover:shadow-md flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xl group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
                  {item.fileType === 'pdf' ? '📄' : '🖼️'}
               </div>
               <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{item.fileName}</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(item.timestamp).toLocaleDateString()} • {item.result?.tone} Tone
                  </p>
               </div>
            </div>
            
            <div className="text-xs font-medium text-[#6366f1] dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                View Result →
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;