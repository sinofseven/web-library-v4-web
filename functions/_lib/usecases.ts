export function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get("content-type");

  if (contentType === null) {
    return false;
  }

  return contentType.split(";")[0]?.trim().toLowerCase() === "application/json";
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
