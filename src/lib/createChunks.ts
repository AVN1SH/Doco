export function createChunks(text : string, chunkSize = 300, overlap = 50) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    // Extract chunk
    let chunk = text.slice(start, end).trim();

    // Push chunk if not empty
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    // Move start by chunkSize - overlap
    start += chunkSize - overlap;
  }

  return chunks;
}
