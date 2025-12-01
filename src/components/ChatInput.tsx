"use client";
import React, { useEffect, useState } from 'react';
import { FileText, Bot, ArrowDown, CheckCircle2Icon, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalysisResult, AppState, HistoryItem, UploadedFile } from '../types';
import ResultDisplay from './ResultDisplay';

interface ResultDisplayProps {
  file: UploadedFile;
  onReset: () => void;
  historyItem: HistoryItem | null;
  currentFileId: string | null;
}

const ChatInput: React.FC<ResultDisplayProps> = ({ historyItem, file, onReset, currentFileId }) => {
  const [inputValue, setInputValue] = useState("");
  const fileSize = file.file.size ? (file.file.size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown Size';
  const fileName = file.file.name || 'Unknown File';
  const [appState, setAppState] = useState<AppState>(AppState.READY);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('documagic_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    setAppState(AppState.UPLOADING);
  }, []);

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;

    try {
      const value = { prompt: inputValue }
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        body: JSON.stringify(value)
      })

      if(response.status !== 200) {
        setAppState(AppState.READY);
        return;
      }

      const result = await response.text();
      const resultData = await JSON.parse(result);

      setAnalysisResult(resultData.data);
      const updatedHistory : HistoryItem[] = history.map((item) => {
        if(item.id === currentFileId) {
          return {...item, result: resultData.data}
        }
        return item;
      }).slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('documagic_history', JSON.stringify(updatedHistory));


      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
    }
  }

    const handleReset = () => {
      setAppState(AppState.READY);
      setAnalysisResult(null);
    };

  useEffect(() => {
    if(!historyItem) return;
    setAnalysisResult(historyItem.result!)
    setAppState(AppState.RESULT);
  }, [historyItem])

  return (
    <div className="flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans w-full">
      <div className='flex flex-col md:flex-row gap-8 w-full'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/3 flex flex-col gap-4"
        >
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 transition-colors">
            <div className="aspect-[3/4] bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden flex items-center justify-center mb-4 relative">
              {file.type === 'image' && file.previewUrl ? (
                <img src={file.previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-6xl">{file.type === 'pdf' ? '📄' : '🖼️'}</div>
              )}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md">
                {file.type.toUpperCase()}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 dark:text-gray-300 font-mono mb-1 truncate px-2">{fileName}</p>
              <p className="text-xs text-gray-300 dark:text-gray-500">{fileSize}</p>
            </div>
          </div>

          <button
            onClick={() => {handleReset(); onReset();}}
            className="w-full cursor-pointer py-3 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-colors font-medium text-sm"
          >
            Analyze Another File
          </button>
        </motion.div>
        <div className='w-full'>
          <div className="absolute inset-0 pointer-events-none">
            {/* Abstract circles/glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-40 blur-3xl rounded-full mix-blend-overlay"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 opacity-40 blur-3xl rounded-full mix-blend-overlay"></div>
          </div>

          <h2 className="text-3xl font-display font-bold mb-2 text-gray-800 dark:text-white">Ready to Take Action</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Just tell what you want..!</p>

          {/* --- MAIN INPUT FIELD COMPONENT --- */}
          <div className="relative w-full max-w-xl z-10 group">

            {/* The White "Card" Input */}
            <div className="bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center gap-4 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] focus-within:ring-2 focus-within:ring-blue-100">

              {/* User Avatar (Left Side) */}
              <div className="flex-shrink-0">
                <div className="relative size-9 md:size-12 rounded-xl overflow-hidden bg-gray-200 border border-gray-100 shadow-inner items-center justify-center flex flex-nowrap">
                  <FileText className='size-5 md:size-7 text-gray-500' />
                  <CheckCircle2Icon className='size-2 md:size-4 text-green-500 fill-green-200 right-2 bottom-2 absolute' />
                </div>
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-transparent text-sm md:text-xl text-gray-700 font-medium placeholder-gray-300 outline-none w-full"
                placeholder="Summarize this doc for me?"
              />

              {/* Optional: Send/Action Button (Hidden by default in image, but good for UX) */}
              <button onClick={handleSubmit} className="p-2 cursor-pointer rounded-xl hover:bg-gray-50 text-gray-400 transition-colors">
                <Send className="size-4 md:size-7" />
              </button>
            </div>

            {/* Decorative Arrows (Contextual) */}
            <div className="absolute -top-8 left-1/4 w-px h-8 bg-gradient-to-t from-gray-300 to-transparent opacity-50"></div>
            <div className="absolute -top-8 right-1/4 w-px h-8 bg-gradient-to-t from-gray-300 to-transparent opacity-50"></div>
          </div>
          {/* --- END INPUT COMPONENT --- */}

          {appState === AppState.RESULT && analysisResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultDisplay
                result={analysisResult}
              />
            </motion.div>
          )}


          {/* Bottom Context Elements (Robot & Report) */}
          {appState === AppState.READY && <div className="mt-16 flex flex-col items-center gap-4 opacity-80">
            <ArrowDown className="text-gray-300 animate-bounce" />

            <div className="relative">
              {/* Robot Icon Head */}
              <div className="absolute -top-6 -left-6 bg-white p-2 rounded-full shadow-lg z-20 border border-gray-100">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-full p-1.5">
                  <Bot className="text-white w-5 h-5" />
                </div>
              </div>

              {/* Result Paper */}
              <div className="bg-white w-48 h-64 rounded-xl shadow-xl p-4 flex flex-col gap-3 transform rotate-1 border border-gray-50">
                <div className="h-4 w-3/4 bg-gray-800 rounded-md mb-2"></div>
                <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
                <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
                <div className="h-2 w-5/6 bg-gray-200 rounded-sm"></div>
                <div className="h-2 w-full bg-gray-200 rounded-sm mt-2"></div>
                <div className="h-2 w-4/6 bg-gray-200 rounded-sm"></div>
              </div>
            </div>
          </div>}

          <style jsx>{`
            .animate-pulse-slow {
              animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
              0%, 100% { opacity: .5; }
              50% { opacity: .7; }
            }
          `}</style>
        </div>
      </div>
      {/* Decorative Background Elements (to match the vibe of the image) */}

    </div>
  );
}

export default ChatInput;