import type { Book } from "@/models/library";
import { fetchByKv } from "@/usecases/fetch-by-kv";
import { KV_PREFIX_BOOK } from "@/variables";

export async function fetchBook(bookId: string): Promise<Book | null> {
  return fetchByKv<Book>(`${KV_PREFIX_BOOK}:${bookId}`);
}
