create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  expo_push_token text not null,
  platform text not null check(platform in ('ios','android','web')),
  enabled boolean not null default true,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(user_id,expo_push_token)
);
create table if not exists public.notification_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  direct_messages boolean not null default true,
  group_messages boolean not null default true,
  mentions boolean not null default true,
  reactions boolean not null default true,
  invites boolean not null default true,
  event_reminders boolean not null default true,
  updated_at timestamptz not null default now()
);
create table if not exists public.message_deliveries (
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  delivered_at timestamptz,
  read_at timestamptz,
  primary key(message_id,user_id)
);
alter table public.devices enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.message_deliveries enable row level security;
drop policy if exists devices_self on public.devices;
create policy devices_self on public.devices for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists prefs_self on public.notification_preferences;
create policy prefs_self on public.notification_preferences for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists deliveries_member on public.message_deliveries;
create policy deliveries_member on public.message_deliveries for select to authenticated using(exists(select 1 from public.messages m where m.id=message_id and public.is_conversation_member(m.conversation_id)));
drop policy if exists deliveries_self_update on public.message_deliveries;
create policy deliveries_self_update on public.message_deliveries for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
create index if not exists devices_user_enabled_idx on public.devices(user_id,enabled);
create index if not exists deliveries_message_idx on public.message_deliveries(message_id);
