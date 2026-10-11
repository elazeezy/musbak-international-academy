-- Local-only sample records. Every name and note here is fictional.
insert into public.courses (code, category, active) values
  ('DEMO-QURAN', 'quran', true),
  ('DEMO-TAJWEED', 'quran', true),
  ('DEMO-ARABIC', 'language', true),
  ('DEMO-MATH', 'academics', true)
on conflict (code) do update set active = excluded.active;

insert into public.course_translations (course_id, locale, name, description)
select c.id, lang.locale, lang.name, 'Local demonstration course.'
from public.courses c
cross join (values
  ('en','Qur’an foundations'),('ar','أساسيات القرآن'),('fr','Fondements du Coran')
) as lang(locale,name)
where c.code = 'DEMO-QURAN'
on conflict (course_id, locale) do update set name = excluded.name, description = excluded.description;

insert into public.course_translations (course_id, locale, name, description)
select c.id, lang.locale, lang.name, 'Local demonstration course.'
from public.courses c
cross join (values
  ('en','Tajweed practice'),('ar','تطبيق التجويد'),('fr','Pratique du tajwid')
) as lang(locale,name)
where c.code = 'DEMO-TAJWEED'
on conflict (course_id, locale) do update set name = excluded.name, description = excluded.description;

insert into public.course_translations (course_id, locale, name, description)
select c.id, lang.locale, lang.name, 'Local demonstration course.'
from public.courses c
cross join (values
  ('en','Arabic language'),('ar','اللغة العربية'),('fr','Langue arabe')
) as lang(locale,name)
where c.code = 'DEMO-ARABIC'
on conflict (course_id, locale) do update set name = excluded.name, description = excluded.description;

insert into public.course_translations (course_id, locale, name, description)
select c.id, lang.locale, lang.name, 'Local demonstration course.'
from public.courses c
cross join (values
  ('en','Mathematics support'),('ar','دعم الرياضيات'),('fr','Soutien en mathématiques')
) as lang(locale,name)
where c.code = 'DEMO-MATH'
on conflict (course_id, locale) do update set name = excluded.name, description = excluded.description;

insert into public.academic_years (name, starts_on, ends_on, status)
values (
  'Demo 2026–2027',
  make_date(extract(year from current_date)::integer, 9, 1),
  (make_date(extract(year from current_date)::integer, 9, 1) + interval '1 year - 1 day')::date,
  'active'
)
on conflict (name) do update set starts_on = excluded.starts_on, ends_on = excluded.ends_on, status = excluded.status;
insert into public.terms (academic_year_id, name, starts_on, ends_on)
select id, 'Demo Term 1', starts_on, least(ends_on, starts_on + 119)
from public.academic_years where name = 'Demo 2026–2027'
on conflict (academic_year_id, name) do nothing;

insert into public.class_groups (id, course_id, term_id, name, capacity, status)
select '10000000-0000-4000-8000-000000000001', c.id, t.id, 'Demo Tajweed Circle', 8, 'active'
from public.courses c cross join public.terms t
where c.code = 'DEMO-TAJWEED' and t.name = 'Demo Term 1'
on conflict (id) do update set name = excluded.name, status = excluded.status;
insert into public.class_groups (id, course_id, term_id, name, capacity, status)
select '10000000-0000-4000-8000-000000000002', c.id, t.id, 'Demo Arabic Circle', 8, 'active'
from public.courses c cross join public.terms t
where c.code = 'DEMO-ARABIC' and t.name = 'Demo Term 1'
on conflict (id) do update set name = excluded.name, status = excluded.status;

insert into public.students (id, student_number, display_name, preferred_language, timezone, status)
values
  ('20000000-0000-4000-8000-000000000001', 'DEMO-001', 'Demo Learner One', 'en', 'Europe/London', 'active'),
  ('20000000-0000-4000-8000-000000000002', 'DEMO-002', 'Demo Learner Two', 'ar', 'Asia/Riyadh', 'active'),
  ('20000000-0000-4000-8000-000000000003', 'DEMO-003', 'Demo Adult Learner', 'fr', 'Africa/Dakar', 'active')
on conflict (id) do update set display_name = excluded.display_name, status = excluded.status;
insert into public.student_private_details (student_id, legal_name)
values
  ('20000000-0000-4000-8000-000000000001', 'Demo Learner One'),
  ('20000000-0000-4000-8000-000000000002', 'Demo Learner Two'),
  ('20000000-0000-4000-8000-000000000003', 'Demo Adult Learner')
on conflict (student_id) do update set legal_name = excluded.legal_name;

insert into public.enrollments (student_id, class_group_id, status)
values
  ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','active'),
  ('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000001','active'),
  ('20000000-0000-4000-8000-000000000003','10000000-0000-4000-8000-000000000002','active')
on conflict (student_id, class_group_id) do update set status = excluded.status;

insert into public.schedules (id, class_group_id, weekday, local_start, duration_minutes, timezone, starts_on, ends_on, active)
values
  ('30000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001',extract(dow from current_date + 1)::smallint,'17:00',45,'Europe/London',current_date,current_date + 180,true),
  ('30000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002',extract(dow from current_date + 2)::smallint,'18:00',45,'Africa/Dakar',current_date,current_date + 180,true)
on conflict (id) do update set active = excluded.active;

insert into public.class_sessions (id, class_group_id, starts_at, ends_at, status)
values
  ('40000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001',now() + interval '1 day',now() + interval '1 day 45 minutes','scheduled'),
  ('40000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002',now() + interval '2 days',now() + interval '2 days 45 minutes','scheduled')
on conflict (id) do update set starts_at = excluded.starts_at, ends_at = excluded.ends_at, status = excluded.status;

insert into public.attendance (session_id, student_id, status, note)
values
  ('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','present','Demo attendance'),
  ('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000002','late','Demo attendance')
on conflict (session_id, student_id) do update set status = excluded.status;

insert into public.assignments (id, class_group_id, created_by, title, description, due_at, status)
select '50000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', p.id,
  'Demo recitation review', 'Review the selected passage and note two points to practise.', now() + interval '3 days', 'published'
from public.profiles p order by p.created_at limit 1
on conflict (id) do update set title = excluded.title, status = excluded.status;

insert into public.progress_entries (id, student_id, course_id, class_group_id, author_id, skill, score, note)
select '60000000-0000-4000-8000-000000000001', s.id, c.id, '10000000-0000-4000-8000-000000000001', p.id, 'Recitation confidence', 76, 'Demo progress note — replace with teacher-recorded data.'
from public.students s cross join public.courses c cross join public.profiles p
where s.student_number = 'DEMO-001' and c.code = 'DEMO-TAJWEED'
order by p.created_at limit 1
on conflict (id) do update set score = excluded.score, note = excluded.note;
