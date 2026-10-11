-- Revoke every participant-creation path from browser clients. New threads are
-- created atomically by start_student_conversation after checking live links.
drop policy if exists conversations_insert on public.conversations;
revoke insert on public.conversations, public.conversation_participants from anon, authenticated;

-- Keep inbox reads bounded: the list page needs one preview per thread, not a
-- scan of every message in the mailbox.
alter table public.conversations add column last_message_at timestamptz;
alter table public.conversations add column last_message_preview text;
with latest as (
  select distinct on (conversation_id) conversation_id, created_at, body
  from public.messages order by conversation_id, created_at desc, id desc
)
update public.conversations c set last_message_at = latest.created_at, last_message_preview = left(latest.body, 240)
from latest where latest.conversation_id = c.id;

create or replace function private.sync_conversation_message_preview()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  update public.conversations set last_message_at = new.created_at, last_message_preview = left(new.body, 240)
  where id = new.conversation_id and (last_message_at is null or last_message_at <= new.created_at);
  return new;
end
$$;
create trigger message_preview_after_insert after insert on public.messages
for each row execute function private.sync_conversation_message_preview();
revoke all on function private.sync_conversation_message_preview() from public, anon, authenticated;

-- Avoid recursive RLS when checking participants, and immediately remove
-- access if a guardian link or teaching assignment is revoked.
create or replace function private.can_access_conversation(target_conversation uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.has_role('admin') or exists (
    select 1 from public.conversations c
    join public.conversation_participants own on own.conversation_id = c.id and own.user_id = (select auth.uid())
    where c.id = target_conversation and c.student_id is not null and (
      private.is_guardian_of(c.student_id)
      or exists (select 1 from public.students s where s.id = c.student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
      or exists (
        select 1 from public.enrollments e join public.class_groups cg on cg.id = e.class_group_id and cg.status = 'active'
        where e.student_id = c.student_id and e.status = 'active' and private.is_teacher_of(e.class_group_id)
      )
    )
  )
$$;

drop policy if exists conversations_read on public.conversations;
create policy conversations_read on public.conversations for select using (private.can_access_conversation(id));
drop policy if exists participants_read on public.conversation_participants;
create policy participants_read on public.conversation_participants for select using (private.can_access_conversation(conversation_id));
drop policy if exists messages_read on public.messages;
create policy messages_read on public.messages for select using (private.can_access_conversation(conversation_id));
drop policy if exists messages_insert on public.messages;
create policy messages_insert on public.messages for insert with check (
  sender_id = (select auth.uid()) and private.can_access_conversation(conversation_id)
);
revoke execute on function private.can_access_conversation(uuid) from public, anon;
grant execute on function private.can_access_conversation(uuid) to authenticated;

-- Keep RLS authorization in step with active account roles. Previously a
-- revoked teacher/parent role could retain access while the relationship row
-- remained active.
create or replace function private.has_role(required_role public.account_role)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles r
    join public.profiles p on p.id = r.user_id and p.status = 'active'
    where r.user_id = (select auth.uid()) and r.role = required_role and r.revoked_at is null
  )
$$;

create or replace function private.is_guardian_of(target_student uuid, academic boolean default true)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.has_role('parent') and exists (
    select 1 from public.guardian_student_relationships g
    where g.guardian_user_id = (select auth.uid()) and g.student_id = target_student
      and g.revoked_at is null and (not academic or g.can_view_academic)
  )
$$;

create or replace function private.is_teacher_of(target_group uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.has_role('teacher') and exists (
    select 1 from public.teacher_assignments ta
    join public.staff_members sm on sm.id = ta.staff_member_id
    where sm.user_id = (select auth.uid()) and sm.status = 'active'
      and ta.class_group_id = target_group and ta.starts_on <= current_date
      and (ta.ends_on is null or ta.ends_on >= current_date)
  )
$$;

create or replace function private.is_enrolled_in(target_group uuid, target_student uuid default null)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.has_role('adult_student') and exists (
    select 1 from public.enrollments e join public.students s on s.id = e.student_id
    where e.class_group_id = target_group and e.status = 'active'
      and (target_student is null or e.student_id = target_student)
      and s.auth_user_id = (select auth.uid())
  )
$$;

-- Direct own-student branches also require the active domain role.
drop policy if exists students_read on public.students;
create policy students_read on public.students for select using (
  private.has_role('admin')
  or (auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
  or private.is_guardian_of(id)
  or exists (select 1 from public.enrollments e where e.student_id = students.id and private.is_teacher_of(e.class_group_id))
);
drop policy if exists student_private_details_read on public.student_private_details;
create policy student_private_details_read on public.student_private_details for select using (
  private.has_role('admin') or private.is_guardian_of(student_id)
  or exists (select 1 from public.students s where s.id = student_private_details.student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
);
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select using (
  (id = (select auth.uid()) and status = 'active') or private.has_role('admin')
  or exists (select 1 from public.guardian_student_relationships g join public.students s on s.id = g.student_id where g.guardian_user_id = (select auth.uid()) and s.auth_user_id = profiles.id and private.is_guardian_of(g.student_id))
  or exists (select 1 from public.students s join public.enrollments e on e.student_id = s.id join public.teacher_assignments ta on ta.class_group_id = e.class_group_id join public.staff_members sm on sm.id = ta.staff_member_id where s.auth_user_id = profiles.id and private.is_teacher_of(e.class_group_id) and sm.user_id = (select auth.uid()) and sm.status = 'active' and ta.starts_on <= current_date and (ta.ends_on is null or ta.ends_on >= current_date))
);
drop policy if exists attendance_read on public.attendance;
create policy attendance_read on public.attendance for select using (
  private.has_role('admin') or private.is_guardian_of(student_id)
  or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
  or exists (select 1 from public.class_sessions cs where cs.id = session_id and private.is_teacher_of(cs.class_group_id))
);
drop policy if exists submissions_read on public.submissions;
create policy submissions_read on public.submissions for select using (
  private.has_role('admin') or private.is_guardian_of(student_id)
  or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
  or exists (select 1 from public.assignments a where a.id = assignment_id and private.is_teacher_of(a.class_group_id))
);
drop policy if exists progress_read on public.progress_entries;
create policy progress_read on public.progress_entries for select using (
  private.has_role('admin') or private.is_guardian_of(student_id)
  or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
  or (class_group_id is not null and private.is_teacher_of(class_group_id))
);
drop policy if exists results_read on public.assessment_results;
create policy results_read on public.assessment_results for select using (
  private.has_role('admin') or private.is_guardian_of(student_id)
  or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
  or exists (select 1 from public.assessments a where a.id = assessment_id and private.is_teacher_of(a.class_group_id))
);
drop policy if exists invoices_read on public.invoices;
create policy invoices_read on public.invoices for select using (
  private.has_role('admin')
  or (billed_to = (select auth.uid()) and private.has_role('adult_student'))
  or (billed_to = (select auth.uid()) and private.has_role('parent') and exists (select 1 from public.guardian_student_relationships g where g.guardian_user_id = (select auth.uid()) and g.can_view_financial and g.revoked_at is null))
  or (student_id is not null and private.is_guardian_of(student_id, false) and exists (select 1 from public.guardian_student_relationships g where g.guardian_user_id = (select auth.uid()) and g.student_id = invoices.student_id and g.can_view_financial and g.revoked_at is null))
  or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid()) and private.has_role('adult_student'))
);

create or replace function public.start_student_conversation(target_student uuid, target_recipient uuid, first_message text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare new_conversation uuid; actor uuid;
begin
  actor := (select auth.uid());
  if actor is null or target_student is null or target_recipient is null or target_recipient = actor
    or first_message is null or length(btrim(first_message)) not between 1 and 10000 then
    raise exception 'Invalid conversation request' using errcode = '22023';
  end if;

  if not exists (
    select 1
    from public.enrollments e
    join public.class_groups cg on cg.id = e.class_group_id and cg.status = 'active'
    join public.students s on s.id = e.student_id
    where e.student_id = target_student and e.status = 'active' and s.status = 'active'
      and (
        (
          private.is_teacher_of(e.class_group_id)
          and (
            exists (select 1 from public.guardian_student_relationships g join public.user_roles r on r.user_id = g.guardian_user_id and r.role = 'parent' and r.revoked_at is null join public.profiles p on p.id = g.guardian_user_id and p.status = 'active' where g.student_id = s.id and g.guardian_user_id = target_recipient and g.revoked_at is null and g.can_view_academic)
            or (s.auth_user_id = target_recipient and exists (select 1 from public.user_roles r join public.profiles p on p.id = r.user_id and p.status = 'active' where r.user_id = target_recipient and r.role = 'adult_student' and r.revoked_at is null))
          )
        )
        or (
          (private.is_guardian_of(s.id) or (s.auth_user_id = actor and private.has_role('adult_student')))
          and exists (
            select 1 from public.teacher_assignments ta join public.staff_members sm on sm.id = ta.staff_member_id
            join public.user_roles r on r.user_id = sm.user_id and r.role = 'teacher' and r.revoked_at is null
            join public.profiles p on p.id = sm.user_id and p.status = 'active'
            where ta.class_group_id = e.class_group_id and ta.starts_on <= current_date
              and (ta.ends_on is null or ta.ends_on >= current_date) and sm.status = 'active' and sm.user_id = target_recipient
          )
        )
      )
  ) then
    raise exception 'Conversation is outside the active academy relationship' using errcode = '42501';
  end if;

  insert into public.conversations(student_id, created_by) values (target_student, actor) returning id into new_conversation;
  insert into public.conversation_participants(conversation_id, user_id) values (new_conversation, actor), (new_conversation, target_recipient);
  insert into public.messages(conversation_id, sender_id, body) values (new_conversation, actor, btrim(first_message));
  return new_conversation;
end
$$;

revoke all on function public.start_student_conversation(uuid, uuid, text) from public, anon;
grant execute on function public.start_student_conversation(uuid, uuid, text) to authenticated;
