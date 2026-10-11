# Musbak Academy platform setup

## Local development

1. Install dependencies: `npm install`.
2. Install the Supabase CLI and Docker Desktop, then run `supabase start`.
3. Copy `.env.example` to `.env.local`. Fill in the local API URL and publishable key shown by `supabase status`, and put the local secret key in `SUPABASE_SECRET_KEY`. Never use the secret key in a `NEXT_PUBLIC_` variable or browser code.
4. Run `supabase db reset` to apply migrations and load fictional sample courses, classes and students.
5. Create the first local admin Auth user in Supabase Studio. Use Studio's SQL editor to grant that exact Auth user the admin role:

   ```sql
   insert into public.user_roles (user_id, role)
   select id, 'admin'::public.account_role
   from auth.users
   where lower(email) = lower('your-local-admin@example.test')
   on conflict (user_id, role) do update set revoked_at = null;
   ```

   Replace the example email with the local Auth account you created. No user is promoted automatically.
6. Run `npm run dev` and open `/en/login` (or `/ar/login`, `/fr/login`).

The SQL seed contains fictional course/class/learner records. To create a complete local demonstration set (admin, teacher, two guardians with shared children, adult student, schedules, attendance, assignment/submission, progress, invoice and notifications), run `npm run seed:demo` after `supabase db reset`. The script refuses any non-local Supabase URL, generates fresh random passwords, and writes them only to the ignored, mode-0600 `.demo-credentials.json` file. It does not provide a production bootstrap mechanism.

## Hosted Supabase and Vercel

1. Create a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`, and a high-entropy `CRON_SECRET` in local deployment settings. Configure the same variables in Vercel Environment Variables; the secret key must be server-only.
2. Link the repository to the intended project with `supabase link --project-ref <project-ref>`, inspect the linked project, then apply the reviewed migrations with `supabase db push`.
3. In Supabase Auth URL Configuration, set the production site URL and add the exact `https://<domain>/<lang>/auth/callback` redirect URLs for `en`, `ar`, and `fr`. Set production email/SMTP delivery and require email confirmation. Disable public signups; this app has no registration route.
4. Create the first admin account through Supabase Auth's controlled admin invitation/user creation process. Verify the email, then run the same narrowly scoped `INSERT ... SELECT` role grant in the Supabase SQL editor, replacing the example address. This must be done by a trusted project owner; there is no first-user bootstrap endpoint or public secret.
5. Configure `CRON_SECRET` for Vercel so the daily `/api/cron/academy` schedule can create upcoming class sessions and in-app reminders. The endpoint rejects requests without the bearer secret.
6. Run `npm run typecheck`, `npm run lint`, `npm run build`, then deploy. Confirm recovery/invitation email redirects and private material upload/download against the hosted project before inviting families.

The migration creates the private `learning-materials` Storage bucket and its policies. Do not make it public. Other document categories do not yet have upload workflows/buckets.

## Operational notes

- Account roles are granted by invitations (except the one-time owner-controlled admin grant above). Auth user creation alone does not grant portal access.
- Teachers are material uploaders; learners and guardians with an active class relationship can read matching material rows and download files through short-lived signed URLs.
- `npm run dev` can serve the public site without Supabase credentials. Portal/auth routes require configured Supabase and will show an unavailable/sign-in state otherwise.
- The cron sends in-app class reminders, assignment due reminders and missed-assignment notifications. Email, WhatsApp, push, payment gateway, chat UI, and automatic production demo accounts are not configured.
- No production data or secrets belong in `supabase/seed.sql`.
