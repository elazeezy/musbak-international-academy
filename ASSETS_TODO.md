# Asset follow-ups

Current public image assets are stock or illustrative stand-ins. Replace them only with academy assets that are approved for publication.

## In use on the current landing page

- [ ] `public/images/hero-mosque.jpg` is used as the hero and final CTA backdrop. Replace with a licensed academy image if available.
- [ ] `public/images/hero-child-cutout.png` is the hero student visual. Confirm the illustration is approved for the brand and audience.
- [ ] `public/images/hero-class.jpg` is used behind the academic subjects card in `components/TwoPaths.tsx`.
- [ ] `public/images/proof-1.jpg` and `proof-2.jpg` appear in `components/ProofMosaic.tsx` as learning photos.
- [ ] `public/images/avatar-1..3.jpg` accompany testimonial copy in `components/Testimonials.tsx`. The current quotes are explicitly samples; replace them with real, consented reviews before presenting them as testimonials.
- [ ] The faculty carousel currently uses placeholders. Add approved portraits and names in the localized `landing.teachers` dictionaries before removing the placeholders.
- [ ] `public/images/journey-mosque-landscape.png` and `public/images/quran-feature.png` are used in the journey and Qur’an sections.

## Video

- [x] Arabic introduction video: `public/videos/musbak-introductory-video-arabic.mp4` (0:51), configured in `lib/config.ts`.
- [ ] Add approved English and French introduction videos or a shared hosted video URL. The current English and French VSL panels are placeholders.

## Configuration and footer

- [ ] Replace `#` social URL placeholders in `site.socials` (`lib/config.ts`). Empty placeholder links are hidden from the footer until configured.
- [ ] Payment logos are not present. Add only after payment providers and supported payment methods are confirmed.
- [ ] Replace the Open Graph cover in `public/images/og-image.jpg` with the final branded cover when ready.

## Legacy assets

`tutor.jpg`, `teacher-1..3.jpg`, `bg-hero.jpg`, `bg-hadith.jpg`, and `bg-cta.jpg` are not referenced by the current landing page. They remain in `public/images/` for now; remove them only after confirming they are no longer needed by the project.
