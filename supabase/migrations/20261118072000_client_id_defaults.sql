-- projects/leads/payments.client_id were NOT NULL with no default; new SwiftLift rows get a generated id.
alter table public.projects alter column client_id set default ('swl-' || gen_random_uuid()::text);
alter table public.leads alter column client_id set default ('swl-' || gen_random_uuid()::text);
alter table public.payments alter column client_id set default 'stripe-direct';
