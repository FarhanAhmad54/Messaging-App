create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'display_name',split_part(new.email,'@',1))) on conflict(id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.conversation_members;

create or replace function public.create_direct_conversation(p_other_user uuid) returns uuid language plpgsql security invoker set search_path=public as $$
declare cid uuid;
begin
 if p_other_user=auth.uid() then raise exception 'cannot create conversation with yourself'; end if;
 select c.id into cid from conversations c join conversation_members a on a.conversation_id=c.id and a.user_id=auth.uid() join conversation_members b on b.conversation_id=c.id and b.user_id=p_other_user where c.type='direct' limit 1;
 if cid is not null then return cid; end if;
 insert into conversations(type,created_by) values('direct',auth.uid()) returning id into cid;
 insert into conversation_members(conversation_id,user_id,role) values(cid,auth.uid(),'member'),(cid,p_other_user,'member');
 return cid;
end; $$;
grant execute on function public.create_direct_conversation(uuid) to authenticated;
