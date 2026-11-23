-- Preview access rules: no reply 72h, replied 7 days, reopened 48h, paid → open until live.
BEGIN;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS preview_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS replied_at timestamptz,
  ADD COLUMN IF NOT EXISTS reopened_at timestamptz,
  ADD COLUMN IF NOT EXISTS final_sent_at timestamptz;

-- Messages clients leave on the "preview closed" page.
CREATE TABLE IF NOT EXISTS public.preview_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  reasons text[] NOT NULL DEFAULT '{}',
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS preview_messages_project_idx ON public.preview_messages (project_id, created_at DESC);
-- Service role only (edge functions).
ALTER TABLE public.preview_messages ENABLE ROW LEVEL SECURITY;

-- Previews already out: keep their original 72h clock.
UPDATE public.projects
SET preview_expires_at = previews_sent_at + interval '72 hours'
WHERE status = 'previews_sent' AND preview_expires_at IS NULL AND previews_sent_at IS NOT NULL;

COMMIT;
