begin;
select plan(16);

select ok((select relrowsecurity from pg_class where oid = 'public.students'::regclass), 'student records have row level security');
select ok((select relrowsecurity from pg_class where oid = 'public.student_private_details'::regclass), 'private student details have row level security');
select ok((select relrowsecurity from pg_class where oid = 'public.guardian_student_relationships'::regclass), 'guardian links have row level security');
select ok((select relrowsecurity from pg_class where oid = 'public.attendance'::regclass), 'attendance has row level security');
select ok((select relrowsecurity from pg_class where oid = 'public.invoices'::regclass), 'invoices have row level security');
select ok((select relrowsecurity from pg_class where oid = 'public.learning_materials'::regclass), 'learning materials have row level security');
select ok(not has_table_privilege('anon', 'public.students', 'select'), 'anonymous role cannot read students');
select ok(not has_table_privilege('authenticated', 'public.user_roles', 'insert'), 'signed-in users cannot grant roles');
select ok(not has_table_privilege('authenticated', 'public.audit_logs', 'insert'), 'signed-in users cannot forge audit logs');
select ok(not has_column_privilege('authenticated', 'public.notifications', 'title', 'update'), 'signed-in users cannot rewrite notification content');
select ok((select not public from storage.buckets where id = 'learning-materials'), 'learning materials bucket is private');
select ok(not has_table_privilege('authenticated', 'public.conversations', 'insert'), 'users cannot create conversation rows directly');
select ok(not has_table_privilege('authenticated', 'public.conversation_participants', 'insert'), 'users cannot add conversation participants directly');
select ok(not has_function_privilege('anon', 'public.start_student_conversation(uuid,uuid,text)', 'execute'), 'anonymous users cannot start conversations');
select ok(has_function_privilege('authenticated', 'public.start_student_conversation(uuid,uuid,text)', 'execute'), 'authenticated users can start relationship-checked conversations');
select ok(has_function_privilege('authenticated', 'private.can_access_conversation(uuid)', 'execute'), 'conversation access checks are available to RLS policies');

select * from finish();
rollback;
