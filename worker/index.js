// Serves static assets.
// - www.<domain> → 301 to the bare domain (one canonical host for SEO).
// - noindex on platform hosts (*.workers.dev etc.) only; custom domains stay indexable.
const PLATFORM_HOST = /(^|\.)(lovable\.app|workers\.dev|pages\.dev|netlify\.app)$/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.replace(/\.$/, "");

    if (host.startsWith("www.")) {
      url.hostname = host.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    if (!PLATFORM_HOST.test(host)) return response;
    if (!(response.headers.get("content-type") || "").includes("text/html")) return response;
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
