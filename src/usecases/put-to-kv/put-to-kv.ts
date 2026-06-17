import { isErrorKvResponse } from "@/usecases/is-error-kv-response";

export async function putToKv(key: string, value: string) {
  const resp = await fetch("/api/kv/put", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });

  const json: unknown = await resp.json();

  if (!resp.ok) {
    if (isErrorKvResponse(json)) {
      throw new Error(`${json.error.code}: ${json.error.message}`);
    } else {
      throw new Error(`HTTP error: ${resp.status}`);
    }
  }
}
