# godwinubani.me

Personal website of Godwin Ubani: Software Engineer, Founder and Entrepreneur.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static build into ./out
```

## Updating content (no coding knowledge needed)

All text lives in three files. Edit the words between the quotes and save.

| What | File |
| --- | --- |
| Name, email, phone, location, availability text, portrait | `src/content/site.ts` |
| The four products (descriptions, focus areas, tags, links) | `src/content/projects.ts` |
| About text, expertise, technology list, approach steps | `src/content/profile.ts` |

### Add your portrait photo

1. Save your photo as `public/images/portrait.jpg`. Portrait orientation works best, 1200×1500 or larger.
2. In `src/content/site.ts`, change `portrait: null` to `portrait: "/images/portrait.jpg"`.

The photo then appears in the hero and the About section.

### Add real product screenshots

The product visuals are illustrative compositions, labelled "Illustrative" on the site. To replace one with a real screenshot:

1. Save the image as, for example, `public/images/projects/quentavo.png`. A 3:2 ratio works best (e.g. 2400×1600).
2. In `src/content/projects.ts`, set `screenshot: "/images/projects/quentavo.png"` for that product.
3. Optionally set `link: "https://..."` to show a "Visit" link on the project page.

### Social sharing image

The image shown when the site is shared is `src/app/opengraph-image.png` (1200×630). Replace that file to change it.

## Contact form

The site is fully static (hosted on GitHub Pages), so the form works without a server:

- **Default:** submitting opens the visitor's email app with their message already filled in, addressed to you.
- **Optional, direct sending:** create a free form at [Formspree](https://formspree.io), copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`), and put it in a `.env.local` file as `NEXT_PUBLIC_CONTACT_ENDPOINT=...`, then run `npm run deploy`. Messages will then go straight to your inbox.

## Deploying (GitHub Pages)

The site is served by GitHub Pages from the `gh-pages` branch, which holds only the built files. The `main` branch holds the source.

To publish changes:

```bash
git add -A && git commit -m "Update site" && git push   # save the source
npm run deploy                                           # build and publish
```

`npm run deploy` builds the site into `./out` and pushes it to `gh-pages`. GitHub Pages updates within a minute or two. The custom domain `godwinubani.me` is kept via the `CNAME` file it writes.

## Structure

```
src/
  app/                  routes, metadata, sitemap, robots, OG image
    work/[slug]/        individual project pages
  components/
    layout/             navigation, footer
    sections/           homepage sections (Hero, Work, About, …)
    projects/           product visuals (one per product)
    contact/            contact form and copy-email button
    ui/                 shared building blocks
  content/              all editable text
  lib/                  form validation
```
