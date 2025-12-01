export enum AppState {
  LANDING = 'LANDING',
  UPLOADING = 'UPLOADING',
  READY = 'READY',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface UploadedFile {
  file: File;
  previewUrl?: string;
  base64Data?: string;
  type: 'image' | 'pdf' | "docx" | "csv" | 'text';
}

export interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  tone: string;
}

export interface IconProps {
  className?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  fileSize: number;
  fileType: 'image' | 'pdf' | "docx" | "csv" | 'text';
  result?: AnalysisResult;
}