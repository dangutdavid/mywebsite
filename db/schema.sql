create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text not null,
  email text not null,
  telephone text,
  service text not null,
  summary text not null,
  timing text not null,
  budget text,
  preferred_contact text not null,
  consent boolean not null default false,
  status text not null default 'new',
  source_path text,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table leads add column if not exists internal_notes text not null default '';
alter table leads add column if not exists next_action_date date;
alter table leads add column if not exists follow_up_status text not null default 'none';

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx on leads (lower(email));
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_next_action_date_idx on leads (next_action_date);

create or replace function set_leads_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
before update on leads
for each row
execute function set_leads_updated_at();
