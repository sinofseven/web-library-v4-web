import type { Library } from "@/models/library";
import { fetchByKv } from "@/usecases/fetch-by-kv";
import { KV_KEY_LIBRARY } from "@/variables";

export async function fetchLibrary(): Promise<Library> {
  const resp = await fetchByKv<Library>(KV_KEY_LIBRARY);

  if (resp === null) {
    throw new Error("failed to fetch library");
  } else {
    return resp;
  }
}
