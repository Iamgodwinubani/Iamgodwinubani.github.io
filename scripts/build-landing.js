#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2];
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/posts.json"), "utf8"));
const EXT = ' target="_blank" rel="noopener noreferrer"';
const NAV = [
  ["#work", "Work"],
  ["#client-work", "Client work"],
  ["#book", "Book"],
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
          </div>
        </div>
      </section>

      <section class="section client-section" id="client-work">
        <div class="wrap">
          <div class="section-heading section-heading-row"><div><p class="eyebrow">Client work</p><h2>Digital products built for real businesses.</h2></div><p class="section-note">Five selected builds will live here. Each project opens its own case study when the final screenshots and links are added.</p></div>
          <div class="client-grid">
            <article class="client-card"><div class="client-placeholder"><span>01</span><strong>Client project</strong><small>Screenshot coming soon</small></div><div><p class="card-kicker">Web product · Case study</p><h3>Project one</h3><p>Strategy, design and engineering for a business that needs a clearer digital presence.</p><a class="text-link" href="#contact">Request the case study <span aria-hidden="true">↗</span></a></div></article>
            <article class="client-card"><div class="client-placeholder client-placeholder-blue"><span>02</span><strong>Client project</strong><small>Screenshot coming soon</small></div><div><p class="card-kicker">Website · Case study</p><h3>Project two</h3><p>A focused website designed to make a strong offer easier to understand and act on.</p><a class="text-link" href="#contact">Request the case study <span aria-hidden="true">↗</span></a></div></article>
            <article class="client-card"><div class="client-placeholder client-placeholder-orange"><span>03</span><strong>Client project</strong><small>Screenshot coming soon</small></div><div><p class="card-kicker">Platform · Case study</p><h3>Project three</h3><p>Product thinking and reliable engineering brought together around a clear customer journey.</p><a class="text-link" href="#contact">Request the case study <span aria-hidden="true">↗</span></a></div></article>
            <article class="client-card"><div class="client-placeholder client-placeholder-dark"><span>04</span><strong>Client project</strong><small>Screenshot coming soon</small></div><div><p class="card-kicker">Web application · Case study</p><h3>Project four</h3><p>A practical digital tool built to reduce friction for teams and the people they serve.</p><a class="text-link" href="#contact">Request the case study <span aria-hidden="true">↗</span></a></div></article>
            <article class="client-card"><div class="client-placeholder client-placeholder-lime"><span>05</span><strong>Client project</strong><small>Screenshot coming soon</small></div><div><p class="card-kicker">Digital experience · Case study</p><h3>Project five</h3><p>A considered experience that gives a growing business the confidence to look its size.</p><a class="text-link" href="#contact">Request the case study <span aria-hidden="true">↗</span></a></div></article>
          </div>
        </div>
      </section>

      <section class="section book-section" id="book">
        <div class="wrap book-layout"><div class="book-cover"><img src="assets/img/shield-up-cover.png" alt="Shield Up book cover" loading="lazy" /></div><div class="book-copy"><p class="eyebrow">Author · Cybersecurity</p><h2>Shield Up</h2><p class="book-lede">A practical guide to digital safety for people who do not consider themselves security experts.</p><p>Most security advice is written for people who already agree with it. Shield Up makes security useful, human and possible to act on, covering digital identity, threat modelling and the habits that actually survive real life.</p><a class="button button-primary" href="assets/files/shield-up-defending-your-digital-world.pdf" download>Download the book <span aria-hidden="true">↘</span></a></div></div>
      </section>

      <section class="section about-section" id="about">
        <div class="wrap about-layout">
          <div class="section-heading"><p class="eyebrow">About Godwin</p><h2>Technical enough to ship. Curious enough to ask why.</h2></div>
          <div class="about-copy"><p>Godwin Ubani is a software engineer, entrepreneur and author building at the intersection of technology, commerce and everyday life. He is interested in the difficult middle: the place where a promising idea has to become a reliable product, a sustainable business and a useful part of somebody’s day.</p><p>His work spans full-stack product engineering, artificial intelligence, cybersecurity and cross-border commerce. He has built from Nigeria and China, bringing together technical depth, first-hand market context and a practical understanding of what it takes to move from concept to launch.</p><p>Godwin is the founder of Korvanta, a cross-border commerce product helping Nigerian importers work more directly with Chinese suppliers. He is also the author of <em>Shield Up: Defending Your Digital World</em>, a cybersecurity guide written for people who do not want to become security experts before protecting themselves.</p><p>Whether he is writing software, explaining a security problem or shaping a new venture, his approach is consistent: understand the real constraint, remove unnecessary complexity and build something people can trust.</p><div class="capability-list"><div><span>01</span><strong>Software engineering</strong><p>TypeScript, React, Next.js, Node.js, Python and cloud infrastructure.</p></div><div><span>02</span><strong>AI &amp; security</strong><p>LLM products, secure architecture, prompt security and practical education.</p></div><div><span>03</span><strong>Venture building</strong><p>Product strategy and go-to-market for ambitious, useful businesses.</p></div></div></div>
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
