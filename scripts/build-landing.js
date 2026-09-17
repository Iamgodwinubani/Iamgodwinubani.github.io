const fs = require("fs");
const path = require("path");
const ROOT = process.argv[2];

const NAV = [
  ["#home", "Home"],
  ["#story", "Story"],
  ["#app", "App"],
  ["#book", "Book"],
  ["#expertise", "Expertise"],
  ["#writing", "Writing"],
];

const STORY = [
  ["mobile-tech-hub-1.jpeg", "Started out at Mobile Tech Hub, where WordPress, HTML, CSS and JavaScript turned curiosity into a career."],
  ["aptech-campus.jpg", "Studied computer networking at Aptech — network architecture, security protocols and system infrastructure."],
  ["networking-lab.jpg", "Hands-on networking lab work, building the foundation beneath everything that came later."],
  ["jiangxi-campus.jpg", "Studying Computer Science and Technology at Jiangxi University of Science and Technology in China."],
  ["china-study.jpg", "Living and building in China, close to the supply chain that makes hardware ideas real."],
  ["security-lab.jpg", "Security lab work, and the road toward writing Shield Up."],
  ["web-dev-class.jpg", "Teaching and building alongside other developers."],
  ["cisco-training.jpg", "Networking and infrastructure training."],
  ["book.png", "Authored Shield Up: Defending Your Digital World, a guide to online safety for a generation that grew up online."],
];

const ext = ` target="_blank" rel="noopener noreferrer"`;

/* Vector renditions of the two store marks. Apple and Google both publish
   official badge artwork under their brand guidelines — swap these for the
   downloaded assets when you have them. */
const PLAY_SVG = `<svg class="store-logo" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path fill="#00D7FE" d="M35.3 18.3C29.4 24.5 26 34.1 26 46.6v418.8c0 12.5 3.4 22.1 9.3 28.3l1.4 1.4 234.6-234.6v-5.5L36.7 20.4z"/><path fill="#FFBC00" d="M349.5 349.9l-78.2-78.2v-5.5l78.2-78.3 1.8 1 92.7 52.7c26.5 15 26.5 39.6 0 54.7l-92.7 52.6z"/><path fill="#FF3A44" d="M351.3 348.9L271.3 269 35.3 505c8.7 9.2 23.2 10.4 39.4 1.2l276.6-157.3"/><path fill="#00C853" d="M351.3 163.1L74.7 5.8C58.5-3.4 44-2.2 35.3 7L271.3 243z"/></svg>`;

const APPLE_SVG = `<svg class="store-logo" viewBox="0 0 384 512" aria-hidden="true" focusable="false"><path fill="#ffffff" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`;

const stores = `              <div class="stores">
                <a class="store" href="https://korvanta.vercel.app"${ext}>
                  ${PLAY_SVG}
                  <span><small>Get it on</small><b>Google Play</b></span>
                </a>
                <a class="store" href="https://korvanta.vercel.app"${ext}>
                  ${APPLE_SVG}
                  <span><small>Download on the</small><b>App Store</b></span>
                </a>
              </div>`;

/* Korvanta Business is not listed yet, so its badges are inert spans rather
   than links that would take someone to a store page that does not exist. */
const storesSoon = `              <div class="stores">
                <span class="store is-soon">
                  ${PLAY_SVG}
                  <span><small>Coming soon on</small><b>Google Play</b></span>
                </span>
                <span class="store is-soon">
                  ${APPLE_SVG}
                  <span><small>Coming soon on</small><b>App Store</b></span>
                </span>
              </div>`;

const VENTURES = [
  {
    media: `<div class="phone3d" data-phone3d>
                <div class="phone3d-body" data-3d-body>
                  <div class="phone3d-face phone3d-front">
                    <img src="assets/img/screen-korvanta.png" alt="Korvanta app home screen — RMB wallet, live rate and recent suppliers" loading="lazy" draggable="false" />
                  </div>
                  <div class="phone3d-face phone3d-back">
                    <span class="phone3d-camera"></span>
                    <span class="phone3d-brand">Korvanta</span>
                  </div>
                  <div class="phone3d-edge phone3d-right"></div>
                  <div class="phone3d-edge phone3d-left"></div>
                  <div class="phone3d-edge phone3d-top"></div>
                  <div class="phone3d-edge phone3d-bottom"></div>
                </div>
                <div class="phone3d-shadow"></div>
              </div>`,
    title: "Korvanta",
    meta: "The Import Super-App",
    body: [
      "The super-app connecting Nigerian importers directly to verified Chinese factories. Import smarter, not harder.",
      "Hold a renminbi balance, convert at a live rate, pay suppliers, and talk to a factory in Guangzhou or Yiwu in English while they read it in Chinese. Quotes, negotiation and escrow all sit in the same thread as the conversation.",
    ],
    list: [
      "RMB wallet with live ¥ to ₦ conversion",
      "Verified factories, not listings",
      "Auto-translating supplier chat, EN ⇄ 中文",
      "Quotes, negotiation and order tracking",
      "Escrow — the balance releases when you say so",
    ],
    actions: `              <div class="actions">
                <a class="btn btn-solid" href="https://korvanta.vercel.app"${ext}>Visit the website</a>
              </div>
${stores}`,
  },
  {
    media: `<div class="phone3d" data-phone3d>
                <div class="phone3d-body" data-3d-body>
                  <div class="phone3d-face phone3d-front">
                    <img src="assets/img/screen-korvanta-business.png" alt="Korvanta Business app earnings screen — escrow balance and payout history" loading="lazy" draggable="false" />
                  </div>
                  <div class="phone3d-face phone3d-back">
                    <span class="phone3d-camera"></span>
                    <span class="phone3d-brand">Korvanta Business</span>
                  </div>
                  <div class="phone3d-edge phone3d-right"></div>
                  <div class="phone3d-edge phone3d-left"></div>
                  <div class="phone3d-edge phone3d-top"></div>
                  <div class="phone3d-edge phone3d-bottom"></div>
                </div>
                <div class="phone3d-shadow"></div>
              </div>`,
    title: "Korvanta Business",
    meta: "Korvanta for Suppliers · 中国工厂对接尼日利亚买家平台",
    body: [
      "The factory side of the same rails. Chinese suppliers get direct, recurring orders from verified Nigerian importers — no agent in the middle taking a cut of a relationship they did not build.",
      "Inquiries, chats and orders in one dashboard, in English and Chinese. Money sits in escrow where both sides can see it, and payouts settle to a local bank account.",
    ],
    list: [
      "New inquiries and unread chats at a glance",
      "Orders in progress, end to end",
      "Escrow balance and released-to-date earnings",
      "Payouts to a local bank account",
      "Bilingual throughout, EN ⇄ 中文",
    ],
    actions: `              <div class="actions">
                <a class="btn btn-solid" href="https://korvanta.vercel.app"${ext}>Visit the website</a>
              </div>
${storesSoon}`,
  },
];

const EXPERTISE = [
  {
    media: null,
    title: "Software Engineering",
    body: "Full-stack product development in TypeScript, React and Next.js, Node.js and Python, with the cloud infrastructure underneath it.",
    list: ["TypeScript · React · Next.js", "Node.js · Python", "Cloud infrastructure and deployment"],
  },
  {
    media: null,
    title: "Artificial Intelligence",
    body: "AI products and LLM integration, with a working interest in where these systems break — prompt injection, tool permissions, and the gap between what a model is told and what it does.",
    list: ["AI product development", "LLM integration and tooling", "Prompt security and agent safety"],
  },
  {
    media: null,
    title: "Cybersecurity",
    body: "Network architecture and security protocols studied formally at Aptech, applied since to secure architecture, zero-trust thinking and the security writing that became Shield Up.",
    list: ["Network architecture and protocols", "Zero-trust and secure architecture", "Security awareness and education"],
  },
  {
    media: null,
    title: "Web Development",
    body: "Where it started — WordPress, HTML, CSS and JavaScript at Mobile Tech Hub, and the first websites that turned an interest into a profession.",
    list: [],
  },
  {
    media: null,
    title: "Venture Building",
    body: "Product strategy and company building across cross-border commerce and renewable energy — the parts that are hard to copy: financing structure, distribution, and being willing to specify the component that costs more and lasts.",
    list: ["Product strategy and go-to-market", "Cross-border commerce", "Renewable energy distribution"],
  },
];

/* Written by scripts/build-posts.js from blog-drafts/medium-posts.md, so the
   cards and the post pages can never disagree. */
const POSTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/posts.json"), "utf8")
);

const MEDIUM = "https://medium.com/@iamgodwinubani";

/* Handle is iamgodwinubani everywhere except GitHub and Dev.to, where the
   account is godwinubani — iamgodwinubani 404s on both, verified. */
const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/in/iamgodwinubani"],
  ["X", "https://x.com/iamgodwinubani"],
  ["GitHub", "https://github.com/godwinubani"],
  ["Medium", MEDIUM],
  ["YouTube", "https://www.youtube.com/@iamgodwinubani"],
  ["Instagram", "https://www.instagram.com/iamgodwinubani"],
  ["TikTok", "https://www.tiktok.com/@iamgodwinubani"],
  ["Facebook", "https://www.facebook.com/iamgodwinubani"],
  ["Threads", "https://www.threads.net/@iamgodwinubani"],
  ["Telegram", "https://t.me/iamgodwinubani"],
  ["Reddit", "https://www.reddit.com/user/iamgodwinubani"],
  ["Pinterest", "https://www.pinterest.com/iamgodwinubani"],
  ["Twitch", "https://www.twitch.tv/iamgodwinubani"],
  ["Hashnode", "https://hashnode.com/@iamgodwinubani"],
  ["Dev.to", "https://dev.to/godwinubani"],
];

function cards(items) {
  return items
    .map(
      (v, i) => `            <article class="card3d" data-card3d>
              <div class="card3d-body" data-3d-body>
                <span class="card3d-index">${String(i + 1).padStart(2, "0")}</span>
                <h3 class="card3d-title">${v.title}</h3>
                <p class="card3d-text">${Array.isArray(v.body) ? v.body.join(" ") : v.body}</p>
${
  v.list && v.list.length
    ? `                <ul class="card3d-tags">\n${v.list.map((l) => `                  <li>${l}</li>`).join("\n")}\n                </ul>`
    : ""
}
                <span class="card3d-glare" aria-hidden="true"></span>
              </div>
            </article>`
    )
    .join("\n");
}

function blocks(items) {
  return items
    .map(
      (v) => `          <div class="block${v.media ? "" : " block-plain"}">
${
  v.media
    ? `            <div class="block-media">
              ${v.media}
            </div>
`
    : ""
}            <div class="block-body">
              <h3>${v.title}</h3>
${v.meta ? `              <p class="meta">${v.meta}</p>\n` : ""}${(Array.isArray(v.body) ? v.body : [v.body])
        .filter(Boolean)
        .map((p) => `              <p>${p}</p>`)
        .join("\n")}
${
  v.list && v.list.length
    ? `              <ul>\n${v.list.map((l) => `                <li>${l}</li>`).join("\n")}\n              </ul>`
    : ""
}
${v.actions || ""}
            </div>
          </div>`
    )
    .join("\n");
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Godwin Ubani | Technopreneur &amp; Software Engineer</title>
    <meta
      name="description"
      content="Technopreneur and software engineer Godwin Ubani builds AI, cybersecurity and cross-border commerce products for Africa. Founder of Korvanta &amp; Vokra Solar."
    />
    <meta name="author" content="Godwin Ubani" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://godwinubani.com/" />
    <meta name="theme-color" content="#003995" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Godwin Ubani" />
    <meta property="og:url" content="https://godwinubani.com/" />
    <meta
      property="og:title"
      content="Godwin Ubani | Technopreneur &amp; Software Engineer"
    />
    <meta
      property="og:description"
      content="Technopreneur and software engineer building AI, cybersecurity and cross-border commerce products for Africa."
    />
    <meta
      property="og:image"
      content="https://godwinubani.com/assets/img/headshot.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@iamgodwinubani" />
    <link rel="icon" href="assets/img/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="assets/img/favicon.png" />
    <link rel="stylesheet" href="assets/css/site.css" />
    <link rel="stylesheet" href="assets/css/3d.css" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": "https://godwinubani.com/#godwin",
            "name": "Godwin Ubani",
            "url": "https://godwinubani.com/",
            "image": "https://godwinubani.com/assets/img/headshot.png",
            "jobTitle": "Technopreneur & Software Engineer",
            "email": "mailto:iamgodwinubani@gmail.com",
            "alumniOf": [
              {
                "@type": "CollegeOrUniversity",
                "name": "Jiangxi University of Science and Technology"
              },
              { "@type": "EducationalOrganization", "name": "Aptech" }
            ],
            "knowsAbout": [
              "Software Engineering",
              "Artificial Intelligence",
              "Cybersecurity",
              "Cross-Border Commerce",
              "Renewable Energy"
            ],
            "sameAs": [
${SOCIAL.map(([, u]) => `              "${u}"`).join(",\n")}
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://godwinubani.com/#website",
            "url": "https://godwinubani.com/",
            "name": "Godwin Ubani",
            "inLanguage": "en",
            "about": { "@id": "https://godwinubani.com/#godwin" }
          },
          {
            "@type": "Book",
            "name": "Shield Up: Defending Your Digital World",
            "author": { "@id": "https://godwinubani.com/#godwin" },
            "image": "https://godwinubani.com/assets/img/shield-up-cover.png",
            "inLanguage": "en",
            "genre": "Cybersecurity"
          }
        ]
      }
    </script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="#home">Godwin Ubani</a>
        <input class="nav-toggle" type="checkbox" id="nav-toggle" />
        <label class="nav-toggle-label" for="nav-toggle" tabindex="0"
          ><span aria-hidden="true">&#9776;</span
          ><span class="skip-link">Menu</span></label
        >
        <nav class="nav" aria-label="Main">
${NAV.map(([h, l]) => `          <a href="${h}">${l}</a>`).join("\n")}
          <a class="cta" href="#contact">Contact</a>
        </nav>
      </div>
    </header>

    <main id="main">
      <!-- ===================== HERO ===================== -->
      <section class="section hero" id="home">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <div class="avatar-ring">
              <img
                class="avatar"
                src="assets/img/headshot.png"
                alt="Godwin Ubani"
                width="300"
                height="300"
              />
            </div>
            <h1 class="greeting">&gt;Hi, I am <b>Godwin</b>!_</h1>
            <p class="role">Technopreneur | Software Engineer</p>
            <p class="creds">
              Software Engineering | AI | Cybersecurity | Cross&#8209;Border Commerce
            </p>
            <div class="hero-actions">
              <a class="btn btn-solid" href="#app">Explore my work</a>
              <a class="btn" href="#contact">Let&rsquo;s talk</a>
            </div>

            <div class="building">
              <h2>Building</h2>
              <ul>
                <li>Korvanta</li>
                <li>Korvanta Business</li>
              </ul>
            </div>
          </div>

          <div class="globe" data-globe>
            <canvas
              role="img"
              aria-label="Rotating globe tracing a trade route from Abia, Nigeria to Shenzhen, China. Drag to rotate."
            ></canvas>
            <span class="globe-label" data-globe-label="origin"
              ><b>Abia</b>Nigeria</span
            >
            <span class="globe-label" data-globe-label="destination"
              ><b>Shenzhen</b>China</span
            >
            <p class="globe-caption">
              <span>Abia &rarr; Shenzhen</span> the route Korvanta is built on
            </p>
          </div>
        </div>
      </section>

      <!-- ===================== STORY ===================== -->
      <section class="section" id="story">
        <div class="wrap">
          <span class="eyebrow">01 / Story</span>
          <h2 class="section-title">Story</h2>
          <p class="section-sub">
            From a first website at Mobile Tech Hub to building companies out of
            Ganzhou.
          </p>
          <div class="grid">
${STORY.map(
  ([img, cap]) => `            <article class="card">
              <img src="assets/img/${img}" alt="${cap.replace(/"/g, "&quot;")}" loading="lazy" />
              <p>${cap}</p>
            </article>`
).join("\n")}
          </div>
        </div>
      </section>

      <!-- ===================== VENTURES ===================== -->
      <section class="section" id="app">
        <div class="wrap">
          <span class="eyebrow">02 / App</span>
          <h2 class="section-title">App</h2>
          <p class="section-sub">The apps I am building, and where to get them.</p>
${blocks(VENTURES)}
        </div>
      </section>

      <!-- ===================== BOOK ===================== -->
      <section class="section" id="book">
        <div class="wrap">
          <span class="eyebrow">03 / Published</span>
          <h2 class="section-title">Book</h2>
          <p class="section-sub">
            A cybersecurity book written for people who do not care about
            cybersecurity.
          </p>
          <div class="block">
            <div class="block-media">
              <div class="book3d" data-book3d>
                <div class="book3d-body" data-3d-body>
                  <div class="book3d-face book3d-front">
                    <img
                      src="assets/img/shield-up-cover.png"
                      alt="Shield Up: Defending Your Digital World — book cover"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  <div class="book3d-face book3d-back">
                    <p class="book3d-back-kicker">Shield Up</p>
                    <p class="book3d-back-quote">
                      Most security advice is written for people who already
                      agree with it. This book is for everyone else.
                    </p>
                    <p class="book3d-back-author">Godwin Ubani</p>
                  </div>
                  <div class="book3d-spine">
                    <span>Shield Up</span><span>Godwin Ubani</span>
                  </div>
                  <div class="book3d-pages"></div>
                  <div class="book3d-edge book3d-top"></div>
                  <div class="book3d-edge book3d-bottom"></div>
                </div>
              </div>
              <a
                class="btn btn-solid btn-wide"
                href="assets/files/shield-up-defending-your-digital-world.pdf"
                download
                >Download</a
              >
            </div>
            <div class="block-body">
              <h3>Shield Up: Defending Your Digital World</h3>
              <p class="meta">By Godwin Ubani</p>
              <p>
                The complete Gen Z guide to online safety, digital identity and
                thriving in a cyber world.
              </p>
              <p>
                Most security advice is written for people who already agree
                with it. This book is written for everyone else — the people who
                know they should use a password manager and haven&rsquo;t, and
                who have never been given a reason to believe their own actions
                change the outcome.
              </p>
              <ul>
                <li>Threat modelling for people who are not engineers</li>
                <li>Why fear-based security advice backfires</li>
                <li>The three controls that matter more than the other twenty</li>
                <li>Building a security habit that survives friction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================== EXPERTISE ===================== -->
      <section class="section" id="expertise">
        <div class="wrap">
          <span class="eyebrow">04 / Capability</span>
          <h2 class="section-title">Expertise</h2>
          <p class="section-sub">Skills, training and the work behind them.</p>
          <div class="cards3d">
${cards(EXPERTISE)}
          </div>
        </div>
      </section>

      <!-- ===================== WRITING ===================== -->
      <section class="section" id="writing">
        <div class="wrap">
          <span class="eyebrow">05 / Writing</span>
          <h2 class="section-title">Writing</h2>
          <p class="section-sub">
            Notes on cross-border trade, renewable energy and the security of
            the systems we are all quietly depending on. Read them here.
          </p>
          <div class="posts">
${POSTS.map(
  (p) => `            <article class="post">
              <p class="post-read">${p.minutes} min read</p>
              <h3><a href="posts/${p.slug}.html">${p.title}</a></h3>
              <p class="sub">${p.sub}</p>
              <p class="excerpt">${p.excerpt}</p>
              <a class="more" href="posts/${p.slug}.html">Read the post &rarr;</a>
            </article>`
).join("\n")}
          </div>
        </div>
      </section>

      <!-- ===================== CONTACT ===================== -->
      <section class="section contact" id="contact">
        <div class="wrap">
          <span class="eyebrow">06 / Contact</span>
          <h2 class="section-title">Let&rsquo;s talk</h2>
          <p class="section-sub" style="margin-inline: auto">
            Have an idea worth building? I am always interested in ambitious
            ideas and meaningful collaborations.
          </p>
          <p class="mail">
            <a href="mailto:iamgodwinubani@gmail.com">iamgodwinubani@gmail.com</a>
          </p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-top">
          <span class="footer-brand">Godwin Ubani</span>
          <ul class="footer-links">
${NAV.map(([h, l]) => `            <li><a href="${h}">${l}</a></li>`).join("\n")}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <ul class="footer-social">
${SOCIAL.map(([n, u]) => `          <li><a href="${u}"${ext}>${n}</a></li>`).join("\n")}
        </ul>
        <p class="copyright">© 2026 Godwin Ubani. All rights reserved.</p>
      </div>
    </footer>
    <script type="module" src="assets/js/objects.min.js"></script>
    <script type="module" src="assets/js/globe.min.js"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "index.html"), html.split("\n").join("\r\n"), "utf8");

/* The inner pages are folded into the landing page. */
let removed = 0;
for (const f of ["story.html", "book.html", "ventures.html", "expertise.html"]) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    removed++;
  }
}
console.log("index.html written; " + removed + " inner pages folded in");
