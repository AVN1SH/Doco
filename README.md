# 📘 Doco – AI-Powered Document Assistant

<!-- PLACE PROJECT IMAGE / BANNER HERE -->

Doco is an AI-powered document intelligence tool built with **Next.js**, **Gemini AI**, and **MongoDB Vector Search**.  
Upload any **PDF, Image, or Document**, and Doco instantly extracts text, summarizes content, identifies key points, and provides actionable insights using a powerful RAG (Retrieval-Augmented Generation) pipeline.

---

## 🚀 Features

### 🔍 Document Upload
Upload:
- PDF files  
- Images (PNG, JPG, WEBP)  
- Scanned documents  

Supports both **file** and **base64** input.

### 🧠 AI Text Extraction
Uses **Gemini Vision** to extract text from:
- PDFs  
- Images  
- Scanned documents  
- Screenshots  

### 📚 Smart Chunking
Documents are:
- Split into optimized text chunks  
- Embedded using **Gemini Embedding Model `text-embedding-004`**  
- Stored in MongoDB with TTL cleanup

### 🗂️ Vector Search (RAG Engine)
User queries are:
- Embedded into vectors  
- Matched against stored chunk embeddings  
- Queried with **MongoDB `$vectorSearch`**

Top relevant chunks are passed to Gemini for final reasoning.

### 🤖 Structured AI Responses
The assistant returns a JSON object containing:
- `summary` — 2–3 sentence overview  
- `keyPoints` — 3–5 important points  
- `actionItems` — suggested next steps  
- `tone` — one-word tone classification  

### ⚡ Built with Modern Stack
- **Next.js 14 (App Router)**  
- **MongoDB Atlas Vector Index**  
- **Gemini Flash & Embedding Models**  
- **TailwindCSS**  
- **TypeScript**  

---

## 🧩 Project Architecture

User Uploads File → Extract Text → Chunk Text → Generate Embeddings
↓ ↓ ↓ ↓
Gemini Vision Chunking Gemini Embedding MongoDB Store
↓
User Query → Embed Query → Vector Search → Retrieve Chunks → Gemini RAG → Final Answer

---
