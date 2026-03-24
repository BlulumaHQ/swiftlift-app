-- Create leads table
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  company_name text,
  website_url text,
  timeline text,
  notes text,
  source_app text DEFAULT 'landing_page',
  created_at timestamptz DEFAULT now()
);

-- Create form_submissions table
CREATE TABLE public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_app text DEFAULT 'landing_page',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form, no auth required)
CREATE POLICY "Allow anonymous insert on leads"
  ON public.leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on form_submissions"
  ON public.form_submissions FOR INSERT
  TO anon
  WITH CHECK (true);