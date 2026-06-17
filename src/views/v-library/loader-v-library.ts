import { fetchLatest, fetchLibrary } from "@/usecases";

export async function loaderVLibrary() {
  return {
    promiseLibrary: fetchLibrary(),
    promiseLatest: fetchLatest(),
  };
}
