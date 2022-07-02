# `<link rel="serviceworker">` Patch
🩹 Global JS monkeypatch for `<link rel="serviceworker">`

## How To Use

Include a `<script>` tag somewhere in your HTML source code. When the `DOMContentLoaded` event fires (or immediately when loaded if it already happened), this script should find the first `<link rel="serviceworker" href="/sw.js">`-like `<link>` tag and register that service worker for you!

CDN links:
- Statically.io: {TODO}
- T.LY link to Statically.io (shorter to type): {TODO}

HTML example snippet
```html
<head>
    <script crossorigin src=""></script>
```

## How To Develop

1. Write JS code
2. Compile into a single module with [Rollup's online repl](https://rollupjs.org/repl/?version=2.75.7&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMiUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTVEJTJDJTIyb3B0aW9ucyUyMiUzQSU3QiUyMmZvcm1hdCUyMiUzQSUyMmVzJTIyJTJDJTIybmFtZSUyMiUzQSUyMm15QnVuZGxlJTIyJTJDJTIyYW1kJTIyJTNBJTdCJTIyaWQlMjIlM0ElMjIlMjIlN0QlMkMlMjJnbG9iYWxzJTIyJTNBJTdCJTdEJTdEJTJDJTIyZXhhbXBsZSUyMiUzQW51bGwlN0Q=)
3. Compile that result into a `.min.js` file with [Terser's online repl](https://try.terser.org/) (make sure you set `module: false` in the options!)
