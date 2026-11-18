-- Hourly B2 (24h) / B3 (72h) preview reminders via the client-journey function.
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;
select cron.unschedule('swiftlift-preview-reminders') where exists (select 1 from cron.job where jobname = 'swiftlift-preview-reminders');
select cron.schedule(
  'swiftlift-preview-reminders',
  '7 * * * *',
  $$
  select net.http_post(
    url := 'https://czdbnlewbbwbtgjjwute.supabase.co/functions/v1/client-journey',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('action', 'reminders', 'secret', (select value from public.app_config where key = 'cron_secret'))
  );
  $$
);
