-- SwiftLift client journey: project tracking columns, email log, go-live answers, private config, reminder cron.
BEGIN;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS client_email text,
  ADD COLUMN IF NOT EXISTS client_name text,
  ADD COLUMN IF NOT EXISTS business_name text,
  ADD COLUMN IF NOT EXISTS preview_a_image text,
  ADD COLUMN IF NOT EXISTS preview_b_image text,
  ADD COLUMN IF NOT EXISTS previews_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS nudge_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS expired_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS selected_preview text,
  ADD COLUMN IF NOT EXISTS live_url text,
  ADD COLUMN IF NOT EXISTS live_at timestamptz;

CREATE INDEX IF NOT EXISTS projects_client_email_idx ON public.projects (lower(client_email));
CREATE INDEX IF NOT EXISTS projects_status_idx ON public.projects (status);

CREATE TABLE IF NOT EXISTS public.client_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  lead_id uuid,
  to_email text NOT NULL,
  template text NOT NULL,
  subject text,
  resend_id text,
  status text NOT NULL DEFAULT 'sent',
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.client_emails ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.golive_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  client_email text,
  domain text,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  mx_records jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.golive_responses ENABLE ROW LEVEL SECURITY;

-- Private key/value config readable only with the service role (RLS on, no policies).
CREATE TABLE IF NOT EXISTS public.app_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

INSERT INTO public.app_config (key, value)
VALUES
  ('admin_send_key', encode(extensions.gen_random_bytes(12), 'hex')),
  ('cron_secret', encode(extensions.gen_random_bytes(24), 'hex')),
  ('ingest_secret', encode(extensions.gen_random_bytes(24), 'hex'))
ON CONFLICT (key) DO NOTHING;

COMMIT;
