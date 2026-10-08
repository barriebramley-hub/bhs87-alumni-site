# BHS Class of '87 alumni site (bhsalumni.co.za)

Read this first. A blog-first site for the Bryanston High School Class of 1987. Content is collected and written by Tan Lawensky; Barrie Bramley is the owner and editor.

## Stack
- **Astro 5**, static output, content collections (`src/content.config.ts`). Pages are `src/pages/`; shared pieces in `src/components/`; layout in `src/layouts/Base.astro`.
- **Decap CMS** at `/admin` (`public/admin/`), posts as Markdown in `src/content/blog/`. `publish_mode: editorial_workflow`: contributors submit drafts (they become pull requests), Barrie reviews and publishes.
- **Logins via DecapBridge** (PKCE). Do **not** enable Netlify Identity or Git Gateway. Config is in `public/admin/config.yml`.
- **Netlify** builds `main` on every push. Project `bhs87-alumni-site`; build settings in `netlify.toml`. Contact form is Netlify Forms (`name="contact"`), emailed to barrie.bramley@gmail.com via a notification set in the Netlify UI.
- Repo: https://github.com/barriebramley-hub/bhs87-alumni-site

## The design: "Sunset band" (merged Oct 2026) — match it, don't improve it
A calm white page; the only loud things are the logo and one sunset-coloured band at the top. The spec is `DESIGN.md` (Barrie holds the original); the values below are what is in the code. Appearance changes must not alter wording, links, forms or behaviour.
- Colours (tokens in `src/styles/tokens/colors.css`): text/headings indigo `#232463`, secondary `#3d3f78`, meta `#4b4d7a`, page `#fff`, alt sections `#f4f4fa`, borders `#e3e3f0`, links magenta `#b43287` (hover `#861f65`), chips `#eeeefa`. Cyan `#58b7dd` and orange `#d9703a` are decorative only, never text on white. All text pairs were contrast-checked (AA); white on the orange end of the band is below AA, so no text may sit on that end (the logo does).
- Header band gradient `linear-gradient(100deg,#232463 0%,#513382 48%,#b43287 82%,#d9703a 100%)` with a 30px white "sun stripe" along its bottom edge; on narrow screens the gradient is stretched so the orange stays off-screen. Podcast strip and card top bars have their own gradients (see `--bb-grad-*`).
- Fonts: Sora (headings, 600/700) and Figtree (body/UI, 400/600), **self-hosted** woff2 latin subsets in `public/fonts/` with `font-display: swap` (`tokens/fonts.css`). No Google Fonts requests; keep it that way.
- Styling lives in `src/styles/`: tokens, `css/base.css`, `css/utilities.css` (original `.bb-*` classes) and `css/sunset.css` (the look; loaded last). Prefer classes there over inline `style=` attributes.
- Rules: speed first (CSS only, no animation, no parallax, no glow/blur, no extra JavaScript for styling); tap targets at least 44px; visible focus outlines; no sideways scrolling at phone width. Logos are WebP (`logo-480.webp` hero, `logo-160.webp` header/footer) with width/height attributes and alt text.
- Voice: wry, dry, British/South African English, no emoji, no exclamation marks. CTAs are instructions ("Read this one", "Go and read something").
- School motto: Veritas Fidelitas Justitia (Truth, Faith, Justice).
- Home hero logo: desktop (container wider than 760px) shows the big crest on the right of the band; phones show the small header crest like every other page and never download the big one (`<picture>` placeholder source in `src/pages/index.astro`).
- Deliberately not built: the large "40" on the featured post (Barrie said leave it out).
The original handoff (README, prototype, old design system) is in Barrie's Google Drive: `bhs alumni/design_handoff_bhs_alumni_site`. It is superseded by the Sunset band design where they differ.

## Content model
Post frontmatter: `title`, `date` (YYYY-MM-DD), `category` (Thoughts, Memories, Happenings, Profiles, Podcasts, Foundation, Notices; exact spelling), `excerpt`, `author` (default Tan Lawensky), optional `hero` (e.g. `/images/uploads/x.jpg`), optional `podcastUrl` + `podcastHost`, `draft`, `sample`. A bad value fails the build; Netlify then keeps the previous deploy live.
- Images go in `public/images/uploads/`. Categories also exist as pages at `/blog/<lowercase-category>`; a post slug must never equal a category slug (both are served by `src/pages/blog/[slug].astro`).
- Posts with `sample: true` are placeholders from the design handoff for Tan to replace or delete.
- Podcast episode posts: category Podcasts, optional `podcastUrl`. The home page no longer lists them; it shows the podcast strip (below) instead.
- About page copy is `src/content/pages/about.md` (editable in Decap).

## Decisions made
- Barrie is admin; Tan is a contributor. Pete van Nieuwkerk is "in charge" of the podcasts, so he is the `author` on podcast posts. He will not have a login; Barrie edits those.
- Podcast show: **Eighty-Seven Unsupervised**. The home page podcast strip has three buttons (Apple Podcasts, Spotify, YouTube) whose URLs are the `podcastLinks` constant at the top of `src/pages/index.astro`. The three per-platform posts were retired in favour of the strip. Hero buttons: "Read the blog" (`/blog`) and "Listen to the podcasts" (`/blog/podcasts`).
- No long-lived browser caching on `/images/*` (an immutable header once cached a 404 and hid a new image). Don't add one back.
- The optional "Plain list" home layout from the prototype was not built.

## Housekeeping to remember
- **GitHub token for DecapBridge expires** (set to ~4 Nov 2026 unless regenerated). When it lapses, saving in `/admin` fails with "Resource not accessible by personal access token". Fix: regenerate the fine-grained token (owner `barriebramley-hub`, repo `bhs87-alumni-site`, Contents + Pull requests read/write) and paste the new value into DecapBridge.
- Domain `bhsalumni.co.za` is on Netlify. Contributor emails are invited from the DecapBridge dashboard, not from code.
- Pull before editing locally: Decap and local pushes both write to `main`.

- Sitemap: `@astrojs/sitemap` regenerates `/sitemap-index.xml` on every build (config in `astro.config.mjs`; `public/robots.txt` points to it and blocks `/admin/`). Submit it once in Google Search Console.

## Commands
`npm install`, `npm run dev` (localhost:4321), `npm run build` (output in `dist/`, check it before pushing).

## Working style
Barrie writes for clients and likes to go step by step: say what you're about to change, keep replies short, and ask before anything outward-facing (publishing, deleting, DNS). Don't invent post content or attribute quotes.
