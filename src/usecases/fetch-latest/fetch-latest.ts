import type { LatestBook } from "@/models/library";
import { fetchByKv } from "@/usecases/fetch-by-kv";
import { KV_KEY_LATEST } from "@/variables";

export async function fetchLatest(): Promise<LatestBook | null> {
  return fetchByKv<LatestBook>(KV_KEY_LATEST);
}
