#!/usr/bin/env node
/**
 * Regenerates sitemap.xml and robots.txt from the HTML files in the project.
 *
 *   node scripts/generate-sitemap.js
 *
 * Every public .html file becomes a <url> entry. Add a page, re-run this, and
 * the sitemap stays correct — no hand-editing. `lastmod` comes from each
 * file's real mtime so crawlers see genuine change dates.
 */

const fs = require("fs");
const path = require("path");

const ORIGIN = "https://godwinubani.com";
const ROOT = path.resolve(__dirname, "..");

/* Files that must never be indexed: build helpers, previews, drafts. */
const EXCLUDE = new Set(["og-card.html", "404.html"]);
const EXCLUDE_DIRS = new Set([".git", "node_modules", "scripts", ".claude"]);

/* Priority and change frequency by route. Anything unlisted gets the default. */
const ROUTE_META = {
  "/": { priority: "1.0", changefreq: "weekly" },
};
const DEFAULT_META = { priority: "0.8", changefreq: "monthly" };

function findHtml(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) findHtml(path.join(dir, entry.name), found);
    } else if (entry.name.endsWith(".html") && !EXCLUDE.has(entry.name)) {
      found.push(path.join(dir, entry.name));
    }
  }
  return found;
}

function toRoute(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  return "/" + rel.replace(/(^|\/)index\.html$/, "$1");
}

const pages = findHtml(ROOT)
  .map((file) => {
    const route = toRoute(file);
    return {
      loc: ORIGIN + route,
      lastmod: fs.statSync(file).mtime.toISOString().slice(0, 10),
      ...(ROUTE_META[route] || DEFAULT_META),
    };
  })
  .sort((a, b) => a.loc.localeCompare(b.loc));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/1999/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`.replace(
  "http://www.w3.org/1999/sitemap/0.9",
  "http://www.sitemaps.org/schemas/sitemap/0.9"
);

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Build helpers and preview pages carry no search value.
Disallow: /scripts/
Disallow: /og-card.html

# Block the training crawlers that ignore commercial reuse concerns.
# Remove these four blocks if you would rather be included.
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(ROOT, "robots.txt"), robots, "utf8");

console.log("sitemap.xml — " + pages.length + " route(s):");
pages.forEach((p) => console.log("  " + p.loc + "  (" + p.lastmod + ")"));
console.log("robots.txt — sitemap: " + ORIGIN + "/sitemap.xml");
