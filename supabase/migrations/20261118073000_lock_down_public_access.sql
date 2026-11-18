-- Lock down what the public (anon) key can do on swiftlift-v2.
-- The website only needs: insert leads + form_submissions, read the price catalog,
-- read one upgrade link + the matching client name / project code, and log upgrade events.
-- Everything else is service-role only (edge functions use the service role).

-- 1) Leads and form submissions: insert only (no more reading everyone's details).
drop policy if exists "Allow anon select" on public.leads;
drop policy if exists "Allow authenticated select" on public.leads;
drop policy if exists "Allow anon select" on public.form_submissions;
drop policy if exists "Allow authenticated select" on public.form_submissions;

-- 2) Projects: anon may read only id + project_code (client-upgrades page). No inserts.
drop policy if exists "Allow anon select" on public.projects;
drop policy if exists "Allow authenticated select" on public.projects;
drop policy if exists "Allow public insert" on public.projects;
drop policy if exists "Allow anon insert" on public.projects;
drop policy if exists "Allow authenticated insert" on public.projects;
revoke select, insert, update, delete on public.projects from anon, authenticated;
grant select (id, project_code) on public.projects to anon;
create policy "anon read project code" on public.projects for select to anon using (true);

-- 3) Payments: only the Stripe webhook (service role) writes them.
drop policy if exists "Allow public insert" on public.payments;

-- 4) Clients: anon may read only id + display_name.
alter table public.clients enable row level security;
revoke select, insert, update, delete on public.clients from anon, authenticated;
grant select (id, display_name) on public.clients to anon;
create policy "anon read client display name" on public.clients for select to anon using (true);

-- 5) Public price catalog: read-only.
do $$
declare t text;
begin
  foreach t in array array['service_items','packages','addons','bundles','bundle_items','add_ons'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke insert, update, delete on public.%I from anon, authenticated', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
end $$;

-- 6) Client upgrade links: readable (looked up by token), not writable. Events: insert only.
alter table public.upgrade_access_links enable row level security;
revoke insert, update, delete on public.upgrade_access_links from anon, authenticated;
create policy "anon read upgrade links" on public.upgrade_access_links for select to anon using (true);

alter table public.upgrade_access_events enable row level security;
revoke select, update, delete on public.upgrade_access_events from anon, authenticated;
create policy "anon log upgrade events" on public.upgrade_access_events for insert to anon with check (true);

-- 7) Everything else: RLS on, no policies = service role only.
do $$
declare t text;
begin
  foreach t in array array['prompt_library','project_prompts','builds','email_templates','workflows','api_logs',
    'client_sessions','asset_variants','organizations','organization_settings','organization_domains',
    'organization_brand_assets','client_contacts','project_versions','system_settings','project_purchases'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;
