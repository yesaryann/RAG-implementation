//PDF KO LOAD KARO
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';


async function indexDocuments() {
    const PDF_PATH = "C:/Users/iraja/OneDrive/Desktop/Ai Engineer/3.RAG and Langraph/RAG/DSA.pdf";
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();

    console.log(rawDocs.length);

    //chuncking karo

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
    console.log(chunkedDocs);
}

indexDocuments();