# Full mechanical batch — July 7, 2026
(Supersedes the Week 1 changelog. Everything below is included in this package.)

## New files
- vercel.json — clean URLs, 301 apex→www, security headers
- favicon.svg — brand star icon
- og-image.png — 1200×630 social-share card (used by OG tags + schema logo)
- privacy.html, terms.html — DRAFTS: review §11 governing law + entity name before customer #1
- 404.html — branded not-found page (noindex)
- llms.txt — site summary for AI crawlers/assistants

## Site-wide (all 29 original pages)
- Canonical tag + favicon link (Week 1)
- Internal links → root-relative clean URLs (Week 1)
- Footer: Privacy / Terms links (Week 1)
- NEW: Open Graph + Twitter card + theme-color meta on every page
  (og:url matches canonical; blog posts use og:type=article + published_time)

## Structured data (JSON-LD)
- Organization + WebSite on homepage
- FAQPage: faq.html (22 Q&As), pricing (7), how-it-works (4), all 6 industry pages (3 each)
- Article on all 7 blog posts (author "Akshay", date 2026-07-07, publisher VouchTrack)

## Titles & meta descriptions
- 11 titles shortened to ≤60 chars (homepage + 5 blog posts + pricing, features index,
  calculator, ai-search). Long blog titles drop the "— VouchTrack" suffix (Google appends
  the site name in results itself).
- 12 meta descriptions ≥185 chars rewritten to ≤160. Descriptions in the 161–184 range
  left as-is (minor truncation, preserves original copy).

## Blog upgrades (all 7 posts)
- Visible byline/date: "By Akshay · July 7, 2026 · …" (dates = formal publish date;
  adjust if you prefer staggered dates — also update datePublished in each Article schema)
- "Related reading" block (3 internal links) before the CTA on every post
- Salon-cost post: dollar-impact claim now cites Harvard Business School study

## Stat sourcing (verified sources only)
- Homepage 5–9% → HBS Luca working paper (note: study is restaurant-specific;
  industry convention generalizes it, but be ready for the question on calls)
- Homepage 70%+ asked→review, and "#1" card → BrightLocal Local Consumer Review Survey
  (current edition reports 83% of asked customers leave one)
- Calculator "About the math" → both sources linked
- Restaurants industry page 5–9% → HBS (study literally used restaurants)

## Conversion additions
- Calculator: "✉ Email me this estimate" button — builds a prefilled mailto to
  hello@vouchtrack.com containing the visitor's inputs + results (zero-backend lead capture)
- Homepage before/after card: visible "Illustrative example" caption added
- Pricing comparison table: "as of July 2026" footnote
- Industry pages: "From the blog" link to the matching post (nails → negative-review guide)

## Flagged — needs YOUR input (not shipped)
1. UNSOURCED STATS still live: salons "92% compare on Google" + "3 seconds";
   dental "reviews > referrals"; auto "#1 reason drivers read reviews".
   Find sources or soften to non-numeric claims.
2. Demo length: copy says 15-minute, Zcal event is /30min. Create a 15-min Zcal
   event type, send me the URL, I'll sweep all 110 links.
3. Analytics: needs your GA4/Plausible account — one snippet, I'll add it sitewide.
4. About page: photo + full name + LinkedIn (also improves Article-schema E-E-A-T).
5. Privacy/Terms: legal review; entity name once Udyam completes.
6. Blog "Akshay" author name: add surname when you're ready to publish it.

## Deploy checklist
1. Upload all files to the repo (replace existing) → Vercel auto-deploys
2. Vercel dashboard: confirm BOTH domains attached (apex redirect needs it)
3. Click through preview: nav, footer, calculator (move sliders, tap email button),
   one blog post, pricing toggle
4. Search Console: verify domain via Namecheap DNS TXT → submit sitemap
5. Bing Webmaster Tools: import from GSC
6. Validate one page at validator.schema.org and one at opengraph.dev

## Local preview
- preview.py added — run: python3 preview.py  (in the extracted folder), then open
  http://localhost:8000. Mimics Vercel exactly: clean URLs, index pages, custom 404.
- NOTE: opening .html files directly from disk (file://) shows NO styling — the
  clean-URL migration uses root-relative paths that only resolve through a server.
- preview.py is harmless to commit (Vercel ignores it), or delete it before upload.

# Addition — Reviews Needed Calculator (same day)

## New page
- tools/reviews-needed-calculator.html -> /tools/reviews-needed-calculator
  Enter current rating + review count + target rating + customer volume;
  outputs reviews needed (4.8-star avg), the perfect-5.0 variant, months to
  get there, and rating after 90 days. Email-capture button included.
  FAQPage schema (4 Q&As). Target slider caps at 4.7 (honest-math reason
  explained on-page).

## Math verification
- Formula unit-tested in Python (sufficiency + minimality) across all 48,000
  slider combinations; page JS executed in Node and produced byte-identical
  results. A floating-point off-by-one was caught and fixed with an epsilon
  guard before the page was written.

## Touched files
- ALL pages: footer gains "Reviews needed calculator" link (33 pages)
- tools/review-calculator.html: "Also try" cross-link
- sitemap.xml: new URL (32 total)
- llms.txt: new entry

# Addition — Free tools suite (same day)

## New pages (4)
- /tools — free tools hub (5 tool cards, why-free section, FAQ schema)
- /tools/review-request-templates — text/email request generator: 7 industries,
  3 variants each, copy buttons, SMS segment counts, compliance rules section.
  Templates never solicit sentiment (unit-tested).
- /tools/review-qr-poster — printable 5x7 counter card with QR code; print +
  PNG download; QR generated locally by vendored MIT library (assets/qrcode.min.js,
  no CDN dependency); links never leave the browser
- /tools/review-policy-quiz — 7-question checkup vs Google policies + FTC
  Consumer Reviews & Testimonials Rule (16 CFR 465, FTC Q&A page linked);
  tiered verdicts, per-question explanations, not-legal-advice disclaimer

## Header decision (implemented)
- "Free tools" added to main nav (after Pricing) on all 37 pages. Rationale:
  these pages are the inbound engine; competitor research (reviewsense.ai)
  confirms the pattern. One-line revert if unwanted.

## Footer change
- The two calculator links replaced by a single "Free tools" hub link (all pages)

## Verification
- FTC citation verified against ftc.gov (rule effective Oct 21, 2024; the quiz
  keeps the Google-vs-FTC distinction accurate: Google bans all incentivized
  reviews; the FTC rule bans sentiment-conditioned incentives)
- build()/score() logic unit-tested in Node from the shipped page source;
  all inline scripts syntax-checked; full site suite: 37 pages, 0 errors
- One bug caught and fixed during checks: pricing.html marks its own nav item
  with class=active, which briefly misrouted the header insertion to the footer

## Manual checks before shipping (browser-only behaviors)
1. QR poster: paste a real link, scan the preview with your phone, print-preview
   (5x7 layout), and try the PNG download
2. Templates: copy button on desktop + mobile
3. Quiz: answer all 7, check verdicts render and email button appears

# Addition — Unlisted Essentials page (same day)

## New page: /essentials (NOT linked anywhere, NOT indexed)
- Two case-by-case downsell tiers: Essentials $99/mo (Google-only: monitoring,
  hybrid replies — auto 4-5-star, human-approved 3-star and below, Q&A answered,
  mini-report) and Essentials+ $149/mo (adds 500 email requests/mo + private
  feedback flow). NO SMS on either tier — the structural gate protecting the
  $199/$249 public plans. Annual -20% shown statically.
- Honest framing on-page: openly states these are limited plans offered
  case-by-case; what-is-NOT-included section; one-email upgrade path.
- Containment verified: noindex meta; absent from sitemap.xml, llms.txt,
  robots.txt; zero inbound links from all other 37 pages.
- Deliberate calls (easy to change): capped at $149 (hidden $199 would collide
  with public Founding $199); hybrid replies preserve the human-approved
  promise on negatives; if EMR seat cost per account exceeds ~$60/mo,
  raise $99 to $119-129.

## Sales usage
- Share the URL directly after a call. Obscurity + noindex, not authentication —
  anyone with the link can view it, and the copy is written to survive that.

# Addition — 14 new industry pages + essentials (July 8)

## New industry pages (14) — all at /industries/<slug>
med-spas, veterinarians, chiropractors, physical-therapy, optometrists,
plumbers, electricians, roofers, pest-control, landscaping,
cleaning-services, moving-companies, law-firms, gyms-fitness

Selection grounded in EmbedMyReviews' 232-niche scorecards (all chosen niches
score 7-9/9 and carry EMR-recommended client pricing of $120-400/mo, i.e.
they support VouchTrack's price points). Clustered around existing pages:
home services x6, health x4, beauty x1, plus movers, law, fitness.

## Template & integrity
- Byte-consistent with existing industry template (hero, stat band, pains,
  card, 3 steps, 3-question FAQ + FAQPage schema, chips, blog link, CTA)
- Stat bands: NO invented research numbers. Every page uses the two verified,
  source-linked stats (HBS 5-9% per star; BrightLocal 83% of asked customers)
  plus one rhetorical, non-research third stat. Verified by automated check.
- Health pages (chiro, PT, optometry, med spa) carry HIPAA-aware reply FAQs
  mirroring the dental page; law firms carry bar-rules + confidentiality FAQs.
- Chips name real review platforms per vertical (Healthgrades, Zocdoc, Avvo,
  Angi, Thumbtack, ClassPass, RealSelf, etc.)

## Sitewide changes
- Footer Industries column: unchanged 6 links + new "All industries ->" link
  (52 pages). Chosen over listing all 20 to avoid a 20-item footer column.
- /industries hub: 20 cards now (6 existing + 14 new)
- sitemap.xml: +14 URLs (lastmod 2026-07-08)
- essentials.html included in this zip (was staged, never uploaded)

## Suite results
52 pages, 0 errors: schema counts match on all 20 industry pages, all links
resolve, footers uniform, titles <=66 chars, essentials still contained
(noindex, out of sitemap, zero inbound links).
