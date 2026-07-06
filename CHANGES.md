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
