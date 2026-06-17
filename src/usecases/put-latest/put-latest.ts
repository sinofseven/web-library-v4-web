import type { LatestBook } from "@/models/library";
import { putToKv } from "@/usecases/put-to-kv";
import { KV_KEY_LATEST } from "@/variables";

export async function putLatest(latest: LatestBook) {
  await putToKv(KV_KEY_LATEST, JSON.stringify(latest));
}
