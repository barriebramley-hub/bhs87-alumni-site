# BHS Class of '87 alumni site (bhsalumni.co.za)

Read this first. A blog-first site for the Bryanston High School Class of 1987. Content is collected and written by Tan Lawensky; Barrie Bramley is the owner and editor.

## Stack
- **Astro 5**, static output, content collections (`src/content.config.ts`). Pages are `src/pages/`; shared pieces in `src/components/`; layout in `src/layouts/Base.astro`.
- **Decap CMS** at `/admin` (`public/admin/`), posts as Markdown in `src/content/blog/`. `publish_mode: editorial_workflow`: contributors submit drafts (they become pull requests), Barrie reviews and publishes.
- **Logins via DecapBridge** (PKCE). Do **not** enable Netlify Identity or Git Gateway. Config is in `public/admin/config.yml`.
- **Netlify** builds `main` on every push. Project `bhs87-alumni-site`; build settings in `netlify.toml`. Contact form is Netlify Forms (`name="contact"`), emailed to barrie.bramley@gmail.com via a notification set in the Netlify UI.
- Repo: https://github.com/barriebramley-hub/bhs87-alumni-site

## The design is fixed — match it, don't improve it
The look is the Barrie Bramley design system, ported unchanged into `src/styles/` (`tokens/*`, `css/base.css`, `css/utilities.css`). Rules:
- Only three colours: `#000`, `#fff`, `#666` (`#e6e6e6` for the missing-image hatch only). The neon school crest is the only colour on the site, and appears only in the header and footer; never recolour or box it.
- Raleway (display, 900/800/700/600) and Open Sans (body). Radius 0, no shadows, **no animation or transitions anywhere**.
- Fluid sizes use `cqw` (`.bb-page` is the container-query root). Rules: 2px black between sections, 1px between list items.
- Voice: wry, dry, British/South African English, no emoji, no exclamation marks. CTAs are instructions ("Read this one", "Go and read something").
- School motto: Veritas Fidelitas Justitia (Truth, Faith, Justice).
The original handoff (README, prototype, design system) is in Barrie's Google Drive: `bhs alumni/design_handoff_bhs_alumni_site`.

## Content model
Post frontmatter: `title`, `date` (YYYY-MM-DD), `category` (Thoughts, Memories, Happenings, Profiles, Podcasts, Foundation, Notices; exact spelling), `excerpt`, `author` (default Tan Lawensky), optional `hero` (e.g. `/images/uploads/x.jpg`), optional `podcastUrl` + `podcastHost`, `draft`, `sample`. A bad value fails the build; Netlify then keeps the previous deploy live.
- Images go in `public/images/uploads/`. Categories also exist as pages at `/blog/<lowercase-category>`; a post slug must never equal a category slug (both are served by `src/pages/blog/[slug].astro`).
- Posts with `sample: true` are placeholders from the design handoff for Tan to replace or delete.
- Podcast posts: category Podcasts with `podcastUrl`. The home page lists up to 4, newest first, each linking out in a new tab.
- About page copy is `src/content/pages/about.md` (editable in Decap).

## Decisions made
- Barrie is admin; Tan is a contributor. Pete van Nieuwkerk is "in charge" of the podcasts, so he is the `author` on podcast posts. He will not have a login; Barrie edits those.
- Podcast show: **Eighty-Seven Unsupervised**. Apple, YouTube and Spotify links are three Podcasts posts (`eighty-seven-unsupervised-*.md`).
- No long-lived browser caching on `/images/*` (an immutable header once cached a 404 and hid a new image). Don't add one back.
- The optional "Plain list" home layout from the prototype was not built.

## Housekeeping to remember
- **GitHub token for DecapBridge expires** (set to ~4 Nov 2026 unless regenerated). When it lapses, saving in `/admin` fails with "Resource not accessible by personal access token". Fix: regenerate the fine-grained token (owner `barriebramley-hub`, repo `bhs87-alumni-site`, Contents + Pull requests read/write) and paste the new value into DecapBridge.
- Domain `bhsalumni.co.za` is on Netlify. Contributor emails are invited from the DecapBridge dashboard, not from code.
- Pull before editing locally: Decap and local pushes both write to `main`.

## Commands
`npm install`, `npm run dev` (localhost:4321), `npm run build` (output in `dist/`, check it before pushing).

## Working style
Barrie writes for clients and likes to go step by step: say what you're about to change, keep replies short, and ask before anything outward-facing (publishing, deleting, DNS). Don't invent post content or attribute quotes.
