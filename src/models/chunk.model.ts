import mongoose from "mongoose";

export interface Chunk {
  chunkIndex: number;
  text: string;
  embedding: number[];
}

const ChunkSchema = new mongoose.Schema({
  chunkIndex: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
  expiresAt : {
    type : Date,
    default : Date.now,
    index : { expires : "25m" }
  }
});
const ChunkModel = mongoose.models.Chunk as mongoose.Model<Chunk> || mongoose.model<Chunk>("Chunk", ChunkSchema);

export default ChunkModel;
