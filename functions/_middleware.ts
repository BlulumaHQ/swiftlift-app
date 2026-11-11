// Cloudflare Pages middleware: X-Robots-Tag noindex on platform hosts (*.pages.dev etc.) only.
// Custom domains pass through untouched.
const PLATFORM_HOST = /(^|\.)(lovable\.app|workers\.dev|pages\.dev|netlify\.app)$/i;

function withNoindex(request: Request, response: Response): Response {
  const host = new URL(request.url).hostname.replace(/\.$/, "");
  if (!PLATFORM_HOST.test(host)) return response;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) =>
  withNoindex(context.request, await context.next());
