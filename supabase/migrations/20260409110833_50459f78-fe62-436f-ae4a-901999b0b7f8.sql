
-- Organizations
CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read organizations" ON public.organizations FOR SELECT TO anon USING (true);

-- Clients
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read clients" ON public.clients FOR SELECT TO anon USING (true);

-- Projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_code text NOT NULL,
  project_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read projects" ON public.projects FOR SELECT TO anon USING (true);

-- Addons
CREATE TABLE public.addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  public_name text,
  description text,
  price numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  stripe_payment_link_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read addons" ON public.addons FOR SELECT TO anon USING (true);

-- Bundles
CREATE TABLE public.bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  stripe_payment_link_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read bundles" ON public.bundles FOR SELECT TO anon USING (true);

-- Bundle Items
CREATE TABLE public.bundle_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid NOT NULL REFERENCES public.bundles(id) ON DELETE CASCADE,
  addon_id uuid NOT NULL REFERENCES public.addons(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bundle_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read bundle_items" ON public.bundle_items FOR SELECT TO anon USING (true);

-- Service Items
CREATE TABLE public.service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  price_label text,
  stripe_payment_link_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read service_items" ON public.service_items FOR SELECT TO anon USING (true);

-- Upgrade Access Links
CREATE TABLE public.upgrade_access_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active',
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.upgrade_access_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read upgrade_access_links" ON public.upgrade_access_links FOR SELECT TO anon USING (true);

-- Project Purchases
CREATE TABLE public.project_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_uuid uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  access_link_id uuid NOT NULL REFERENCES public.upgrade_access_links(id) ON DELETE CASCADE,
  item_category text NOT NULL,
  addon_id uuid REFERENCES public.addons(id),
  bundle_id uuid REFERENCES public.bundles(id),
  service_item_id uuid REFERENCES public.service_items(id),
  selected_price numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending',
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.project_purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon insert project_purchases" ON public.project_purchases FOR INSERT TO anon WITH CHECK (true);

-- Upgrade Access Events
CREATE TABLE public.upgrade_access_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_link_id uuid NOT NULL REFERENCES public.upgrade_access_links(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.upgrade_access_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon insert upgrade_access_events" ON public.upgrade_access_events FOR INSERT TO anon WITH CHECK (true);
