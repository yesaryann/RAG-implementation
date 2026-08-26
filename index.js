//PDF KO LOAD KARO
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenAI } from '@google/genai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
dotenv.config();


async function indexDocuments() {
    const PDF_PATH = "C:/Users/iraja/OneDrive/Desktop/Ai Engineer/3.RAG and Langraph/RAG/DSA.pdf";
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();
    console.log("Documents loaded successfully.");
    console.log(rawDocs.length);

    //chuncking karo

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
    console.log("Documents chunked successfully.");

    //3.Vector Embedding model
  const google = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const embeddings = {
    async embedQuery(text) {
      const response = await google.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
        config: { outputDimensionality: 768 },
      });
      return response.embeddings[0].values;
    },
    async embedDocuments(texts) {
      const response = await google.models.embedContent({
        model: 'gemini-embedding-001',
        contents: texts,
        config: { outputDimensionality: 768 },
      });
      return response.embeddings.map((embedding) => embedding.values);
    },
  };
  console.log("Embeddings initialized successfully.");
  //Databse ko bhi configure kar sakte
  //intiallize pinecone client
const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

console.log("Pinecone client initialized successfully.");

//langchian(chuncking,embedding,vector database) ko integrate karna
await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });
  console.log("Data stored successfully.");
}

indexDocuments();