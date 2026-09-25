# ASSETS_TODO

All slots currently use free stock photos from Unsplash (see `public/images/`).
Replace each with real academy assets when available — the wiring stays the same,
just swap the file (keep the name) or update the path in the component.

## Photography

- [ ] **Hero photo** — stock stand-in `public/images/hero-class.jpg` (girl in a live online class).
  The hero was restored to the original centered layout, which has no photo column — drop this
  file in only if a photo slot is re-added, otherwise delete it.
- [x] **Tutor photo** — stock stand-in `public/images/tutor.jpg` (wired in `components/About.tsx`).
  Replace with a real tutor mid-class portrait, ~1200×1200.
- [x] **Teacher portraits (3)** — stock stand-ins `public/images/teacher-1..3.jpg`, shown in the
  tutors strip in `components/WhyUs.tsx`. Replace with real headshots (~800×800) and update the
  names/roles in the `tutors` key of `lib/dictionaries.ts` (en/ar/fr).
- [~] **Parent proof (3)** — stock avatar stand-ins `public/images/avatar-1..3.jpg` in
  `components/Testimonials.tsx`. The review texts are still samples — when real consented reviews
  land, replace the texts, swap the avatars, and remove the `testimonials.disclaimer` line and the
  `TIMES` placeholders.

## Backgrounds

- [x] **Hero backdrop** — `public/images/bg-hero.jpg` (geometric tile mosaic) at ~6% opacity
  behind the star pattern, wired in `components/Hero.tsx`.
- [x] **Hadith banner background** — `public/images/bg-hadith.jpg` (Arabic calligraphy), wired in
  `components/HadithBanner.tsx` at 25% opacity.
- [x] **Final CTA background** — `public/images/bg-cta.jpg` (mosque interior), wired in
  `components/FinalCTA.tsx` at 15% opacity.

## Video

- [~] **VSL (video sales letter)** — the Arabic intro video is live:
  `public/videos/musbak-introductory-video-arabic.mp4` (0:51), wired via `site.vslLocal.ar`
  in `lib/config.ts` and plays in-page on `/ar`. For `/en` and `/fr`, add entries under
  `site.vslLocal` (or set the global YouTube `site.vslUrl`).

## Social / SEO

- [x] **OG image** — `public/images/og-image.jpg` (1200×630), wired in `lib/seo.ts`.
  Replace with a branded cover (brand background + logo + one-line promise).
- [ ] **Real social URLs** — replace the `#` placeholders in `site.socials` (`lib/config.ts`): Instagram, TikTok, YouTube, X.

## Payments

- [ ] **Payment logos** — Paystack, Flutterwave, card-scheme marks (SVG/PNG ~height 32).
  Add them as `<Image>` badges inside the hidden placeholder strip in `components/Footer.tsx` (marked with a comment) and remove its `hidden` class to show it.
