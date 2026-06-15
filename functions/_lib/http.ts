export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export function jsonResponse<T>(body: T, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");

  return new Response(JSON.stringify(body), {
    ...init,
    headers,
  });
}

export function errorResponse(
  status: number,
  code: string,
  message: string,
): Response {
  return jsonResponse<ErrorResponse>(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  );
}
