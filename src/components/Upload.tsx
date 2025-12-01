"use client"
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import Processing from '../components/Processing';
import HistoryList from '../components/HistoryList';
import { AppState, UploadedFile, AnalysisResult, HistoryItem } from '../types';
import { fileToBase64 } from '../lib/fileToBase64';
import ChatInput from './ChatInput';
import { File, FileImage, FileText, Image } from 'lucide-react';

const Upload = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOADING);
    const [currentFile, setCurrentFile] = useState<UploadedFile | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    
    // Theme State
    const [isDarkMode, setIsDarkMode] = useState(() => {
      if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme) {
              return savedTheme === 'dark';
          }
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
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
  
    const handleFileSelect = async (uploadedFile: UploadedFile) => {
      setCurrentFile(uploadedFile);
      setAppState(AppState.ANALYZING);
      setErrorMsg(null);
  
      try {
        // Need to generate base64 right away for the service
        if (!uploadedFile.base64Data) {
          uploadedFile.base64Data = await fileToBase64(uploadedFile.file);
        }
  
        const formData = new FormData();
        formData.append("file", uploadedFile.file);
        formData.append("base64Data", uploadedFile.base64Data);
        formData.append("fileType", uploadedFile.file.type);
        formData.append("customPrompt", '');
 

        const result = await fetch("/api/gemini/extractText", {
          method: "POST",
          body: formData
        });

        const resultData = (await result.json()).data;

        if(resultData === "success"){
          setAppState(AppState.READY);
        }

        // // Save to history
        const newHistoryItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          fileName: uploadedFile.file.name,
          fileSize: uploadedFile.file.size,
          fileType: uploadedFile.type,
          result : {} as AnalysisResult
        };
        setCurrentFileId(newHistoryItem.id);
        const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10
        setHistory(updatedHistory);
        localStorage.setItem('documagic_history', JSON.stringify(updatedHistory));
      } catch (error) {
        console.error(error);
        setErrorMsg("Oops! Something went wrong analyzing your document. Please try again.");
        setAppState(AppState.ERROR);
      }
    };
  
    const handleHistorySelect = (item: HistoryItem) => {
      setHistoryItem(item);
      console.log("hello")
      setCurrentFile({
        file: { 
          name: item.fileName, 
          size: item.fileSize,
          type: item.fileType === 'pdf' ? 'application/pdf' : 'image/jpeg' 
        } as File,
        type: item.fileType,
        previewUrl: undefined 
      });
      setAppState(AppState.READY);
    };
  
    const handleReset = () => {
      setAppState(AppState.UPLOADING);
      setCurrentFile(null);
      setErrorMsg(null);
    };
  return (
    <div className="size-full flex flex-col-reverse md:flex-row">
      <div className='flex-1'>
        <HistoryList history={history} onSelect={handleHistorySelect} />
      </div>

      <div className='flex-3 pt-8 container mx-auto px-4 relative'>
        <AnimatePresence mode="wait">
          {appState === AppState.UPLOADING && (<motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[60vh] pb-10"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-display font-bold mb-2 text-gray-800 dark:text-white">Upload your doc</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">We'll handle the rest</p>
              <div className="flex gap-8 mb-12 opacity-50 scale-90 animate-pulse-slow">
              <div className="flex flex-col items-center gap-2 transform -rotate-12 translate-y-4">
                <div className="w-16 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                  <FileText className="text-red-500 w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-gray-400">PDF</span>
              </div>
              <div className="flex flex-col items-center gap-2 transform -rotate-6">
                <div className="w-16 h-20 bg-green-50 rounded-lg shadow-sm flex items-center justify-center border border-green-100">
                  <Image className="text-green-600 w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-gray-400">JPG</span>
              </div>
              <div className="flex flex-col items-center gap-2 transform rotate-6">
                <div className="w-16 h-20 bg-blue-50 rounded-lg shadow-sm flex items-center justify-center border border-blue-100">
                  <FileImage className="text-blue-600 w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-gray-400">PNG</span>
              </div>
              <div className="flex flex-col items-center gap-2 transform rotate-12 translate-y-4">
                <div className="w-16 h-20 bg-green-50 rounded-lg shadow-sm flex items-center justify-center border border-green-100">
                  <File className="text-green-500 w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-gray-400">WEBP</span>
              </div>
            </div>
            </div>
            <FileUpload onFileSelect={handleFileSelect} />

          </motion.div>
          )}

          {appState === AppState.READY && currentFile && <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[60vh] pb-10"
          >
            <ChatInput
              file={currentFile}
              onReset={handleReset}
              historyItem={historyItem}
              currentFileId={currentFileId}
             />

          </motion.div>}
          

          {appState === AppState.ANALYZING && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[60vh] flex items-center justify-center"
            >
              <Processing />
            </motion.div>
          )}

          {appState === AppState.ERROR && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[50vh] text-center"
            >
              <div className="text-6xl mb-4">😵</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Analysis Failed</h3>
              <p className="text-red-500 mb-6">{errorMsg}</p>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium shadow-lg hover:scale-105 transition-transform"
              >
                Try Again
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

export default Upload
