import * as dotenv from 'dotenv';
dotenv.config();

import readlineSync from 'readline-sync';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
    });
 
 const queryVector = await embeddings.embedQuery(question);   
 
async function main(){
   const userProblem = readlineSync.question("Ask me anything--> ");
   await chatting(userProblem);
   main();
}


main();