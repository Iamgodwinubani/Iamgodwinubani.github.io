const fs = require("fs");
const path = require("path");
const ROOT = process.argv[2];

const NAV = [
  ["#home", "Home"],
  ["#story", "Story"],
  ["#book", "Book"],
  ["#ventures", "Ventures"],
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

const stores = `              <div class="stores">
                <a class="store" href="https://korvanta.vercel.app"${ext}>
                  <small>Get it on</small><b>Google Play</b>
                </a>
                <a class="store" href="https://korvanta.vercel.app"${ext}>
                  <small>Download on the</small><b>App Store</b>
                </a>
              </div>`;

const VENTURES = [
  {
    media: `<img src="assets/img/k-app-s.png" alt="Korvanta app screens — onboarding, RMB wallet and auto-translating supplier chat" loading="lazy" />`,
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
    media: `<img src="assets/img/k-app-s.png" alt="Korvanta app screens" loading="lazy" />`,
    title: "Korvanta Business",
    meta: "For Suppliers &amp; Growing Importers",
    body: [
      "The business side of the same rails — built for verified suppliers and for importers buying at volume rather than one carton at a time.",
      "Team accounts, bulk order management and the reconciliation trail that a growing import business needs once a spreadsheet stops being enough.",
    ],
    list: ["Verified supplier accounts", "Bulk orders and team access", "Invoices, escrow and reconciliation"],
    actions: `              <div class="actions">
                <a class="btn" href="https://korvanta.vercel.app"${ext}>Visit the website</a>
              </div>`,
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
            "email": "mailto:hello@godwinubani.com",
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
      <section class="section hero wrap" id="home">
        <h1 class="greeting">&gt;Hi, I am <b>Godwin</b>!_</h1>
        <div class="avatar-ring">
          <img
            class="avatar"
            src="assets/img/headshot.png"
            alt="Godwin Ubani"
            width="300"
            height="300"
          />
        </div>
        <p class="role">Technopreneur | Software Engineer</p>
        <p class="creds">
          Software Engineering | AI | Cybersecurity | Cross-Border Commerce |
          Renewable Energy
        </p>
        <div class="hero-actions">
          <a class="btn btn-solid" href="#ventures">Explore my work</a>
          <a class="btn" href="#contact">Let&rsquo;s talk</a>
        </div>

        <div class="building">
          <h2>Building</h2>
          <ul>
            <li>Korvanta</li>
            <li>Vokra Solar</li>
            <li>AfroBridge AI</li>
            <li>WebZap</li>
            <li>SafePrompt</li>
          </ul>
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

      <!-- ===================== BOOK ===================== -->
      <section class="section" id="book">
        <div class="wrap">
          <span class="eyebrow">02 / Published</span>
          <h2 class="section-title">Book</h2>
          <p class="section-sub">
            A cybersecurity book written for people who do not care about
            cybersecurity.
          </p>
          <div class="block">
            <div class="block-media">
              <img
                src="assets/img/shield-up-cover.png"
                alt="Shield Up: Defending Your Digital World — book cover"
                loading="lazy"
              />
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

      <!-- ===================== VENTURES ===================== -->
      <section class="section" id="ventures">
        <div class="wrap">
          <span class="eyebrow">03 / Work</span>
          <h2 class="section-title">Ventures</h2>
          <p class="section-sub">Companies and products, built and building.</p>
${blocks(VENTURES)}
        </div>
      </section>

      <!-- ===================== EXPERTISE ===================== -->
      <section class="section" id="expertise">
        <div class="wrap">
          <span class="eyebrow">04 / Capability</span>
          <h2 class="section-title">Expertise</h2>
          <p class="section-sub">Skills, training and the work behind them.</p>
${blocks(EXPERTISE)}
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
            <a href="mailto:hello@godwinubani.com">hello@godwinubani.com</a>
          </p>
          <div class="hero-actions">
${SOCIAL.slice(0, 4)
  .map(([n, u]) => `            <a class="btn" href="${u}"${ext}>${n}</a>`)
  .join("\n")}
          </div>
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
