const MAX_JSON_BYTES = 32 * 1024;

export async function readJsonBody(request: Request, maxBytes = MAX_JSON_BYTES): Promise<unknown> {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > maxBytes) throw new Error('REQUEST_TOO_LARGE');

  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > maxBytes) throw new Error('REQUEST_TOO_LARGE');

  const text = new TextDecoder().decode(buffer);
  return JSON.parse(text);
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
