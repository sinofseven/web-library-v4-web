import type { GetKvResponse } from "@/models/kv";
import { isErrorKvResponse } from "@/usecases/is-error-kv-response";
import { isRecord } from "@/usecases/is-record";

function isGetKvResponse(value: unknown): value is GetKvResponse {
  return (
    isRecord(value) && (typeof value.value === "string" || value.value === null)
  );
}

export async function fetchByKv<T>(key: string): Promise<T | null> {
  const resp = await fetch("/api/kv/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
  });

  const json: unknown = await resp.json();

  if (!resp.ok) {
    if (isErrorKvResponse(json)) {
      throw new Error(`${json.error.code}: ${json.error.message}`);
    } else {
      throw new Error(`HTTP error: ${resp.status}`);
    }
  }

  if (!isGetKvResponse(json)) {
    throw new Error("Invalid response body");
  }

  const data: GetKvResponse = json;

  if (data.value === null) {
    return null;
  } else {
    return JSON.parse(data.value);
  }
}
