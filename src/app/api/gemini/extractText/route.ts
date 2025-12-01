import { GoogleGenAI, Type } from "@google/genai";
import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { NextResponse } from "next/server";
import chunkModel from "@/models/chunk.model";
import dbConnect from "@/lib/dbConnect";
import { createChunks } from "@/lib/createChunks";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req : Request) {
  const formData = await req.formData();
  const uploadedFile = {
    file: formData.get("file") as File,
    base64Data: formData.get("base64Data") as string,
    fileType: formData.get("fileType") as string
  };

  try {
    await dbConnect();
    const base64Data = uploadedFile.base64Data;
    const mimeType = uploadedFile.fileType;

    const modelId = 'gemini-2.5-flash';
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const systemInstruction = `You are a tool who extract text from any data given as input.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedText: {
              type: Type.STRING
            }
          },
          required: ["extractedText"]
        }
      }
    });

    const text = response.text;

    if (!text) throw new Error("No response from Gemini");

    const extractedText = JSON.parse(text).extractedText;

    const chunks = createChunks(extractedText, 500, 50);

    const requests = chunks.map((text) => ({
      content: { role: "user", parts: [{ text }] },
      taskType: TaskType.RETRIEVAL_DOCUMENT, 
      title: "Document Chunk", 
    }));

    const result = await model.batchEmbedContents({
      requests,
    });

    const embeddings = result.embeddings.map((e) => e.values);

    
    for (let i = 0; i < embeddings.length; i++) {
      await chunkModel.create({
        chunkIndex: i,
        text: chunks[i],
        embedding: embeddings[i]
      })
    }

    return NextResponse.json({data : "success"}, {status : 200})

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};