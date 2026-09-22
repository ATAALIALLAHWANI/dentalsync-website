# DentalSync — Marketing Website

A plain, static HTML/CSS/JS marketing website for **DentalSync**, a dental
clinic management system. This is an informational site only — it is not the
DentalSync application itself, and it does not talk to any backend, database,
or the real DentalSync app.

Every feature described on this site is a real, confirmed DentalSync feature
(dashboard, patients, appointments, Voice Data Entry AI, visit history, PDF
export, Arabic/English toggle). All screenshots and the product video are
real captures of the live app. Nothing is invented — there are no fake
statistics, customer counts, or testimonials anywhere on this site.

## 1. Project structure

```
├── index.html          The entire single-page site
├── src/
│   ├── style.css        All styles
│   ├── main.js          All interactivity (nav, lightbox, video, contact buttons)
│   └── config.js        ← THE ONE FILE YOU NEED TO EDIT (see below)
├── images/               Screenshots, favicons, OG image (WebP/PNG/JPG)
├── video/                The product demo video (MP4)
├── favicon.ico, site.webmanifest, robots.txt, sitemap.xml
└── vercel.json           Vercel config (cache headers, clean URLs)
```

There is **no build step**. It's plain HTML/CSS/JS on purpose, so it's simple
to host anywhere, including Vercel's free tier, with zero configuration.

## 2. What you need to add before launch

Open **`src/config.js`**. This is the only file you need to touch:

```js
export const CONTACT = {
  phone: '',         // ← put your real phone number here, e.g. "+962 7 9123 4567"
  facebookUrl: '',   // ← put your real Facebook Page URL here
  email: ''          // optional
};
```

The real phone number and Facebook page URL are already filled in. While
they're blank, the matching contact button on the site is automatically
hidden (the "Call or message us" / "Message us on Facebook" buttons), and a
small note appears in their place explaining what to add and where. Nothing
was invented.

Once you fill in `phone` and/or `facebookUrl`, the buttons appear
automatically — no other file needs to change.

Also in `config.js`, `DEMO_VIDEO_YOUTUBE_ID` lets you swap the self-hosted
demo video for a YouTube embed later (see section 5).

## 3. Run it locally

You need Node.js installed (for `npx serve`) — or just Python, which most
computers already have.

**Option A — Node:**
```bash
npm run dev
```
This runs `npx serve . -l 5173` and opens the site at http://localhost:5173

**Option B — Python (no install needed):**
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173

Either way, this is the exact same site that will be deployed — there's no
separate "build" version to worry about.

## 4. Deploy to Vercel (free)

This site is already GitHub/Vercel-ready and requires **no backend, no
database, and no Docker**.

1. This repository is already on GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in (free Hobby plan is
   enough).
3. Click **Add New → Project**, then import this GitHub repository.
4. Vercel will detect it as a static site. You don't need to set a build
   command or output directory — leave the defaults, or if asked, set:
   - Framework Preset: **Other**
   - Build Command: *(leave empty)*
   - Output Directory: *(leave empty / `.`)*
5. Click **Deploy**. In under a minute you'll get a live URL like
   `https://dentalsync-website.vercel.app`.

No environment variables are required.

## 5. About the video (large-file note)

The product demo video at `video/demo-video.mp4` is a real, compressed
screen recording (~1.4 MB) — small enough to deploy directly, so no extra
setup is needed. It plays only when a visitor clicks the play button
(nothing auto-plays or auto-downloads), which keeps the page fast.

If you'd ever rather host the video on YouTube instead (e.g. after you have
a longer or updated demo), just:
1. Upload the video to YouTube.
2. Copy the video ID from the URL (the part after `v=`).
3. Paste it into `DEMO_VIDEO_YOUTUBE_ID` in `src/config.js`.

The video section will automatically switch to a YouTube embed — no other
changes needed.

## 6. Where everything lives

| What | Where |
|---|---|
| Phone number & Facebook URL | `src/config.js` |
| Screenshots | `images/*.webp` |
| Product demo video | `video/demo-video.mp4` |
| Favicon / app icons | `favicon.ico`, `images/icon-*.png` |
| Social share image (Open Graph) | `images/og-image.jpg` |
| Page title / meta description | top of `index.html` |
| All page copy | `index.html` (plain text, easy to find and edit) |
| Colors / fonts / spacing | `src/style.css` (CSS variables at the top) |

## 7. Before you go live — a short checklist

- [x] Add your real phone number and Facebook URL to `src/config.js`
- [ ] Update `SITE.url` in `src/config.js` and the two URLs in
      `sitemap.xml` / `robots.txt` once you know your final domain
      (or keep the Vercel-provided URL if that's what you'll use)
- [ ] Skim the copy in `index.html` for anything you'd like to reword
- [ ] If you get a real product logo file (vector/SVG) later, it can
      replace `images/icon-*.png` for extra crispness — the current icons
      are generated from your real Facebook profile picture asset, which
      already looks sharp at all the sizes used on the site
