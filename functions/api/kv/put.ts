import { errorResponse, jsonResponse } from "../../_lib/http";
import { isJsonRequest, isRecord } from "../../_lib/usecases";

type PutKvRequest = {
  key: string;
  value: string;
};

type PutKvResponse = {
  ok: true;
};

function isPutKvRequest(value: unknown): value is PutKvRequest {
  return (
    isRecord(value) &&
    typeof value.key === "string" &&
    typeof value.value === "string"
  );
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!isJsonRequest(request)) {
    return errorResponse(
      415,
      "unsupported_media_type",
      "Content-Type must be application/json",
    );
  }

  const kv = env.web_library_v4;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse(
      400,
      "invalid_json",
      "Request body must be valid JSON.",
    );
  }

  if (!isPutKvRequest(body)) {
    return errorResponse(
      400,
      "invalid_request_body",
      "Request body must have string key and string value",
    );
  }

  await kv.put(body.key, body.value);

  return jsonResponse<PutKvResponse>({ ok: true });
};
