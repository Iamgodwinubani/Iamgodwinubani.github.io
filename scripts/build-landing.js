#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2];
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/posts.json"), "utf8"));
const EXT = ' target="_blank" rel="noopener noreferrer"';
const NAV = [
  ["#work", "Work"],
  ["#about", "About"],
  ["#writing", "Writing"],
];
const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/in/iamgodwinubani"],
  ["GitHub", "https://github.com/godwinubani"],
  ["X", "https://x.com/iamgodwinubani"],
];

function esc(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const postCards = POSTS.map(
  (post) => `            <article class="writing-card">
              <p class="card-kicker">${post.minutes} min read</p>
              <h3><a href="posts/${post.slug}.html">${esc(post.title)}</a></h3>
              <p>${esc(post.sub)}</p>
              <a class="text-link" href="posts/${post.slug}.html">Read the essay <span aria-hidden="true">↗</span></a>
            </article>`
).join("\n");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Godwin Ubani | Software Engineer &amp; Entrepreneur</title>
    <meta name="description" content="Godwin Ubani is a software engineer and entrepreneur building useful products at the intersection of technology, commerce and Africa." />
    <meta name="author" content="Godwin Ubani" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://godwinubani.me/" />
    <meta name="theme-color" content="#f4f2ed" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Godwin Ubani" />
    <meta property="og:url" content="https://godwinubani.me/" />
    <meta property="og:title" content="Godwin Ubani | Software Engineer &amp; Entrepreneur" />
    <meta property="og:description" content="Software engineer and entrepreneur building useful products at the intersection of technology, commerce and Africa." />
    <meta property="og:image" content="https://godwinubani.me/assets/img/headshot.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@iamgodwinubani" />
    <link rel="icon" href="assets/img/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="assets/img/favicon.png" />
    <link rel="stylesheet" href="assets/css/site.css" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Godwin Ubani",
        "url": "https://godwinubani.me/",
        "image": "https://godwinubani.me/assets/img/headshot.jpg",
        "jobTitle": "Software Engineer and Entrepreneur",
        "email": "mailto:iamgodwinubani@gmail.com",
        "knowsAbout": ["Software Engineering", "Artificial Intelligence", "Cybersecurity", "Cross-Border Commerce"],
        "sameAs": [${SOCIAL.map(([, url]) => `"${url}"`).join(", ")}]
      }
    </script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="brand" href="#home" aria-label="Godwin Ubani home">GU<span>.</span></a>
        <input class="nav-toggle" type="checkbox" id="nav-toggle" />
        <label class="nav-toggle-label" for="nav-toggle" tabindex="0" aria-label="Open menu"><span></span><span></span></label>
        <nav class="nav" aria-label="Main navigation">
${NAV.map(([href, label]) => `          <a href="${href}">${label}</a>`).join("\n")}
          <a class="nav-cta" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>

    <main id="main">
      <section class="hero" id="home">
        <div class="wrap hero-layout">
          <div class="hero-copy">
            <p class="eyebrow">Software engineer · Entrepreneur</p>
            <h1>I build products that make difficult things feel simple.</h1>
            <p class="hero-lede">I’m Godwin Ubani, a software engineer and entrepreneur working across AI, cybersecurity and cross-border commerce.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#work">See selected work <span aria-hidden="true">↘</span></a>
              <a class="button button-quiet" href="mailto:iamgodwinubani@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
            <div class="hero-note"><span class="status-dot"></span> Currently building Korvanta for importers and suppliers.</div>
          </div>
          <div class="hero-portrait">
            <div class="portrait-frame"><img src="assets/img/headshot.jpg" alt="Godwin Ubani" width="560" height="700" /></div>
            <p class="portrait-caption"><span>Based between</span><strong>Nigeria &amp; China</strong></p>
          </div>
        </div>
      </section>

      <section class="section work-section" id="work">
        <div class="wrap">
          <div class="section-heading"><p class="eyebrow">Selected work</p><h2>Building in public, one useful product at a time.</h2></div>
          <div class="work-grid">
            <article class="work-card work-card-featured">
              <div class="work-image"><img src="assets/img/screen-korvanta.png" alt="Korvanta app interface showing a renminbi wallet and live exchange rate" loading="lazy" /></div>
              <div class="work-content"><p class="card-kicker">01 / Product · Fintech</p><h3>Korvanta</h3><p>A simpler way for Nigerian importers to source from China. Payments, verified suppliers, translation and order tracking in one place.</p><a class="text-link" href="https://korvanta.vercel.app"${EXT}>Visit Korvanta <span aria-hidden="true">↗</span></a></div>
            </article>
            <article class="work-card">
              <div class="work-image work-image-dark"><img src="assets/img/screen-korvanta-business.png" alt="Korvanta Business interface showing supplier earnings and escrow balance" loading="lazy" /></div>
              <div class="work-content"><p class="card-kicker">02 / Platform · B2B</p><h3>Korvanta Business</h3><p>The supplier-side platform connecting Chinese factories with serious Nigerian buyers, with bilingual communication and visible escrow.</p><a class="text-link" href="https://korvanta.vercel.app"${EXT}>Explore the platform <span aria-hidden="true">↗</span></a></div>
            </article>
            <article class="work-card work-card-book">
              <div class="work-image"><img src="assets/img/shield-up-cover.png" alt="Shield Up book cover" loading="lazy" /></div>
              <div class="work-content"><p class="card-kicker">03 / Author · Cybersecurity</p><h3>Shield Up</h3><p>A practical guide to digital safety for people who do not consider themselves security experts.</p><a class="text-link" href="assets/files/shield-up-defending-your-digital-world.pdf" download>Download the book <span aria-hidden="true">↘</span></a></div>
            </article>
          </div>
        </div>
      </section>

      <section class="section about-section" id="about">
        <div class="wrap about-layout">
          <div class="section-heading"><p class="eyebrow">About</p><h2>Technical enough to ship. Curious enough to ask why.</h2></div>
          <div class="about-copy"><p>I care about the space where a strong technical foundation meets a real-world constraint. My work moves between writing software, understanding systems and building the companies around them.</p><p>That means thinking about the user, the infrastructure, the business model and the last mile with equal seriousness.</p><div class="capability-list"><div><span>01</span><strong>Software engineering</strong><p>TypeScript, React, Next.js, Node.js, Python and cloud infrastructure.</p></div><div><span>02</span><strong>AI &amp; security</strong><p>LLM products, secure architecture, prompt security and practical education.</p></div><div><span>03</span><strong>Venture building</strong><p>Product strategy and go-to-market for ambitious, useful businesses.</p></div></div></div>
        </div>
      </section>

      <section class="section writing-section" id="writing">
        <div class="wrap"><div class="section-heading section-heading-row"><div><p class="eyebrow">Writing</p><h2>Notes from the work.</h2></div><a class="text-link" href="https://medium.com/@iamgodwinubani"${EXT}>More on Medium <span aria-hidden="true">↗</span></a></div><div class="writing-grid">${postCards}</div></div>
      </section>

      <section class="contact-section" id="contact">
        <div class="wrap contact-inner"><p class="eyebrow">Have something worth building?</p><h2>Let’s make it real.</h2><a class="contact-email" href="mailto:iamgodwinubani@gmail.com">iamgodwinubani@gmail.com <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="wrap footer-inner">
        <div><a class="brand" href="#home">GU<span>.</span></a><p>Software engineer &amp; entrepreneur.</p></div>
        <div class="footer-links"><p class="footer-label">Find me online</p><ul>${SOCIAL.map(([name, url]) => `<li><a href="${url}"${EXT}>${name} <span aria-hidden="true">↗</span></a></li>`).join("")}</ul></div>
        <p class="copyright">© 2026 Godwin Ubani</p>
      </div>
    </footer>
  </body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "index.html"), html.split("\n").join("\r\n"), "utf8");
console.log("index.html written");
