-- Musbak Academy platform foundation. Apply with `supabase db push` after review.
create extension if not exists pgcrypto with schema extensions;

create type public.account_role as enum ('admin', 'teacher', 'parent', 'adult_student');
create type public.record_status as enum ('active', 'inactive', 'archived');
create type public.class_status as enum ('draft', 'active', 'completed', 'cancelled');
create type public.attendance_status as enum ('present', 'absent', 'late', 'excused');
create type public.work_status as enum ('draft', 'published', 'closed');
create type public.invoice_status as enum ('draft', 'issued', 'partially_paid', 'paid', 'overdue', 'void');
create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  phone text,
  preferred_language text not null default 'en' check (preferred_language in ('en','ar','fr')),
  timezone text not null default 'UTC',
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.account_role not null,
  granted_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (user_id, role)
);
create index user_roles_active_idx on public.user_roles(user_id, role) where revoked_at is null;

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role public.account_role not null check (role <> 'admin'),
  invited_by uuid not null references public.profiles(id),
  auth_user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','accepted','expired','revoked','failed')),
  expires_at timestamptz not null default now() + interval '7 days',
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);
create unique index invitations_pending_email_role_idx on public.invitations(lower(email), role) where status = 'pending';

create table public.staff_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  staff_number text unique,
  title text,
  status public.record_status not null default 'active',
  started_on date,
  ended_on date,
  created_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references public.profiles(id) on delete set null,
  student_number text unique,
  display_name text not null,
  preferred_language text not null default 'en' check (preferred_language in ('en','ar','fr')),
  timezone text not null default 'UTC',
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index students_name_idx on public.students using gin (to_tsvector('simple', display_name));
create index students_active_idx on public.students(status, display_name);
create table public.student_private_details (
  student_id uuid primary key references public.students(id) on delete cascade,
  legal_name text not null,
  date_of_birth date,
  created_at timestamptz not null default now()
);

create table public.guardian_student_relationships (
  id uuid primary key default gen_random_uuid(),
  guardian_user_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  relationship text not null default 'guardian',
  can_view_academic boolean not null default true,
  can_view_financial boolean not null default false,
  can_manage boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (guardian_user_id, student_id)
);
create index guardian_student_by_guardian_idx on public.guardian_student_relationships(guardian_user_id, student_id) where revoked_at is null;
create index guardian_student_by_student_idx on public.guardian_student_relationships(student_id, guardian_user_id) where revoked_at is null;

create table public.academic_years (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  starts_on date not null,
  ends_on date not null,
  status public.record_status not null default 'active',
  check (ends_on > starts_on)
);
create table public.terms (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references public.academic_years(id),
  name text not null,
  starts_on date not null,
  ends_on date not null,
  check (ends_on > starts_on),
  unique (academic_year_id, name)
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  category text not null default 'quran',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.course_translations (
  course_id uuid not null references public.courses(id) on delete cascade,
  locale text not null check (locale in ('en','ar','fr')),
  name text not null,
  description text not null default '',
  primary key (course_id, locale)
);

create table public.class_groups (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id),
  term_id uuid references public.terms(id),
  name text not null,
  capacity integer check (capacity is null or capacity > 0),
  status public.class_status not null default 'draft',
  created_at timestamptz not null default now()
);
create index class_groups_status_idx on public.class_groups(status, course_id);
create table public.teacher_assignments (
  id uuid primary key default gen_random_uuid(),
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  staff_member_id uuid not null references public.staff_members(id) on delete cascade,
  starts_on date not null default current_date,
  ends_on date,
  created_at timestamptz not null default now(),
  check (ends_on is null or ends_on >= starts_on),
  unique (class_group_id, staff_member_id, starts_on)
);
create index teacher_assignments_staff_idx on public.teacher_assignments(staff_member_id, class_group_id);
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  status public.record_status not null default 'active',
  enrolled_at timestamptz not null default now(),
  ended_at timestamptz,
  unique (student_id, class_group_id)
);
create index enrollments_group_idx on public.enrollments(class_group_id, status, student_id);
create index enrollments_student_idx on public.enrollments(student_id, status, class_group_id);

create table public.schedules (
  id uuid primary key default gen_random_uuid(),
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  local_start time not null,
  duration_minutes smallint not null check (duration_minutes between 10 and 240),
  timezone text not null,
  starts_on date not null,
  ends_on date,
  active boolean not null default true,
  check (ends_on is null or ends_on >= starts_on)
);
create index schedules_group_idx on public.schedules(class_group_id, active, weekday);
create table public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled','completed','cancelled')),
  meeting_url text,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at),
  unique (class_group_id, starts_at)
);
create index class_sessions_upcoming_idx on public.class_sessions(starts_at, class_group_id) where status = 'scheduled';

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_sessions(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  status public.attendance_status not null,
  note text,
  recorded_by uuid references public.profiles(id) on delete set null,
  recorded_at timestamptz not null default now(),
  unique (session_id, student_id)
);
create index attendance_student_idx on public.attendance(student_id, recorded_at desc);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  title text not null,
  description text not null default '',
  due_at timestamptz,
  status public.work_status not null default 'draft',
  created_at timestamptz not null default now()
);
create index assignments_group_due_idx on public.assignments(class_group_id, due_at) where status = 'published';
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  text_response text,
  submitted_at timestamptz,
  grade numeric(6,2),
  feedback text,
  graded_by uuid references public.profiles(id) on delete set null,
  graded_at timestamptz,
  unique (assignment_id, student_id),
  check (grade is null or grade >= 0)
);
create index submissions_student_idx on public.submissions(student_id, submitted_at desc);

-- Private teacher-to-student materials, separate from assignment submissions.
create table public.learning_materials (
  id uuid primary key default gen_random_uuid(),
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  student_id uuid references public.students(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  title text not null,
  description text not null default '',
  bucket text not null default 'learning-materials',
  object_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes between 1 and 52428800),
  created_at timestamptz not null default now()
);
create index learning_materials_class_idx on public.learning_materials(class_group_id, created_at desc);
create index learning_materials_student_idx on public.learning_materials(student_id, created_at desc);

create table public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  class_group_id uuid references public.class_groups(id) on delete set null,
  author_id uuid not null references public.profiles(id),
  skill text not null,
  score numeric(5,2) check (score is null or score between 0 and 100),
  note text not null default '',
  created_at timestamptz not null default now()
);
create index progress_student_idx on public.progress_entries(student_id, created_at desc);
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  class_group_id uuid not null references public.class_groups(id) on delete cascade,
  created_by uuid not null references public.profiles(id),
  title text not null,
  max_score numeric(7,2) not null check (max_score > 0),
  assessed_at timestamptz not null default now()
);
create table public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  score numeric(7,2) not null check (score >= 0),
  feedback text not null default '',
  unique (assessment_id, student_id)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  billed_to uuid not null references public.profiles(id),
  student_id uuid references public.students(id) on delete set null,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  total_minor bigint not null check (total_minor >= 0),
  status public.invoice_status not null default 'draft',
  due_at timestamptz,
  created_at timestamptz not null default now()
);
create index invoices_billed_to_idx on public.invoices(billed_to, status, due_at);
create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric(8,2) not null default 1 check (quantity > 0),
  amount_minor bigint not null check (amount_minor >= 0)
);
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id),
  provider text not null,
  provider_reference text not null,
  amount_minor bigint not null check (amount_minor > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  status public.payment_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, provider_reference)
);

create or replace function public.validate_payment_amount()
returns trigger language plpgsql security definer set search_path = '' as $$
declare invoice_total bigint; invoice_currency text; invoice_state public.invoice_status; already_paid bigint;
begin
  select total_minor, currency, status into invoice_total, invoice_currency, invoice_state
  from public.invoices where id = new.invoice_id for update;
  if not found or invoice_state in ('draft','void') then
    raise exception 'Invoice is not payable' using errcode = '23514';
  end if;
  if new.currency <> invoice_currency then
    raise exception 'Payment currency does not match invoice' using errcode = '23514';
  end if;
  if tg_op = 'UPDATE' and (new.invoice_id <> old.invoice_id or new.currency <> old.currency or new.amount_minor <> old.amount_minor) then
    raise exception 'Payment identity and amount are immutable' using errcode = '23514';
  end if;
  if new.status = 'succeeded' then
    select coalesce(sum(amount_minor), 0) into already_paid from public.payments
    where invoice_id = new.invoice_id and status = 'succeeded' and id <> new.id;
    if already_paid + new.amount_minor > invoice_total then
      raise exception 'Payment exceeds invoice balance' using errcode = '23514';
    end if;
  end if;
  return new;
end
$$;
create trigger payment_amount_guard before insert or update on public.payments for each row execute function public.validate_payment_amount();

create or replace function public.sync_invoice_payment_status()
returns trigger language plpgsql security definer set search_path = '' as $$
declare target_invoice uuid; invoice_total bigint; invoice_due timestamptz; invoice_state public.invoice_status; paid_total bigint;
begin
  target_invoice := case when tg_op = 'DELETE' then old.invoice_id else new.invoice_id end;
  select total_minor, due_at, status into invoice_total, invoice_due, invoice_state from public.invoices where id = target_invoice for update;
  if not found or invoice_state in ('draft','void') then
    if tg_op = 'DELETE' then return old; else return new; end if;
  end if;
  select coalesce(sum(amount_minor), 0) into paid_total from public.payments where invoice_id = target_invoice and status = 'succeeded';
  update public.invoices set status = case
    when paid_total >= invoice_total then 'paid'::public.invoice_status
    when paid_total > 0 then 'partially_paid'::public.invoice_status
    when invoice_due is not null and invoice_due < now() then 'overdue'::public.invoice_status
    else 'issued'::public.invoice_status end
  where id = target_invoice;
  if tg_op = 'DELETE' then return old; else return new; end if;
end
$$;
create trigger payment_invoice_status after insert or update or delete on public.payments for each row execute function public.sync_invoice_payment_status();

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete set null,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);
create table public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (conversation_id, user_id)
);
create index conversation_participants_user_idx on public.conversation_participants(user_id, conversation_id);
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null check (length(body) between 1 and 10000),
  created_at timestamptz not null default now()
);
create index messages_conversation_idx on public.messages(conversation_id, created_at desc);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  source_key text,
  title text not null,
  body text not null default '',
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, event_type, source_key)
);
create index notifications_inbox_idx on public.notifications(user_id, created_at desc) where read_at is null;
create table public.notification_outbox (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  idempotency_key text not null unique,
  status text not null default 'pending' check (status in ('pending','processing','sent','failed')),
  attempts smallint not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index notification_outbox_ready_idx on public.notification_outbox(available_at) where status = 'pending';

create table public.files (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  object_path text not null,
  uploaded_by uuid not null references public.profiles(id),
  purpose text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  created_at timestamptz not null default now(),
  unique (bucket, object_path)
);
create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id text,
  safe_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_target_idx on public.audit_logs(target_table, target_id, created_at desc);
create index audit_logs_actor_idx on public.audit_logs(actor_id, created_at desc);
create table public.system_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_auth_user_created()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, display_name, preferred_language)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1)),
    case when new.raw_user_meta_data ->> 'preferred_language' in ('en','ar','fr') then new.raw_user_meta_data ->> 'preferred_language' else 'en' end
  ) on conflict (id) do nothing;
  return new;
end
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_auth_user_created();

create or replace function public.write_audit_log()
returns trigger language plpgsql security definer set search_path = '' as $$
declare record_id text;
begin
  record_id := coalesce(to_jsonb(new) ->> 'id', to_jsonb(old) ->> 'id');
  insert into public.audit_logs(actor_id, action, target_table, target_id, safe_details)
  values ((select auth.uid()), lower(tg_op), tg_table_name, record_id, jsonb_build_object('operation', lower(tg_op)));
  if tg_op = 'DELETE' then return old; end if;
  return new;
end
$$;
create trigger audit_invitations after insert or update or delete on public.invitations for each row execute function public.write_audit_log();
create trigger audit_user_roles after insert or update or delete on public.user_roles for each row execute function public.write_audit_log();
create trigger audit_guardian_links after insert or update or delete on public.guardian_student_relationships for each row execute function public.write_audit_log();
create trigger audit_students after insert or update or delete on public.students for each row execute function public.write_audit_log();
create trigger audit_student_private_details after insert or update or delete on public.student_private_details for each row execute function public.write_audit_log();
create trigger audit_enrollments after insert or update or delete on public.enrollments for each row execute function public.write_audit_log();
create trigger audit_attendance after insert or update or delete on public.attendance for each row execute function public.write_audit_log();
create trigger audit_progress after insert or update or delete on public.progress_entries for each row execute function public.write_audit_log();
create trigger audit_invoices after insert or update or delete on public.invoices for each row execute function public.write_audit_log();
create trigger audit_payments after insert or update or delete on public.payments for each row execute function public.write_audit_log();
create trigger audit_learning_materials after insert or update or delete on public.learning_materials for each row execute function public.write_audit_log();

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.has_role(required_role public.account_role)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles r where r.user_id = (select auth.uid()) and r.role = required_role and r.revoked_at is null)
$$;
create or replace function private.is_guardian_of(target_student uuid, academic boolean default true)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.guardian_student_relationships g where g.guardian_user_id = (select auth.uid()) and g.student_id = target_student and g.revoked_at is null and (not academic or g.can_view_academic))
$$;
create or replace function private.is_teacher_of(target_group uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.teacher_assignments ta join public.staff_members sm on sm.id = ta.staff_member_id
    where sm.user_id = (select auth.uid()) and sm.status = 'active' and ta.class_group_id = target_group
      and ta.starts_on <= current_date and (ta.ends_on is null or ta.ends_on >= current_date)
  )
$$;
create or replace function private.is_enrolled_in(target_group uuid, target_student uuid default null)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.enrollments e join public.students s on s.id = e.student_id
    where e.class_group_id = target_group and e.status = 'active' and (target_student is null or e.student_id = target_student) and s.auth_user_id = (select auth.uid())
  )
$$;
create or replace function private.is_classmate(target_student uuid, target_group uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.enrollments e where e.student_id = target_student and e.class_group_id = target_group and e.status = 'active')
$$;

create or replace function public.grade_submission(target_submission uuid, new_grade numeric, new_feedback text)
returns void language plpgsql security definer set search_path = '' as $$
declare assigned_group uuid; learner uuid;
begin
  if not private.has_role('admin') and not private.has_role('teacher') then
    raise exception 'Not authorized to grade submissions' using errcode = '42501';
  end if;
  select a.class_group_id, s.student_id into assigned_group, learner
  from public.submissions s join public.assignments a on a.id = s.assignment_id
  where s.id = target_submission for update of s;
  if assigned_group is null or learner is null then
    raise exception 'Submission not found' using errcode = 'P0002';
  end if;
  if not private.has_role('admin') and (not private.is_teacher_of(assigned_group) or not private.is_classmate(learner, assigned_group)) then
    raise exception 'Not authorized for this class' using errcode = '42501';
  end if;
  if new_grade is null or new_grade < 0 or length(new_feedback) > 4000 then
    raise exception 'Invalid grade or feedback' using errcode = '22023';
  end if;
  update public.submissions set grade = new_grade, feedback = new_feedback, graded_by = (select auth.uid()), graded_at = now() where id = target_submission;
end
$$;

-- RLS: deny by default, then allow access only through role or live relationship.
do $$ declare t text; begin
  foreach t in array array[
    'profiles','user_roles','invitations','staff_members','students','student_private_details','guardian_student_relationships','academic_years','terms','courses','course_translations','class_groups','teacher_assignments','enrollments','schedules','class_sessions','attendance','assignments','submissions','learning_materials','progress_entries','assessments','assessment_results','invoices','invoice_items','payments','conversations','conversation_participants','messages','notifications','notification_outbox','files','audit_logs','system_settings'
  ] loop execute format('alter table public.%I enable row level security', t); end loop;
end $$;

create policy profiles_read on public.profiles for select using (id = (select auth.uid()) or private.has_role('admin') or exists (select 1 from public.guardian_student_relationships g join public.students s on s.id = g.student_id where g.guardian_user_id = (select auth.uid()) and s.auth_user_id = profiles.id and g.revoked_at is null) or exists (select 1 from public.students s join public.enrollments e on e.student_id = s.id join public.teacher_assignments ta on ta.class_group_id = e.class_group_id join public.staff_members sm on sm.id = ta.staff_member_id where s.auth_user_id = profiles.id and sm.user_id = (select auth.uid()) and sm.status = 'active' and ta.starts_on <= current_date and (ta.ends_on is null or ta.ends_on >= current_date)));
create policy profiles_update_self on public.profiles for update using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy user_roles_read on public.user_roles for select using (user_id = (select auth.uid()) or private.has_role('admin'));
create policy invitations_admin on public.invitations for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy staff_read on public.staff_members for select using (user_id = (select auth.uid()) or private.has_role('admin'));
create policy staff_admin_write on public.staff_members for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy students_read on public.students for select using (private.has_role('admin') or auth_user_id = (select auth.uid()) or private.is_guardian_of(id) or exists (select 1 from public.enrollments e where e.student_id = students.id and private.is_teacher_of(e.class_group_id)));
create policy students_admin_write on public.students for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy student_private_details_read on public.student_private_details for select using (private.has_role('admin') or private.is_guardian_of(student_id) or exists (select 1 from public.students s where s.id = student_private_details.student_id and s.auth_user_id = (select auth.uid())));
create policy student_private_details_admin_write on public.student_private_details for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy guardian_links_read on public.guardian_student_relationships for select using (guardian_user_id = (select auth.uid()) or private.has_role('admin') or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())));
create policy guardian_links_admin_write on public.guardian_student_relationships for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy years_read on public.academic_years for select using (private.has_role('admin') or private.has_role('teacher') or private.has_role('parent') or private.has_role('adult_student'));
create policy years_admin_write on public.academic_years for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy terms_read on public.terms for select using (private.has_role('admin') or private.has_role('teacher') or private.has_role('parent') or private.has_role('adult_student'));
create policy terms_admin_write on public.terms for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy courses_read on public.courses for select using (active or private.has_role('admin') or private.has_role('teacher'));
create policy courses_admin_write on public.courses for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy course_translations_read on public.course_translations for select using (exists (select 1 from public.courses c where c.id = course_id and (c.active or private.has_role('admin') or private.has_role('teacher'))));
create policy course_translations_admin_write on public.course_translations for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy groups_read on public.class_groups for select using (private.has_role('admin') or private.is_teacher_of(class_groups.id) or exists (select 1 from public.enrollments e where e.class_group_id = class_groups.id and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(class_groups.id, e.student_id))));
create policy groups_admin_write on public.class_groups for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy teacher_assignments_read on public.teacher_assignments for select using (private.has_role('admin') or private.is_teacher_of(teacher_assignments.class_group_id) or exists (select 1 from public.enrollments e where e.class_group_id = teacher_assignments.class_group_id and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(teacher_assignments.class_group_id, e.student_id))));
create policy teacher_assignments_admin_write on public.teacher_assignments for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy enrollments_read on public.enrollments for select using (private.has_role('admin') or private.is_teacher_of(class_group_id) or private.is_guardian_of(student_id) or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())));
create policy enrollments_admin_write on public.enrollments for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy schedules_read on public.schedules for select using (private.has_role('admin') or private.is_teacher_of(schedules.class_group_id) or exists (select 1 from public.enrollments e where e.class_group_id = schedules.class_group_id and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(schedules.class_group_id, e.student_id))));
create policy schedules_admin_write on public.schedules for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy sessions_read on public.class_sessions for select using (private.has_role('admin') or private.is_teacher_of(class_sessions.class_group_id) or exists (select 1 from public.enrollments e where e.class_group_id = class_sessions.class_group_id and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(class_sessions.class_group_id, e.student_id))));
create policy sessions_admin_write on public.class_sessions for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy attendance_read on public.attendance for select using (private.has_role('admin') or private.is_guardian_of(student_id) or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())) or exists (select 1 from public.class_sessions cs where cs.id = session_id and private.is_teacher_of(cs.class_group_id)));
create policy attendance_teacher_write on public.attendance for all using (private.has_role('admin') or exists (select 1 from public.class_sessions cs where cs.id = session_id and private.is_teacher_of(cs.class_group_id))) with check (private.has_role('admin') or exists (select 1 from public.class_sessions cs where cs.id = session_id and private.is_teacher_of(cs.class_group_id) and private.is_classmate(student_id, cs.class_group_id)));
create policy assignments_read on public.assignments for select using (private.has_role('admin') or private.is_teacher_of(assignments.class_group_id) or exists (select 1 from public.enrollments e where e.class_group_id = assignments.class_group_id and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(assignments.class_group_id, e.student_id))));
create policy assignments_teacher_write on public.assignments for all using (private.has_role('admin') or private.is_teacher_of(class_group_id)) with check (private.has_role('admin') or (private.is_teacher_of(class_group_id) and created_by = (select auth.uid())));
create policy submissions_read on public.submissions for select using (private.has_role('admin') or private.is_guardian_of(student_id) or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())) or exists (select 1 from public.assignments a where a.id = assignment_id and private.is_teacher_of(a.class_group_id)));
create policy submissions_student_insert on public.submissions for insert with check (exists (select 1 from public.students s join public.assignments a on a.id = submissions.assignment_id join public.enrollments e on e.class_group_id = a.class_group_id and e.student_id = s.id and e.status = 'active' where s.id = submissions.student_id and (s.auth_user_id = (select auth.uid()) or private.is_guardian_of(s.id))));
create policy submissions_owner_update on public.submissions for update using (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid()))) with check (exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())));
create policy materials_read on public.learning_materials for select using (private.has_role('admin') or private.is_teacher_of(learning_materials.class_group_id) or exists (select 1 from public.enrollments e where e.class_group_id = learning_materials.class_group_id and (learning_materials.student_id is null or e.student_id = learning_materials.student_id) and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(e.class_group_id, e.student_id))));
create policy materials_teacher_insert on public.learning_materials for insert with check (private.has_role('admin') or (private.is_teacher_of(class_group_id) and uploaded_by = (select auth.uid()) and (student_id is null or private.is_classmate(student_id, class_group_id))));
create policy materials_teacher_delete on public.learning_materials for delete using (private.has_role('admin') or (uploaded_by = (select auth.uid()) and private.is_teacher_of(class_group_id)));
create policy progress_read on public.progress_entries for select using (private.has_role('admin') or private.is_guardian_of(student_id) or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())) or (class_group_id is not null and private.is_teacher_of(class_group_id)));
create policy progress_teacher_write on public.progress_entries for all using (private.has_role('admin') or (class_group_id is not null and private.is_teacher_of(class_group_id))) with check (private.has_role('admin') or (class_group_id is not null and private.is_teacher_of(class_group_id) and author_id = (select auth.uid()) and private.is_classmate(student_id, class_group_id)));
create policy assessments_read on public.assessments for select using (private.has_role('admin') or private.is_teacher_of(assessments.class_group_id) or exists (select 1 from public.enrollments e where e.class_group_id = assessments.class_group_id and (private.is_guardian_of(e.student_id) or private.is_enrolled_in(assessments.class_group_id, e.student_id))));
create policy assessments_teacher_write on public.assessments for all using (private.has_role('admin') or private.is_teacher_of(class_group_id)) with check (private.has_role('admin') or (private.is_teacher_of(class_group_id) and created_by = (select auth.uid())));
create policy results_read on public.assessment_results for select using (private.has_role('admin') or private.is_guardian_of(student_id) or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())) or exists (select 1 from public.assessments a where a.id = assessment_id and private.is_teacher_of(a.class_group_id)));
create policy results_teacher_write on public.assessment_results for all using (private.has_role('admin') or exists (select 1 from public.assessments a where a.id = assessment_id and private.is_teacher_of(a.class_group_id))) with check (private.has_role('admin') or exists (select 1 from public.assessments a where a.id = assessment_id and private.is_teacher_of(a.class_group_id) and private.is_classmate(student_id, a.class_group_id)));
create policy invoices_read on public.invoices for select using (private.has_role('admin') or billed_to = (select auth.uid()) or (student_id is not null and exists (select 1 from public.guardian_student_relationships g where g.guardian_user_id = (select auth.uid()) and g.student_id = invoices.student_id and g.can_view_financial and g.revoked_at is null)) or exists (select 1 from public.students s where s.id = student_id and s.auth_user_id = (select auth.uid())));
create policy invoices_admin_write on public.invoices for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy invoice_items_read on public.invoice_items for select using (exists (select 1 from public.invoices i where i.id = invoice_id));
create policy invoice_items_admin_write on public.invoice_items for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy payments_read on public.payments for select using (exists (select 1 from public.invoices i where i.id = invoice_id));
create policy payments_admin_write on public.payments for all using (private.has_role('admin')) with check (private.has_role('admin'));
create policy conversations_read on public.conversations for select using (private.has_role('admin') or exists (select 1 from public.conversation_participants p where p.conversation_id = id and p.user_id = (select auth.uid())));
create policy conversations_insert on public.conversations for insert with check (created_by = (select auth.uid()));
create policy participants_read on public.conversation_participants for select using (user_id = (select auth.uid()) or private.has_role('admin') or exists (select 1 from public.conversation_participants p where p.conversation_id = conversation_participants.conversation_id and p.user_id = (select auth.uid())));
create policy messages_read on public.messages for select using (private.has_role('admin') or exists (select 1 from public.conversation_participants p where p.conversation_id = messages.conversation_id and p.user_id = (select auth.uid())));
create policy messages_insert on public.messages for insert with check (sender_id = (select auth.uid()) and exists (select 1 from public.conversation_participants p where p.conversation_id = messages.conversation_id and p.user_id = (select auth.uid())));
create policy notifications_self on public.notifications for select using (user_id = (select auth.uid()));
create policy notifications_read_update on public.notifications for update using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy files_admin_read on public.files for select using (private.has_role('admin') or uploaded_by = (select auth.uid()));
create policy files_insert_self on public.files for insert with check (uploaded_by = (select auth.uid()));
create policy audit_admin_read on public.audit_logs for select using (private.has_role('admin'));
create policy settings_read on public.system_settings for select using (private.has_role('admin'));
create policy settings_write on public.system_settings for all using (private.has_role('admin')) with check (private.has_role('admin'));

grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;
-- Role changes, audit logs, and outbox processing are server-only.
revoke all on public.user_roles, public.audit_logs, public.notification_outbox from anon, authenticated;
grant select on public.user_roles, public.audit_logs to authenticated;
revoke update on public.profiles from anon, authenticated;
grant update (display_name, phone, preferred_language, timezone) on public.profiles to authenticated;
revoke insert, update, delete on public.notifications from anon, authenticated;
grant update (read_at) on public.notifications to authenticated;
revoke insert, update on public.submissions from anon, authenticated;
grant insert (assignment_id, student_id, text_response, submitted_at) on public.submissions to authenticated;
grant update (text_response, submitted_at) on public.submissions to authenticated;
revoke execute on function private.has_role(public.account_role) from public, anon;
revoke execute on function private.is_guardian_of(uuid, boolean) from public, anon;
revoke execute on function private.is_teacher_of(uuid) from public, anon;
revoke execute on function private.is_enrolled_in(uuid, uuid) from public, anon;
revoke execute on function private.is_classmate(uuid, uuid) from public, anon;
grant execute on function private.has_role(public.account_role) to authenticated;
grant execute on function private.is_guardian_of(uuid, boolean) to authenticated;
grant execute on function private.is_teacher_of(uuid) to authenticated;
grant execute on function private.is_enrolled_in(uuid, uuid) to authenticated;
grant execute on function private.is_classmate(uuid, uuid) to authenticated;
revoke execute on function public.grade_submission(uuid, numeric, text) from public, anon;
grant execute on function public.grade_submission(uuid, numeric, text) to authenticated;

-- Storage is private. Object names begin with the owning material UUID and are
-- only readable when the matching learning_materials row is visible under RLS.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('learning-materials','learning-materials',false,52428800,array['application/pdf','image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','video/mp4','text/plain'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy learning_material_objects_read on storage.objects for select to authenticated using (
  bucket_id = 'learning-materials' and exists (
    select 1 from public.learning_materials m where m.object_path = name
  )
);
create policy learning_material_objects_upload on storage.objects for insert to authenticated with check (
  bucket_id = 'learning-materials' and (storage.foldername(name))[1] = (select auth.uid())::text and exists (
    select 1 from public.learning_materials m where m.object_path = name and m.uploaded_by = (select auth.uid()) and private.is_teacher_of(m.class_group_id)
  )
);
create policy learning_material_objects_delete on storage.objects for delete to authenticated using (
  bucket_id = 'learning-materials' and exists (select 1 from public.learning_materials m where m.object_path = name and (m.uploaded_by = (select auth.uid()) or private.has_role('admin')))
);
