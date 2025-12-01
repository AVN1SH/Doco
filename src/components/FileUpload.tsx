import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadIcon, FileIcon } from './Icons';
import { UploadedFile } from '../types';

interface FileUploadProps {
  onFileSelect: (file: UploadedFile) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    // Simple validation
    if (!file) return;
    
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or an Image (JPEG/PNG).");
      return;
    }

    const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';
    
    // Create preview if it's an image
    let previewUrl: string | undefined = undefined;
    if (fileType === 'image') {
      previewUrl = URL.createObjectURL(file);
    }

    onFileSelect({
      file,
      type: fileType,
      previewUrl
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`
          relative border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-[#6366f1] bg-blue-50 dark:bg-blue-900/30 scale-105 shadow-xl' 
            : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-lg'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          onChange={handleInputChange} 
          accept="application/pdf,image/*"
        />

        <div className="flex flex-col items-center justify-center gap-6">
          <motion.div
            animate={isDragging ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
            className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center text-[#6366f1] dark:text-indigo-300"
          >
            {isDragging ? (
                <FileIcon className="w-10 h-10" />
            ) : (
                <UploadIcon className="w-10 h-10" />
            )}
          </motion.div>

          <div>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-white mb-2 transition-colors">
              {isDragging ? 'Drop it like it\'s hot!' : 'Upload your file'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-sans transition-colors">
              Drag & drop or click to browse<br />
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">Supports PDF, JPG, PNG</span>
            </p>
          </div>
        </div>

        {/* Decorative background blobs */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/20 rounded-full blur-2xl opacity-50"></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl opacity-50"></div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        {['Summary', 'Notes', 'Key Points'].map((item, i) => (
          <div key={item} className="bg-white/50 dark:bg-slate-800/50 border border-white dark:border-slate-700 p-3 rounded-xl text-center shadow-sm text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">
             {["📜", "🧾", "📒"][i]} {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FileUpload;