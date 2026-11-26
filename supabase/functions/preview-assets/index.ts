// Copies a client's public photos (e.g. from their Facebook Page) into the public
// preview-assets bucket so previews use stable URLs. Admin only (admin_send_key).
// POST { key, folder, items: [{ url, name }] } → { ok, files: [{ name, url } | { name, error }] }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const slug = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const b = await req.json();
    const { data: cfg } = await db.from("app_config").select("value").eq("key", "admin_send_key").maybeSingle();
    if (!cfg?.value || b.key !== cfg.value) return json({ error: "unauthorized" }, 401);
    const folder = slug(b.folder || "misc");
    const items: { url: string; name: string }[] = (b.items || []).slice(0, 40);
    const files = [];
    for (const it of items) {
      const name = slug(it.name || crypto.randomUUID());
      try {
        const u = new URL(it.url);
        if (u.protocol !== "https:") throw new Error("https only");
        const r = await fetch(u);
        if (!r.ok) throw new Error(`fetch ${r.status}`);
        const type = r.headers.get("content-type") || "image/jpeg";
        if (!type.startsWith("image/")) throw new Error(`not an image: ${type}`);
        const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
        const path = `${folder}/${name}.${ext}`;
        const bytes = new Uint8Array(await r.arrayBuffer());
        if (bytes.length > 15_000_000) throw new Error("too large");
        const { error } = await db.storage.from("preview-assets").upload(path, bytes, { contentType: type, upsert: true });
        if (error) throw error;
        files.push({ name, url: db.storage.from("preview-assets").getPublicUrl(path).data.publicUrl });
      } catch (e) {
        files.push({ name, error: String(e) });
      }
    }
    return json({ ok: true, files });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
