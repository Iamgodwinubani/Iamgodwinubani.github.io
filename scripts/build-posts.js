#!/usr/bin/env node
/**
 * Generates posts/*.html from blog-drafts/medium-posts.md.
 *
 *   node scripts/build-posts.js
 *
 * The markdown is the source of truth. Edit the text there, re-run this, and
 * the post pages and the Writing cards in index.html stay in step.
 * Exports the post list so build-landing.js can use the same data.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "blog-drafts/medium-posts.md");
const OUT_DIR = path.join(ROOT, "posts");

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* Inline markdown: **bold** and `code`. Escaping runs first. */
function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function parse() {
  const md = fs.readFileSync(SRC, "utf8").split("\r\n").join("\n");
  const chunks = md.split(/^## POST \d+\s*$/m).slice(1);
  if (!chunks.length) throw new Error("no posts found in " + SRC);

  return chunks.map((chunk, i) => {
    const title = (chunk.match(/^\*\*Title:\*\*\s*(.+)$/m) || [])[1];
    const sub = (chunk.match(/^\*\*Subtitle:\*\*\s*(.+)$/m) || [])[1];
    if (!title || !sub) throw new Error("post " + (i + 1) + " missing title or subtitle");

    /* Body starts after the subtitle line and ends at the --- separator. */
    let body = chunk.slice(chunk.indexOf(sub) + sub.length);
    body = body.split(/^---$/m)[0].trim();

    const blocks = [];
    let para = [];
    const flush = () => {
      if (para.length) {
        blocks.push(`        <p>${inline(para.join(" "))}</p>`);
        para = [];
      }
    };
    for (const line of body.split("\n")) {
      const t = line.trim();
      if (!t) {
        flush();
      } else if (t.startsWith("### ")) {
        flush();
        blocks.push(`        <h2>${inline(t.slice(4))}</h2>`);
      } else {
        para.push(t);
      }
    }
    flush();

    /* First paragraph doubles as the card excerpt and meta description. */
    const firstPara = blocks.find((b) => b.startsWith("        <p>")) || "";
    const plain = firstPara.replace(/<[^>]+>/g, "").trim();
    const words = plain.split(/\s+/).length;
    const minutes = Math.max(3, Math.round(body.split(/\s+/).length / 200));

    return {
      n: i + 1,
      title,
      sub,
      slug: slugify(title),
      html: blocks.join("\n"),
      excerpt: plain.length > 210 ? plain.slice(0, 207).replace(/\s+\S*$/, "") + "…" : plain,
      minutes,
      words,
    };
  });
}

const POSTS = parse();

/* ---------- page shell, taken from index.html so nav never drifts ---------- */
function shell({ title, desc, canonical, main }) {
  const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").split("\r\n").join("\n");
  const header = index.slice(
    index.indexOf(`    <header class="site-header">`),
    index.indexOf(`    </header>`) + `    </header>`.length
  );
  const footer = index.slice(
    index.indexOf(`    <footer class="site-footer">`),
    index.indexOf(`    </footer>`) + `    </footer>`.length
  );
  if (!header || !footer) throw new Error("could not lift header/footer from index.html");

  /* Post pages live one level down, so rewrite root-relative asset paths. */
  const up = (s) =>
    s
      .replace(/href="#/g, 'href="../index.html#')
      .replace(/href="assets\//g, 'href="../assets/')
      .replace(/src="assets\//g, 'src="../assets/');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)} | Godwin Ubani</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="author" content="Godwin Ubani" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://godwinubani.com/posts/${canonical}" />
    <meta name="theme-color" content="#003995" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Godwin Ubani" />
    <meta property="og:url" content="https://godwinubani.com/posts/${canonical}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:image" content="https://godwinubani.com/assets/img/headshot.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@iamgodwinubani" />
    <link rel="icon" href="../assets/img/favicon.png" type="image/png" />
    <link rel="stylesheet" href="../assets/css/site.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>

${up(header)}

    <main id="main">
${main}
    </main>

${up(footer)}
  </body>
</html>
`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

POSTS.forEach((p, i) => {
  const prev = POSTS[i - 1];
  const next = POSTS[i + 1];
  const main = `      <article class="section post-page">
        <div class="wrap wrap-reading">
          <a class="back" href="../index.html#writing">&larr; All writing</a>
          <h1 class="post-title">${esc(p.title)}</h1>
          <p class="post-standfirst">${esc(p.sub)}</p>
          <p class="post-meta">
            Godwin Ubani &middot; ${p.minutes} min read
          </p>
${p.html}
          <nav class="post-nav" aria-label="More posts">
${
  prev
    ? `            <a href="${prev.slug}.html"><small>Previous</small>${esc(prev.title)}</a>`
    : `            <span></span>`
}
${
  next
    ? `            <a href="${next.slug}.html"><small>Next</small>${esc(next.title)}</a>`
    : `            <span></span>`
}
          </nav>
        </div>
      </article>`;

  fs.writeFileSync(
    path.join(OUT_DIR, p.slug + ".html"),
    shell({
      title: p.title,
      desc: p.sub,
      canonical: p.slug + ".html",
      main,
    })
      .split("\n")
      .join("\r\n"),
    "utf8"
  );
  console.log(
    "  posts/" + p.slug + ".html  (" + p.words + " words, " + p.minutes + " min)"
  );
});

fs.writeFileSync(
  path.join(ROOT, "scripts/posts.json"),
  JSON.stringify(
    POSTS.map((p) => ({
      title: p.title,
      sub: p.sub,
      slug: p.slug,
      excerpt: p.excerpt,
      minutes: p.minutes,
    })),
    null,
    2
  ),
  "utf8"
);

console.log(POSTS.length + " posts built");
