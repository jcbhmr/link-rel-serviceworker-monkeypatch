#! /usr/bin/env bash
set -eux
# This command doesn't seem to work on Replit...
#! /usr/bin/env -S bash -eux

# This script generates the following files:
# - main.js
# - main.d.ts
# - main.iife.js
# - main.iife.min.js
# - -.js
# - -.d.ts
#
# Note that NO .js.map files are generated. This is because
# the source .ts files are removed from the NPM package, which
# therefore would render any sourcemaps useless!

# This enables fancy globs
shopt -s globstar extglob

# Generates .js and .d.ts files
npx --package typescript tsc \
  --target esnext \
  --module esnext \
  --declaration \
  ./**/!(*.d).ts

# Geneates .iife.js file
npx rollup \
  ./main.js \
  --format=iife \
  --name="__linkRelServiceworkerPolyfill" \
  --file="./main.iife.js"
  
# Geneates .iife.min.js file
npx terser \
  ./main.iife.js \
  --compress \
  --mangle \
  --output="./main.iife.min.js"
