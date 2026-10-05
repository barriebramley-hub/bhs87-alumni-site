# BHS Class of '87 — alumni site

Astro (static) + Decap CMS, deployed by Netlify on every push to `main`. Live at bhsalumni.co.za.

- `src/content/blog/*.md` — posts (files marked `sample: true` are placeholders to replace or delete)
- `src/content/pages/about.md` — About page copy
- `src/styles/` — the Barrie Bramley design system CSS, ported as-is
- `public/admin/` — Decap CMS (`/admin`), editorial workflow on; logins via DecapBridge
- Contact form: Netlify Forms (`name="contact"`)

Run locally: `npm install && npm run dev` (http://localhost:4321). Build: `npm run build`.

## One-time setup still needed
1. DecapBridge: done (PKCE). Invite contributors from the DecapBridge dashboard.
2. Netlify: add the `bhsalumni.co.za` domain; add a form-submission email notification to barrie.bramley@gmail.com.
