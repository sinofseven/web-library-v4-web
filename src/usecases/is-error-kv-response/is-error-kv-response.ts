import type { ErrorKvResponse } from "@/models/kv";
import { isRecord } from "@/usecases/is-record";

export function isErrorKvResponse(value: unknown): value is ErrorKvResponse {
  return (
    isRecord(value) &&
    isRecord(value.error) &&
    typeof value.error.code === "string" &&
    typeof value.error.message === "string"
  );
}
