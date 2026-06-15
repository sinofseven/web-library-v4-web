export const onRequestPost: PagesFunction<Env> = async ({ env }) => {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
  });

  const kv = env.web_library_v4!;
  const value = await kv.get("test");

  return new Response(JSON.stringify({ value }), { headers });
};
