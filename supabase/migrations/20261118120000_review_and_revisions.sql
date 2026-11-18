-- SwiftLift review flow: client picks A/B and sends changes on /review before paying.
BEGIN;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS report_url text,
  ADD COLUMN IF NOT EXISTS review_pages jsonb,
  ADD COLUMN IF NOT EXISTS old_host text,
  ADD COLUMN IF NOT EXISTS revision_rounds_used integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS approved_at timestamptz;

CREATE TABLE IF NOT EXISTS public.revision_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  round integer NOT NULL,
  selected_preview text NOT NULL CHECK (selected_preview IN ('A', 'B')),
  pages jsonb NOT NULL DEFAULT '[]'::jsonb,    -- [{page, note, use_other_version}]
  overall jsonb NOT NULL DEFAULT '{}'::jsonb,  -- {colors, fonts, photos, logo, other}
  files jsonb NOT NULL DEFAULT '[]'::jsonb,    -- [{path, name}] in storage bucket revision-uploads
  is_paid_round boolean NOT NULL DEFAULT false, -- round 3+ ($45, added to the final payment)
  status text NOT NULL DEFAULT 'new',          -- new | in_progress | done
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX IF NOT EXISTS revision_requests_project_idx ON public.revision_requests (project_id, created_at DESC);
-- Service role only (edge functions). No anon policies on purpose.
ALTER TABLE public.revision_requests ENABLE ROW LEVEL SECURITY;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('client-reports', 'client-reports', true, 20971520, ARRAY['application/pdf']),
  ('revision-uploads', 'revision-uploads', false, 15728640, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf'])
ON CONFLICT (id) DO NOTHING;

COMMIT;
