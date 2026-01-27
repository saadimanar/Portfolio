import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import type { Document } from "@langchain/core/documents";

export function getVectorStore() {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PRIVATE_KEY!
  );

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  });

  return vectorStore;
}

/**
 * Search the vector store for relevant documents based on a query
 * @param query - The search query/question
 * @param k - Number of documents to retrieve (default: 3)
 * @param filter - Optional metadata filter for the search
 * @returns Array of relevant documents with their content and metadata
 */
export async function searchVectorStore(
  query: string,
  k: number = 3,
  filter?: Record<string, any>
): Promise<Array<{ content: string; metadata: Record<string, any> }>> {
  try {
    const vectorStore = getVectorStore();
    const results = await vectorStore.similaritySearch(query, k, filter);

    return results.map((doc) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
    }));
  } catch (error) {
    console.error("Error searching vector store:", error);
    // Return empty array on error to not break the chat flow
    return [];
  }
}

/**
 * Add documents to the vector store
 * @param documents - Array of documents to add
 * @param ids - Optional array of IDs for the documents
 */
export async function addDocumentsToVectorStore(
  documents: Document[],
  ids?: string[]
): Promise<void> {
  try {
    const vectorStore = getVectorStore();
    await vectorStore.addDocuments(documents, ids ? { ids } : undefined);
  } catch (error) {
    console.error("Error adding documents to vector store:", error);
    throw error;
  }
}

/**
 * Delete documents from the vector store by IDs
 * @param ids - Array of document IDs to delete
 */
export async function deleteDocumentsFromVectorStore(
  ids: string[]
): Promise<void> {
  try {
    const vectorStore = getVectorStore();
    await vectorStore.delete({ ids });
  } catch (error) {
    console.error("Error deleting documents from vector store:", error);
    throw error;
  }
}
