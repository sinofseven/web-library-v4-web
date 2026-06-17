import type { Series } from "@/models/library";
import { fetchByKv } from "@/usecases/fetch-by-kv";
import { KV_PREFIX_SERIES } from "@/variables";

export async function fetchSeries(seriesId: string): Promise<Series | null> {
  return fetchByKv<Series | null>(`${KV_PREFIX_SERIES}:${seriesId}`);
}
