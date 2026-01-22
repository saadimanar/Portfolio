import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

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
 * @returns Array of relevant documents with their content and metadata
 */
export async function searchVectorStore(
  query: string,
  k: number = 3
): Promise<Array<{ content: string; metadata: Record<string, any> }>> {
  try {
    const vectorStore = getVectorStore();
    const results = await vectorStore.similaritySearch(query, k);

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
