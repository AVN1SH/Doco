import { GoogleGenAI, Type } from "@google/genai";
import { UploadedFile, AnalysisResult } from "@/types";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import ChunkModel from "@/models/chunk.model";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);

export async function POST(req : Request) {
  const { prompt } = await req.json();

  console.log(prompt, "-----------------------")

  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  try {

    dbConnect();

   const getVector = await model.embedContent({
      content: { 
        role: "user",
        parts: [{ text: String(prompt) }] 
      },
      taskType: TaskType.RETRIEVAL_QUERY, 
    });


    if(!getVector) return new NextResponse("No response from Gemini", {status : 500});

    const getEmbedding = getVector.embedding.values;

    const vectorSearch = await ChunkModel.aggregate([
      {
        $vectorSearch : {
          index : "semantic-search",
          path : "embedding",
          queryVector : getEmbedding,
          numCandidates : 100,
          limit : 5
        }
      },
      {
        $project : {
          text : 1,
          chunkIndex : 1,
          score : { $meta : "vectorSearchScore" }
        }
      }
    ])

    const context = vectorSearch.map((chunk) => chunk.text).join("\n\n---\n\n");

    const modelId = 'gemini-2.5-flash';

    const systemInstruction = `You are a helpful assistant. Use the following pieces of retrieved context and with your knowledge to answer the user's question effectively so that user easily understand.
    If the answer is not in the given context, say "I cannot find the answer in the provided document."
    `;

    const finalPrompt = `${context} \n\n ${prompt}`

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            text: finalPrompt
          }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise summary of the document (max 3 sentences)." },
            keyPoints: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3-5 most important facts or data points."
            },
            actionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Suggested next steps or action items based on the content."
            },
            tone: { type: Type.STRING, description: "One word describing the tone (e.g., Professional, Urgent, Casual)." }
          },
          required: ["summary", "keyPoints", "actionItems", "tone"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return NextResponse.json({data : JSON.parse(text) as AnalysisResult})

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};