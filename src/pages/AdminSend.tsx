import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Eye, Loader2, LogOut, Paperclip, RefreshCw, Send, X } from "lucide-react";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { JOURNEY_FN } from "@/lib/journey";

// Internal page (not linked anywhere, noindex): send SwiftLift client emails by hand.
// Protected by the admin key stored in Supabase (app_config.admin_send_key).

type Lead = { id: string; name: string | null; email: string; company_name: string | null; website_url: string | null; status: string | null; source_app: string | null; created_at: string };
type Project = {
  id: string; lead_id: string | null; client_name: string | null; client_email: string | null; business_name: string | null; source_url: string | null;
  status: string | null; preview_a_url: string | null; preview_b_url: string | null; preview_a_image: string | null; preview_b_image: string | null;
  previews_sent_at: string | null; paid_at: string | null; live_url: string | null; selected_plan: string | null; selected_preview: string | null; created_at: string;
  report_url?: string | null; review_pages?: string[] | null; old_host?: string | null; revision_rounds_used?: number | null;
};
type EmailLog = { project_id: string | null; lead_id: string | null; template: string; to_email: string; status: string; created_at: string };

const TEMPLATES = [
  { value: "previews_ready", label: "B1 · Previews are ready", needs: ["linkA", "linkB"] },
  { value: "revision_done", label: "E2 · Changes are done", needs: ["previewUrl"] },
  { value: "site_live", label: "E3 · Site is live", needs: ["liveUrl"] },
  { value: "confirm", label: "Resend · Request received", needs: [] },
  { value: "payment_confirmed", label: "Resend · Payment received", needs: [] },
] as const;

const TEMPLATE_LABEL: Record<string, string> = {
  confirm: "Request received",
  previews_ready: "B1 previews",
  nudge_24h: "B2 24h reminder",
  expired_72h: "B3 expired",
  payment_confirmed: "E1 paid",
  golive_received: "Go-live plan",
  revision_done: "E2 changes done",
  revision_received: "Changes received",
  site_live: "E3 live",
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-sky-100 text-sky-800",
  previews_sent: "bg-amber-100 text-amber-800",
  previews_expired: "bg-zinc-200 text-zinc-700",
  paid: "bg-emerald-100 text-emerald-800",
  golive_received: "bg-emerald-100 text-emerald-800",
  revision_review: "bg-violet-100 text-violet-800",
  revision_requested: "bg-violet-600 text-white",
  approved: "bg-emerald-100 text-emerald-800",
  live: "bg-emerald-600 text-white",
};

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h}h ago` : `${Math.round(h / 24)}d ago`;
};

const input = "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30";

type Row = { key: string; kind: "lead" | "project"; name: string; email: string; business: string; website: string; status: string; created: string; leadId?: string; project?: Project };

export default function AdminSend() {
  const [key, setKey] = useState(() => {
    try { return localStorage.getItem("swl_admin_key") || ""; } catch { return ""; }
  });
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);

  const [template, setTemplate] = useState<string>("previews_ready");
  const [f, setF] = useState({ to: "", name: "", business: "", website: "", linkA: "", linkB: "", imgA: "", imgB: "", previewUrl: "", liveUrl: "", roundsLeft: "0", note: "", reportUrl: "", pages: "", oldHost: "" });
  const [reportState, setReportState] = useState<"" | "uploading" | "done" | "error">("");
  const [files, setFiles] = useState<{ name: string; url: string; state: "uploading" | "done" | "error" }[]>([]);
  const [preview, setPreview] = useState<{ subject: string; html: string; to: string; attachments: string[] } | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    document.title = "Send client email — SwiftLift";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body: { action: "list", key: k } });
    setLoading(false);
    if (error || data?.error) {
      setAuthed(false);
      return false;
    }
    setLeads(data.leads); setProjects(data.projects); setEmails(data.emails);
    setAuthed(true);
    return true;
  }, []);

  useEffect(() => { if (key) load(key); }, [key, load]);

  const rows: Row[] = useMemo(() => {
    const byLead = new Set(projects.map((p) => p.lead_id).filter(Boolean));
    const byEmail = new Set(projects.map((p) => (p.client_email || "").toLowerCase()));
    const pRows: Row[] = projects.map((p) => ({
      key: `p-${p.id}`, kind: "project", name: p.client_name || "", email: p.client_email || "", business: p.business_name || "",
      website: p.source_url || "", status: p.status || "", created: p.created_at, leadId: p.lead_id || undefined, project: p,
    }));
    const lRows: Row[] = leads
      .filter((l) => !byLead.has(l.id) && !byEmail.has((l.email || "").toLowerCase()))
      .map((l) => ({
        key: `l-${l.id}`, kind: "lead", name: l.name || "", email: l.email, business: l.company_name || "",
        website: l.website_url || "", status: l.status || "new", created: l.created_at, leadId: l.id,
      }));
    return [...lRows, ...pRows].sort((a, b) => b.created.localeCompare(a.created));
  }, [leads, projects]);

  const pick = (r: Row) => {
    setSelected(r);
    setMsg(null);
    const p = r.project;
    setF({
      to: r.email, name: r.name, business: r.business, website: r.website,
      linkA: p?.preview_a_url || "", linkB: p?.preview_b_url || "", imgA: p?.preview_a_image || "", imgB: p?.preview_b_image || "",
      previewUrl: p?.selected_preview === "A" ? p?.preview_a_url || "" : p?.selected_preview === "B" ? p?.preview_b_url || "" : "",
      liveUrl: p?.live_url || (r.website ? `https://${r.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}` : ""),
      roundsLeft: "0", note: "",
      reportUrl: p?.report_url || "", pages: (p?.review_pages || []).join(", "), oldHost: p?.old_host || "",
    });
    setReportState(p?.report_url ? "done" : "");
    setFiles([]);
    setPreview(null);
    const next = !p || p.status === "new" ? "previews_ready" : p.status === "live" ? "site_live" : p.status === "revision_requested" || p.paid_at ? "revision_done" : "previews_ready";
    setTemplate(next);
    window.scrollTo({ top: document.getElementById("composer")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const uploadReport = async (file: File | undefined) => {
    if (!file) return;
    setReportState("uploading");
    try {
      const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body: { action: "report_upload_url", key, name: file.name } });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      const up = await supabase.storage.from("client-reports").uploadToSignedUrl(data.path, data.token, file, { contentType: "application/pdf" });
      if (up.error) throw up.error;
      setF((s) => ({ ...s, reportUrl: data.publicUrl }));
      setReportState("done");
    } catch {
      setReportState("error");
    }
  };

  // Extra attachments (SEO proposal, brochures…) go to the same storage bucket as the preview report.
  const uploadFiles = async (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list).slice(0, 5 - files.length);
    for (const file of picked) {
      setFiles((s) => [...s, { name: file.name, url: "", state: "uploading" }]);
      try {
        const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body: { action: "report_upload_url", key, name: file.name } });
        if (error || data?.error) throw new Error(data?.error || error?.message);
        const up = await supabase.storage.from("client-reports").uploadToSignedUrl(data.path, data.token, file, { contentType: file.type || "application/octet-stream" });
        if (up.error) throw up.error;
        setFiles((s) => s.map((x) => (x.name === file.name && x.state === "uploading" ? { ...x, url: data.publicUrl, state: "done" } : x)));
      } catch {
        setFiles((s) => s.map((x) => (x.name === file.name && x.state === "uploading" ? { ...x, state: "error" } : x)));
      }
    }
  };

  const tpl = TEMPLATES.find((t) => t.value === template)!;
  const missing = (tpl.needs as readonly string[]).filter((k) => !(f as Record<string, string>)[k]);

  const payload = (action: "preview" | "send") => ({
    action, key, template, projectId: selected?.project?.id, leadId: selected?.leadId,
    ...f, roundsLeft: Number(f.roundsLeft || 0),
    files: files.filter((x) => x.state === "done").map((x) => ({ name: x.name, url: x.url })),
  });

  // Step 1: show the email exactly as the client will get it. Nothing is sent or saved.
  const openPreview = async () => {
    if (!f.to || missing.length) {
      setMsg({ ok: false, text: `Fill in: ${["to", ...missing].filter((k) => k !== "to" || !f.to).join(", ")}` });
      return;
    }
    if (reportState === "uploading" || files.some((x) => x.state === "uploading")) { setMsg({ ok: false, text: "Wait for the uploads to finish" }); return; }
    setPreviewing(true); setMsg(null);
    const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body: payload("preview") });
    setPreviewing(false);
    if (error || data?.error) { setMsg({ ok: false, text: data?.error || error?.message || "Preview failed" }); return; }
    setPreview({ subject: data.subject, html: data.html, to: data.to, attachments: data.attachments || [] });
  };

  // Step 2: send for real, from the preview window.
  const send = async () => {
    setSending(true); setMsg(null);
    const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body: payload("send") });
    setSending(false);
    if (error || data?.error) {
      setMsg({ ok: false, text: data?.error || error?.message || "Failed" });
      setPreview(null);
      return;
    }
    setPreview(null);
    setFiles([]);
    setF((s) => ({ ...s, note: "" }));
    setMsg({ ok: true, text: `Sent: ${data.subject}` });
    await load(key);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-5">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <h1 className="text-lg font-bold">SwiftLift · Client emails</h1>
          <p className="mt-1 text-sm text-zinc-500">Enter your admin key.</p>
          <input
            type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (async () => { if (await load(keyInput)) { setKey(keyInput); try { localStorage.setItem("swl_admin_key", keyInput); } catch { /* ignore */ } } })()}
            className={`${input} mt-4`} placeholder="Admin key" autoFocus
          />
          <button
            onClick={async () => { if (await load(keyInput)) { setKey(keyInput); try { localStorage.setItem("swl_admin_key", keyInput); } catch { /* ignore */ } } else setMsg({ ok: false, text: "Wrong key" }); }}
            className="mt-3 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white"
          >
            {loading ? "Checking…" : "Open"}
          </button>
          {msg && !msg.ok && <p className="mt-2 text-sm text-red-600">{msg.text}</p>}
        </div>
      </div>
    );
  }

  const field = (k: keyof typeof f, label: string, ph = "") => (
    <label className="block">
      <span className="text-xs font-semibold text-zinc-600">{label}</span>
      <input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} placeholder={ph} className={`${input} mt-1`} />
    </label>
  );

  const sentFor = (r: Row) =>
    emails.filter((e) => (r.project && e.project_id === r.project.id) || (r.leadId && e.lead_id === r.leadId) || e.to_email === r.email.toLowerCase());

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
        <h1 className="text-base font-bold">SwiftLift · Client emails</h1>
        <div className="flex gap-2">
          <button onClick={() => load(key)} className="rounded-lg border border-zinc-300 p-2" aria-label="Refresh">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => { try { localStorage.removeItem("swl_admin_key"); } catch { /* ignore */ } setKey(""); setAuthed(false); }} className="rounded-lg border border-zinc-300 p-2" aria-label="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 p-4 lg:grid-cols-[1fr_420px]">
        <section>
          <h2 className="mb-2 text-sm font-semibold text-zinc-500">Clients ({rows.length})</h2>
          <div className="space-y-2">
            {rows.map((r) => {
              const sent = sentFor(r);
              return (
                <button
                  key={r.key} onClick={() => pick(r)}
                  className={`w-full rounded-xl border bg-white p-3 text-left transition ${selected?.key === r.key ? "border-blue-500 ring-2 ring-blue-500/20" : "border-zinc-200 hover:border-zinc-400"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{r.business || r.name || r.email}</div>
                      <div className="truncate text-xs text-zinc-500">{r.name && `${r.name} · `}{r.email}</div>
                      {r.website && <div className="truncate text-xs text-zinc-400">{r.website}</div>}
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[r.status] || "bg-zinc-100 text-zinc-600"}`}>{r.status || "new"}</span>
                      <div className="mt-1 text-[11px] text-zinc-400">{ago(r.created)}</div>
                    </div>
                  </div>
                  {sent.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {sent.slice(0, 6).map((e, i) => (
                        <span key={i} className={`rounded px-1.5 py-0.5 text-[10px] ${e.status === "failed" ? "bg-red-100 text-red-700" : "bg-zinc-100 text-zinc-600"}`}>
                          {TEMPLATE_LABEL[e.template] || e.template} · {ago(e.created_at)}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
            {!rows.length && <p className="text-sm text-zinc-500">No leads yet.</p>}
          </div>
        </section>

        <section id="composer" className="h-fit rounded-2xl border border-zinc-200 bg-white p-4 lg:sticky lg:top-20">
          <h2 className="text-sm font-semibold">Send an email</h2>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {TEMPLATES.map((t) => (
              <button key={t.value} onClick={() => setTemplate(t.value)}
                className={`rounded-lg border px-3 py-2 text-left text-sm ${template === t.value ? "border-blue-500 bg-blue-50 font-semibold" : "border-zinc-200"}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {field("to", "Client email *", "client@business.com")}
            <div className="grid grid-cols-2 gap-2">
              {field("name", "Name")}
              {field("business", "Business")}
            </div>
            {field("website", "Current website", "business.com")}

            {template === "previews_ready" && (
              <>
                {field("linkA", "Preview A link *", "https://…-a.workers.dev")}
                {field("linkB", "Preview B link *", "https://…-b.workers.dev")}
                {field("imgA", "Preview A screenshot URL (optional)")}
                {field("imgB", "Preview B screenshot URL (optional)")}
                <label className="block">
                  <span className="text-xs font-semibold text-zinc-600">Preview report PDF (attached to the email)</span>
                  <input id="report-pdf" type="file" accept="application/pdf" onChange={(e) => uploadReport(e.target.files?.[0])} className="mt-1 block w-full text-sm" />
                  <span className="mt-1 block text-xs text-zinc-500">
                    {reportState === "uploading" ? "Uploading…" : reportState === "done" ? `✓ Ready: ${f.reportUrl.split("/").pop()}` : reportState === "error" ? "Upload failed — try again" : "Optional"}
                  </span>
                </label>
                {field("pages", "Pages on the review form", "Home, Services, About, Contact")}
                {field("oldHost", "Current host (auto-detected if empty)", "Wix")}
                <p className="text-xs text-zinc-500">Starts the 24h reminder and 72h expiry timers. The email links to the client's review page (pick A/B, send changes, approve &amp; pay).</p>
              </>
            )}
            {template === "revision_done" && (
              <>
                {field("previewUrl", "Link to updated site *")}
                <p className="text-xs text-zinc-500">
                  Rounds used: {selected?.project?.revision_rounds_used ?? 0} of 2 — the email shows how many free rounds are left automatically.
                </p>
              </>
            )}
            {template === "site_live" && (
              <>
                {field("liveUrl", "Live URL *", "https://business.com")}
                <p className="text-xs text-zinc-500">Uses their go-live answers to tell them exactly what to cancel and what to keep.</p>
              </>
            )}
          </div>

          <div className="mt-4 space-y-3 border-t border-zinc-200 pt-4">
            <label className="block">
              <span className="text-xs font-semibold text-zinc-600">Personal message (optional)</span>
              <textarea value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} rows={5} className={`${input} mt-1`}
                placeholder={`Shows right under "Hi ${f.name ? f.name.split(" ")[0] : "{name}"}," — write it like your own email.`} />
            </label>
            <div>
              <span className="text-xs font-semibold text-zinc-600">Extra attachments (SEO proposal, etc. — up to 5)</span>
              {files.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {files.map((x, i) => (
                    <li key={i} className="flex items-center justify-between gap-2 rounded-lg bg-zinc-50 px-2.5 py-1.5 text-xs">
                      <span className="flex min-w-0 items-center gap-1.5">
                        <Paperclip size={12} className="shrink-0" />
                        <span className="truncate">{x.name}</span>
                        <span className={x.state === "error" ? "text-red-600" : "text-zinc-400"}>{x.state === "uploading" ? "Uploading…" : x.state === "error" ? "Failed" : "✓"}</span>
                      </span>
                      <button onClick={() => setFiles((s) => s.filter((_, j) => j !== i))} aria-label={`Remove ${x.name}`} className="p-1 text-zinc-500"><X size={14} /></button>
                    </li>
                  ))}
                </ul>
              )}
              {files.length < 5 && (
                <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={(e) => { uploadFiles(e.target.files); e.target.value = ""; }} className="mt-1 block w-full text-sm" />
              )}
            </div>
          </div>

          {msg && (
            <p className={`mt-3 flex items-center gap-1.5 text-sm ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>
              {msg.ok && <Check size={14} />} {msg.text}
            </p>
          )}
          <button onClick={openPreview} disabled={previewing}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {previewing ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
            {previewing ? "Loading preview…" : "Preview email"}
          </button>
          <p className="mt-2 text-center text-xs text-zinc-500">Nothing is sent until you press Send in the preview.</p>
        </section>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/50 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Email preview">
          <div className="flex h-full w-full max-w-3xl flex-col bg-white sm:h-[90vh] sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-zinc-200 p-4">
              <div className="min-w-0 text-sm">
                <p className="truncate"><span className="text-zinc-500">To:</span> {preview.to}</p>
                <p className="truncate font-semibold"><span className="font-normal text-zinc-500">Subject:</span> {preview.subject}</p>
                {preview.attachments.length > 0 && (
                  <p className="mt-1 flex flex-wrap gap-1">
                    {preview.attachments.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 text-[11px]"><Paperclip size={10} />{a}</span>
                    ))}
                  </p>
                )}
              </div>
              <button onClick={() => setPreview(null)} className="rounded-lg border border-zinc-300 p-2" aria-label="Close preview"><X size={16} /></button>
            </div>
            <iframe title="Email preview" srcDoc={preview.html} sandbox="" className="min-h-0 w-full flex-1 bg-white" />
            <div className="flex gap-2 border-t border-zinc-200 p-4">
              <button onClick={() => setPreview(null)} className="flex-1 rounded-lg border border-zinc-300 py-3 text-sm font-semibold">Back to edit</button>
              <button onClick={send} disabled={sending}
                className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending…" : `Send to ${preview.to}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
