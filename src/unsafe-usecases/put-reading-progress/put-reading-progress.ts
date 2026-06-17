import { IndexedDbStorage } from "./indexed-db-storage";

export async function putReadingProgress(bookId: string, pageIndex: number) {
  const storage = new IndexedDbStorage();
  await storage.saveProgress(bookId, pageIndex);
}
