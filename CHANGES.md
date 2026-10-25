# Review-site logos (October 25, 2026, preview branch astro-preview)

- Real logos for 82 of the 85 review sites, in the homepage strip (all 30), on /review-sites and in the "sites by industry" card on the review inbox page.
- 27 come from open brand icon sets (simple-icons; SVG, brand color). 55 are each site's own favicon, captured at 64px and stored as WebP (about 1 KB each, 60 KB for all 55). All load lazily below the hero.
- DealerRater, PatientConnect365 and Homestay keep a text chip: their only available icon is a blurry 16px file.
- Map of name to file: src/logo-map.json; files in public/assets/logos/.

# Astro migration (October 25, 2026, preview branch astro-preview)

- Site now builds with Astro 5.18.2 (static output, same file layout: pricing.html, features/index.html). Vercel builds with `npm run build` and serves `dist/`.
- One shared header (`src/components/Header.astro`) and footer (`src/components/Footer.astro`) replace 62 hand-copied versions. A nav or footer change is now one edit.
- Normalized along the way: feature pages called the menu "AI visibility" while every other page said "What we do"; 4 older blog posts had an outdated footer blurb; most pages' nav demo button lacked `data-loc="nav"`.
- Every built page was compared to the pre-migration HTML: identical outside the header and footer.
- See README.md for where to edit pages.

# Copy and template cleanup (October 25, 2026, preview branch brand-d-preview)

- Em dashes: all 674 removed sitewide (visible copy, meta tags, FAQ schema, tool scripts and copyable templates), each rewritten in context as a comma, colon, parentheses or a new sentence. Calculator placeholders use an en dash.
- 10-second test: the browser's native suggestion popup is replaced with an on-brand list (arrow keys, Enter, Escape, screen-reader labels). The question mark stays attached to the town field.
- Industry pages: the third card on all 21 pages is now styled as "the moment that matters" (navy card) instead of posing as a statistic. The five older-layout pages (dental, auto repair, HVAC, nail salons, restaurants) gained the three-step "How it works" section the other 16 have.

# Brand D follow-ups (October 25, 2026, preview branch brand-d-preview)

- Yellow toned down from #FFC93C to #F5C860 (navy on it still 8.3:1); favicon, OG image and theme-color updated.
- Homepage hero map now loops through six questions across ChatGPT, Gemini and Perplexity: the question types, the answer and business card appear, the pin drops in a new spot. Pauses on hover and in background tabs; reduced motion shows the first scene.
- 10-second test (homepage and the how-AI-picks guide): trade and town fields with suggestion lists or free text; "Ask ChatGPT" and "Ask Perplexity" open the assistant with the question prefilled (chatgpt.com/?q=, perplexity.ai/search?q=). Pushes an ai_test_open dataLayer event.
- Rank grid replaced with a numbered rank map (25 check points, your shop marked with the pin, legend) plus a ranked fix list; same map on the rank tracking page with a competitor watch bar.
- Feature pages: text-only side cards replaced with product visuals (monthly report, ask-your-assistant chat, reply before/after, sites by industry, phone notifications, review widget, review form with writing help, video request).
- Gap bars on the how-AI-picks guide now show their values without animation (were empty with reduced motion).

# Brand D rollout (October 25, 2026, preview branch brand-d-preview)

- New look sitewide: marigold #FFC93C, navy #142B6F, white and butter #FFF7DB; Bricolage Grotesque (display at 75% width, weight 800; body at normal width).
- New logo on all 62 pages: navy map pin with a yellow star plus the VouchTrack wordmark (inline SVG, white pin in the footer). New favicon and OG image.
- Header and each page's opening section share the yellow; buttons are pills (navy on light, yellow on navy); labels are sentence-case pills instead of tracked capitals; cards are flat and outlined, with a hard navy shadow on the one card to look at; FAQ uses a +/- marker.
- Homepage: hero visual is now the neighborhood map (AI answer card, business card, pin) with a one-time load sequence (question types, answer appears, pin drops; reduced motion shows the final frame). Headline accent removed. The three step cards were merged into the pillar rows (same story was told twice). Pricing teaser heading no longer repeats the pricing page H1. Removed the repeated "Industry" label on industry cards.
- Pricing: lede no longer opens with "Two ways in" right under the H1.
- Three-up grids center a short last row, so no card hangs alone (tools page had 3 + 1).
- Old palette and Fraunces/Public Sans removed from the stylesheet; theme-color now #FFC93C.

# Quick fixes (October 25, 2026)

- Pricing page: plan prices render at full size again (the "/mo" suffix rule no longer shrinks the number).
- Homepage pricing teaser: "Do it yourself" and "Done for you" labels now render as pills (`.tag` had no style outside blog cards).
- Homepage stat band: removed the BrightLocal-sourced 83% stat; `.stat-band` now sizes columns to the number of stats, so no stat sits alone on a second row.
- Blog: four footer blurbs said "AI Overviews"; now "Google Maps, ChatGPT, Gemini and Perplexity".

# Booking moves on-site: /book with embedded calendar (October 11, 2026)

- New /book page (noindex, not in sitemap): Zcal calendar embedded inline via the official
  embed script, logo-only header, ad UTMs passed through to Zcal. Built first as the Meta ads
  landing page.
- All 222 "Book a demo" links across 61 pages now point to /book instead of opening
  zcal.co in a new tab.
- /book pushes a `calendar_engaged` dataLayer event the first time a visitor clicks into the
  calendar (Zcal's free plan exposes no booking event, pixel, or redirect).

# Phase 3 — messaging propagation: industries, features, pricing, llms.txt, OG image — August 15, 2026

- 21 industry pages: H1 is now "Improve your local search ranking and AI visibility, built for
  [vertical]"; each page's old emotive H1 moved to the opening line of its lede. Verb kickers
  (Capture experiences / Build authority / Increase visibility) added to the 16 pages that have a
  three-step section; the 5 older-layout pages (auto-repair, dental, hvac, nail-salons-spas,
  restaurants) keep their structure.
- Feature pages: eyebrows now carry the three verbs (review-requests + video-testimonials =
  Capture experiences; inbox, ai-replies, widgets, aeo-content = Build authority; ai-search,
  insights-rankings = Increase visibility). Two em-dash H1s rewritten.
- pricing.html: H1 "Two ways in. Both published."; Starter/Standard/Pro card CTAs now
  "Start now" -> app.vouchtrack.com/register (register CTA per site CTA policy); Enterprise
  CTA is "Book a call".
- how-it-works.html: verb kickers on steps 3-5.
- faq.html: multi-location question added ($49 DIY / $199 DFY per additional location).
- demo.html: example card switched from wedding photographer to dentist.
- llms.txt: summary replaced with the positioning paragraph, including the contrast against
  Birdeye/Podium/Reputation/Experience.com and the three verbs; US spellings fixed.
- index.html Organization schema description aligned to the positioning statement (competitor
  names deliberately left out of structured data).
- og-image.png regenerated at 1200x630: ink background, faint gold star, Fraunces headline
  "Own local search. Be the first they find.", Public Sans subline, vouchtrack.com.
- Sitewide: 25 " — VouchTrack" title/og separators -> " | VouchTrack"; data-cta attributes added
  to every demo link (216) and report link (90) for GTM cta_click events.
- Known debt: ~690 em dashes remain in older body prose (blog posts, tools, feature bodies).
  These need a contextual rewrite pass, not find-and-replace.

# Phase 2 — positioning rebuild: homepage, adopted messaging, sitewide language — August 15, 2026

## Positioning (per vouchtrack-messaging-framework-v1.md)
- Hero H1 adopted: "Improve your local search ranking. Build AI visibility. Turn your reputation into revenue."
- Three-step labels adopted: Capture experiences / Build authority / Increase visibility
- Closing line and alt H1: "Be the first they find." / "Own local search. Be the first they find."
- New title/meta/OG/schema on homepage to match

## Homepage rebuilt (index.html)
- Hero duel animation: 4 rotating scenes (Google pack dentist Chattanooga, ChatGPT plumber Des Moines,
  Perplexity salon Greenville SC, Gemini HVAC Tulsa), each typed query -> before state with
  "Your business: not shown" -> after state sliding the business to #1 with count-up to 4.8 (212),
  star fill, Recommended badge and the "+87 reviews · every review answered · profile complete" chip.
  Pauses on hover. Reduced motion / no-JS get a static after-state. Photos load from /assets/hero/
  (dentist|plumber|salon|hvac).jpg with automatic initial-tile fallback; see assets/hero/README.txt.
- Review-source marquee: two counter-scrolling rows, 30 US platforms (13 brand icons inlined from
  simple-icons, 17 typographic wordmarks), links to /review-sites, pauses on hover, static under
  reduced motion.
- Problem section now runs four cited stats (added 83% BrightLocal with source link).
- Four pillar rows with mockups: SMS phone, review inbox with approve micro-moment, widget + GBP
  checklist, rank-grid heatmap + mini AI answer. Rank tracking row notes Pro / Done-for-you gating.
- Big-platforms vs VouchTrack comparison table + guarantee card (merged robot + owners sections).
- Pricing teaser: DIY from $29 with Start now -> app.vouchtrack.com/register; DFY from $299 -> demo.
- FAQ tightened to 7, new multi-location question ($49 DIY / $199 DFY per additional location).
- Closing: "Be the first they find." Sticky mobile demo bar. data-cta/data-loc on every CTA with a
  dataLayer cta_click push for GTM.

## Sitewide
- Nav dropdown label "AI visibility" -> "What we do" (46 pages)
- Footer blurb replaced everywhere with the ranking + AI visibility one-liner (one location or twenty)
- US spelling sweep: optimis-/neighbourhood/favour/colour/organis- -> American spellings (0 left)
- Single-location positioning language removed from about + 3 blog spots (kept 3 factual dataset notes)
- features/insights-rankings.html: ranking map, competitor watch and AI insights now say Pro plan

## Removed
- Old hero simulator and dead lift-card code from assets/site.js (replaced by the duel player)

# Audit fixes + founding banner, founder page, phone mockups, motion — July 13, 2026

## Consistency fixes
- 70%+ -> 83% (BrightLocal-consistent) on homepage and features/review-requests; both now cited
- essentials.html "What's the catch?" rewritten — no longer contradicts Essentials+ email review requests
- Original 6 industry pages: stat bands retrofitted to the cited format (5–9% HBS + 83% BrightLocal
  + best vertical stat kept). Uncited 92% salon claim removed.

## New sitewide elements
- Founding-offer announcement bar on all pages except /essentials (would undercut the downsell there)
- /assets/site.js on every page: header scroll shadow, scroll-reveal with stagger, stat count-ups,
  homepage hero lift-card animation (score/count count-up, star fill, ticker cascade, star shimmer),
  calculator output tick. All motion gated behind prefers-reduced-motion.
- All 27 emoji icons replaced with inline SVG (Lucide-style, leaf-colored) — consistent cross-platform
- .card now gets the same hover lift as .post-card; gold nav underline on hover/active

## Phone SMS mockups (CSS-only component)
- Homepage (#how section, with customer reply bubble), features/review-requests
  ("What your customer sees" card), and all 20 industry pages (compact variant,
  per-vertical sender names + messages; existing page quotes reused where present)

## Content
- features/ai-search: stat band now cites BrightLocal AI adoption (45%, up from 6%; #3 source)
- features/insights-rankings: ranking map / competitor watch / AI insights labeled
  "included from the Standard plan"
- Homepage industries section: "See all 20 industries ->" link added
- about.html: founder section rebuilt — photo (assets/akshay-sudarsan.jpg, 800px source shown at
  <=300px), full name Akshay Sudarsan, LinkedIn link, sign-off, AboutPage/Person JSON-LD. TODO removed.
- 14 meta descriptions (+ og:description) trimmed to <=160 chars

## Files
- NEW: assets/site.js, assets/akshay-sudarsan.jpg
- styles.css: appended "July 2026 additions" block (banner, phone, motion states, founder grid, icons)

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

# Google Tag Manager sitewide, photographers vertical, /demo page (August 10, 2026)

## Tracking
- GTM container GTM-5X9X3KZ2 installed on all 61 HTML pages: script in <head> directly
  after charset, noscript iframe directly after <body>. GA4 and Meta Pixel to be
  configured inside GTM (no further code changes needed).

## New pages
- /industries/photographers: 21st vertical (wedding-leaning, mixed genres). Added to
  industries index grid and sitemap.
- /demo: guided walkthrough page (agenda, live-report framing, feature grid, USPs).
  Intentionally noindexed and unlinked until generalized.

## Sitewide text
- "All 20 industries" -> "All 21 industries" in nav and homepage; llms.txt 20 -> 21 verticals.

# New pricing structure: DIY / Done For You / Credits & one-time (August 10, 2026)

## Pricing page rebuilt
- Tabs now: Do it yourself (Starter $29/$19, Standard $79/$59, Pro $99/$79 featured with
  "Full AI suite" flag) / Done for you (Launch $299/$249, Growth $499/$399, Enterprise) /
  Credits & one-time (existing sliders + $499 one-time AEO/SEO website card, hosting incl.).
- Annual toggle kept; badge now "Save up to 34%" (discounts vary by tier). Legacy
  /pricing#ai-visibility hash maps to the Done For You tab.
- Location add-on: $49/mo per location on DIY (was $99 any plan except Starter);
  DFY multi-location routed to Enterprise conversation.
- Founding offer fully retired: announce bar removed from all pages, founding FAQ/CTA
  rewritten. "Rate you join at is the rate you keep" retained.

## Sitewide
- Announce bar removed (59 pages). Footer tagline: "single-location businesses" ->
  "local businesses". faq.html money answers + JSON-LD updated to new plans.
  features/ai-search + features/aeo-content re-pointed from AI Visibility/Growth to
  Pro/Done For You; website $500 -> $499 with hosting included. llms.txt updated
  ($29-$499, DIY/DFY framing, 15 more industries). Sitemap lastmod bumped for changed pages.
- essentials.html left untouched (unreachable, redirected to /pricing since July).

# Location + hosting pricing (August 10, 2026, same day)
- Extra locations: $49/mo DIY (unchanged), $199/mo per location on Done For You plans
  (was routed to Enterprise). Location card, pricing FAQ and comparison table updated.
- Website hosting priced at $29/mo standalone, shown in Credits & one-time tab;
  included free on Done For You plans. faq.html and features/aeo-content aligned.

# Growth article count (August 10, 2026, same day)
- Growth plan: 8 -> 12 SEO/AEO articles/month on pricing card; aeo-content meta updated to four or twelve.
- llms.txt Plans section rewritten to DIY/DFY structure (missed in the earlier sweep; caught via grep). 'Single location only' fact replaced, founding line removed, API access dropped pending confirmation.

## Real dashboard screenshots (Oct 25)
- Captured from a real client account in app.vouchtrack.com after the rebrand. On-screen only: the business is shown as "Hollis & Pine Events, Savannah, GA" with fictional reviewers, competitors and fuller numbers. Nothing was changed in the account itself.
- Home: tabbed "Inside the dashboard" block at the end of How it works (Overview, AI visibility, Reviews and replies).
- AI search: Search AI screenshot under the report section; competitor and cited-sites cards in "Three things decide". Copy tweak: "More than a score out of a hundred" (the app shows a score).
- Review inbox: reviews list with replies. Insights: dashboard overview plus Google Business Profile results.
- Every screenshot carries "Sample account. The business, reviewer names and numbers are illustrative."
- Images in public/assets/app as WebP, 1400w and 2200w (about 35 to 90 KB each), lazy-loaded.
- Fix (Oct 25): Vercel caches /assets/* for a year, so browsers kept the old site.js and the home dashboard tabs did nothing. site.js and styles.css URLs now carry a content hash (src/layouts/Page.astro), and /assets is capped at one day in vercel.json.
- AI replies: real posted-reply screenshot under "Specific beats sorry".
