// Serves static assets; adds noindex on platform hosts (*.workers.dev etc.) only.
// Custom domains pass through untouched.
const PLATFORM_HOST = /(^|\.)(lovable\.app|workers\.dev|pages\.dev|netlify\.app)$/i;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const host = new URL(request.url).hostname.replace(/\.$/, "");
    if (!PLATFORM_HOST.test(host)) return response;
    if (!(response.headers.get("content-type") || "").includes("text/html")) return response;
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
