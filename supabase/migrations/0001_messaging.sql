create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('direct','group')),
  name text,
  avatar_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('member','admin')),
  joined_at timestamptz not null default now(),
  last_read_message_id uuid,
  last_read_at timestamptz,
  muted boolean not null default false,
  archived boolean not null default false,
  primary key (conversation_id,user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text,
  message_type text not null default 'text' check (message_type in ('text','image','video','file','audio')),
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  deleted_at timestamptz,
  unique(sender_id, client_id)
);

create table if not exists public.message_reactions (
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  emoji text not null,
  created_at timestamptz not null default now(),
  primary key(message_id,user_id,emoji)
);

create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at desc, id desc);
create index if not exists members_user_idx on public.conversation_members(user_id, conversation_id);
create index if not exists conversations_updated_idx on public.conversations(updated_at desc);

create or replace function public.is_conversation_member(p_conversation_id uuid, p_user_id uuid default auth.uid()) returns boolean
language sql stable security invoker set search_path = public as $$
  select exists(select 1 from public.conversation_members m where m.conversation_id=p_conversation_id and m.user_id=p_user_id);
$$;

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.message_reactions enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated using (true);
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update to authenticated using (id=auth.uid()) with check(id=auth.uid());

drop policy if exists conversations_member_select on public.conversations;
create policy conversations_member_select on public.conversations for select to authenticated using (public.is_conversation_member(id));
drop policy if exists conversations_insert on public.conversations;
create policy conversations_insert on public.conversations for insert to authenticated with check (created_by=auth.uid());

drop policy if exists members_select on public.conversation_members;
create policy members_select on public.conversation_members for select to authenticated using (public.is_conversation_member(conversation_id));
drop policy if exists members_insert_self on public.conversation_members;
create policy members_insert_self on public.conversation_members for insert to authenticated with check (user_id=auth.uid() or exists(select 1 from public.conversation_members x where x.conversation_id=conversation_id and x.user_id=auth.uid() and x.role='admin'));
drop policy if exists members_update_self on public.conversation_members;
create policy members_update_self on public.conversation_members for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());

drop policy if exists messages_select_member on public.messages;
create policy messages_select_member on public.messages for select to authenticated using(public.is_conversation_member(conversation_id));
drop policy if exists messages_insert_member on public.messages;
create policy messages_insert_member on public.messages for insert to authenticated with check(sender_id=auth.uid() and public.is_conversation_member(conversation_id));
drop policy if exists messages_update_sender on public.messages;
create policy messages_update_sender on public.messages for update to authenticated using(sender_id=auth.uid()) with check(sender_id=auth.uid());
drop policy if exists messages_delete_sender on public.messages;
create policy messages_delete_sender on public.messages for delete to authenticated using(sender_id=auth.uid());

drop policy if exists reactions_member on public.message_reactions;
create policy reactions_member on public.message_reactions for select to authenticated using(exists(select 1 from public.messages msg where msg.id=message_id and public.is_conversation_member(msg.conversation_id)));
drop policy if exists reactions_write_self on public.message_reactions;
create policy reactions_write_self on public.message_reactions for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());

create or replace function public.touch_conversation() returns trigger language plpgsql as $$ begin update public.conversations set updated_at=now() where id=new.conversation_id; return new; end; $$;
drop trigger if exists messages_touch_conversation on public.messages;
create trigger messages_touch_conversation after insert on public.messages for each row execute function public.touch_conversation();

alter table public.messages replica identity full;
alter table public.conversations replica identity full;
