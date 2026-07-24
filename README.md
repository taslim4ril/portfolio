# Taslim Abdulkadir - Portfolio

A bold, modern redesign of my UI/UX design portfolio. Built with Next.js 16, Tailwind CSS v4, and Framer Motion.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Framer Motion** for scroll/entrance animations
- **Space Grotesk** (display) + **Inter** (body) via `next/font`

## Getting started

```bash
npm install      # first time only
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

All copy lives in one place - **`lib/data.ts`**. Update your name, headline,
projects, blog posts, socials, and contact details there and the whole site
updates. A few TODOs to fill in:

- `site.whatsapp` - replace the placeholder number with your real WhatsApp number.
- `socials[]` - swap the placeholder URLs for your real profile links.
- `posts[].href` - point to your actual Medium articles.
- Project descriptions in `projects[]` - refine the case-study blurbs (some are
  drafted placeholders based on the current site).

## Design tokens

Colors, fonts, and radii are defined as CSS variables at the top of
`app/globals.css`. Change `--accent` to swap the acid-lime highlight for any
other brand color.

## Structure

```
app/
  layout.tsx        # fonts, metadata, <html> shell
  page.tsx          # assembles all sections
  globals.css       # design tokens + base styles
components/
  Nav.tsx           # sticky nav + mobile menu
  Hero.tsx          # headline + stats
  Marquee.tsx       # scrolling skills strip
  Projects.tsx      # case-study grid (featured card spans full width)
  About.tsx         # philosophy + services
  Writing.tsx       # blog posts
  Contact.tsx       # CTA + socials
  Footer.tsx
lib/
  data.ts           # ← all site content
```

## Deploying

The site is fully static. Easiest path is [Vercel](https://vercel.com):

1. Push this folder to a GitHub repo.
2. Import it on Vercel - it auto-detects Next.js. No config needed.
3. (Optional) add your custom domain.

Other hosts that support Next.js (Netlify, Cloudflare Pages) work too.
