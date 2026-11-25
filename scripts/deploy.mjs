// Builds the site and publishes ./out to the gh-pages branch (served by GitHub Pages).
// Usage: npm run deploy            (builds first)
//        npm run deploy -- --skip-build
import { execSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" });
const read = (cmd, cwd) => execSync(cmd, { cwd }).toString().trim();

const root = process.cwd();
const out = join(root, "out");
const remote = read("git remote get-url origin", root);

if (!process.argv.includes("--skip-build")) run("npm run build", root);
if (!existsSync(join(out, "index.html"))) throw new Error("Build output ./out/index.html not found.");

// GitHub Pages: skip Jekyll processing and keep the custom domain.
writeFileSync(join(out, ".nojekyll"), "");
writeFileSync(join(out, "CNAME"), "godwinubani.me\n");

const sha = read("git rev-parse --short HEAD", root);
// Start from a clean repository each time (a previous failed run may have left one).
rmSync(join(out, ".git"), { recursive: true, force: true });
run("git init -q -b gh-pages", out);
run("git add -A", out);
run(`git -c user.name="${read("git config user.name", root)}" -c user.email="${read("git config user.email", root)}" commit -q -m "Deploy ${sha}"`, out);
run(`git push -f ${remote} gh-pages`, out);
console.log(`\nPublished ${sha} to gh-pages.`);
