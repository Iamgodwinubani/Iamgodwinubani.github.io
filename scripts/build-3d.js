#!/usr/bin/env node
/**
 * Bundles the 3D code into assets/js/.
 *
 *   npm install          (once — installs three and esbuild)
 *   npm run build:3d
 *
 * three.js r186 ships no minified build: three.module.js plus three.core.js is
 * roughly 2 MB. esbuild tree-shakes it down to only the classes the globe
 * imports, then minifies. The two entry points are kept separate so the light
 * CSS 3D objects never wait on the WebGL bundle.
 */

const path = require("path");
const fs = require("fs");

let esbuild;
try {
  esbuild = require("esbuild");
} catch {
  console.log("build-3d: esbuild not installed — run `npm install`. Keeping the committed bundles.");
  process.exit(0);
}

const ROOT = path.resolve(__dirname, "..");

esbuild
  .build({
    entryPoints: {
      globe: path.join(ROOT, "src/3d/globe.js"),
      objects: path.join(ROOT, "src/3d/objects.js"),
    },
    outdir: path.join(ROOT, "assets/js"),
    entryNames: "[name].min",
    bundle: true,
    minify: true,
    format: "esm",
    target: ["es2020"],
    legalComments: "none",
    metafile: true,
    logLevel: "warning",
  })
  .then((result) => {
    for (const [file, info] of Object.entries(result.metafile.outputs)) {
      const bytes = info.bytes;
      const gz = require("zlib").gzipSync(fs.readFileSync(path.join(ROOT, file))).length;
      console.log(
        "  " + path.relative(ROOT, path.join(ROOT, file)).padEnd(26) +
          (bytes / 1024).toFixed(0).padStart(5) + " KB  (" +
          (gz / 1024).toFixed(0) + " KB gzip)"
      );
    }
  })
  .catch(() => process.exit(1));
