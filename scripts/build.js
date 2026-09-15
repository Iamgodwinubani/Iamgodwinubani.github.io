#!/usr/bin/env node
/**
 * Builds the whole site, in the only order that is correct.
 *
 *   node scripts/build.js
 *
 * There is a circular dependency between the two builders:
 *
 *   build-posts.js   reads blog-drafts/medium-posts.md
 *                    writes posts/*.html  (header and footer lifted from index.html)
 *                    writes scripts/posts.json
 *
 *   build-landing.js reads scripts/posts.json
 *                    writes index.html
 *
 * So posts must run first to produce posts.json, then the landing page, then
 * posts again so the pages pick up the freshly written header and footer.
 * Skipping that last pass leaves stale navigation on every post page — which
 * is exactly how the nav on the post pages once ended up pointing at a section
 * that had been renamed.
 */

const { execFileSync } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const run = (script, args = []) =>
  execFileSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: ROOT,
    stdio: "inherit",
  });

console.log("1/4  posts (for posts.json)");
run("build-posts.js");

console.log("2/4  landing page");
run("build-landing.js", [ROOT]);

console.log("3/4  posts again (to pick up the new header and footer)");
run("build-posts.js");

console.log("4/4  sitemap and robots");
run("generate-sitemap.js");

console.log("\nBuild complete.");
