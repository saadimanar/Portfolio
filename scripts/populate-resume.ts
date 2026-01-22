import { config } from "dotenv";
import { resolve } from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getVectorStore } from "@/lib/vector-store";
import type { Document } from "@langchain/core/documents";

// Load environment variables from .env file
config({ path: resolve(process.cwd(), ".env") });

/**
 * Script to populate the Supabase vector store with resume PDF
 * Run with: npm run populate-resume
 */

async function populateResume() {
  console.log("🚀 Starting resume PDF population...");

  const vectorStore = getVectorStore();

  try {
    // Path to the resume PDF in the public folder
    const resumePath = resolve(process.cwd(), "public", "resume_saadi.pdf");

    console.log(`📄 Loading PDF from: ${resumePath}`);

    // Load and parse the PDF
    const loader = new PDFLoader(resumePath, {
      // Split pages into separate documents for better granularity
      splitPages: true,
    });

    const documents = await loader.load();

    console.log(`📝 Parsed ${documents.length} pages from PDF`);

    // Add metadata to each document
    const documentsWithMetadata: Document[] = documents.map((doc, index) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        source: "resume",
        type: "resume",
        document: "resume_saadi.pdf",
        page: index + 1,
        id: `resume-page-${index + 1}`,
      },
    }));

    // Generate IDs for all documents
    const documentIds = documentsWithMetadata.map(
      (doc) => doc.metadata.id as string
    );

    console.log(`📝 Adding ${documentsWithMetadata.length} document pages to vector store...`);

    await vectorStore.addDocuments(documentsWithMetadata, { ids: documentIds });

    console.log("✅ Successfully populated vector store with resume!");
    console.log(`📊 Added ${documentsWithMetadata.length} resume pages`);
  } catch (error) {
    console.error("❌ Error populating vector store:", error);
    throw error;
  }
}

// Run the script
populateResume()
  .then(() => {
    console.log("✨ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
