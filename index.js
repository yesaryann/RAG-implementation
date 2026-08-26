//PDF KO LOAD KARO
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';


async function indexDocuments() {
    const PDF_PATH = "C:/Users/iraja/OneDrive/Desktop/Ai Engineer/3.RAG and Langraph/RAG/DSA.pdf";
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();

    console.log(rawDocs.length);
    // Further processing of rawDocs can be done here
}

indexDocuments();