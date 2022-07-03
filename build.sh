#! /usr/bin/env bash
set -eux
# This command doesn't seem to work on Replit...
#! /usr/bin/env -S bash -eux

# This script generates the following files:
# - ~.js
# - ~.d.ts
# - ~.iife.js
# - ~.iife.min.js
#
# Note that NO .js.map files are generated. This is because
# the source .ts files are removed from the NPM package, which
# therefore would render any sourcemaps useless!

# This enables fancy globs
shopt -s globstar extglob

# ~.ts ➡️ ~.js, ~.d.ts
npx --package typescript tsc \
  --target esnext \
  --module esnext \
  --declaration \
  ./**/!(*.d).ts
# That fancy glob pattern was found on StackOverflow
# Ref: https://stackoverflow.com/a/59598579

# ~.js ➡️ ~.iife.js
npx rollup \
  ./~.js \
  --format=iife \
  --name="__linkRelServiceworkerPolyfill" \
  --file="./~.iife.js"
  
# ~.iife.js ➡️ ~.iife.min.js
npx terser \
  ./~.iife.js \
  --compress \
  --mangle \
  --output="./~.iife.min.js"
