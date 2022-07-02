# `<link rel="serviceworker">` Patch
🩹 Global JS monkeypatch for `<link rel="serviceworker">`

## How To Use

Include a `<script>` tag somewhere in your HTML source code. When the `DOMContentLoaded` event fires (or immediately when loaded if it already happened), this script should find the first `<link rel="serviceworker" href="/sw.js">`-like `<link>` tag and register that service worker for you!

CDN links:
- Statically.io: https://cdn.statically.io/gh/jcbhmr/link-rel-serviceworker-patch/trunk/main.min.js
- T.LY link to Statically.io (shorter to type): https://t.ly/Js9d

HTML example snippet
```html
<head>
    <script crossorigin src=""></script>
```

## How To Develop

1. Write JS code
2. Compile into a single module with [Rollup's online repl](https://rollupjs.org/repl) (make sure to export as UMD!)
3. Compile that result into a `.min.js` file with [Terser's online repl](https://try.terser.org/) (make sure you set `module: false` in the options!)
