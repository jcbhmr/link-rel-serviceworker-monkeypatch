# `<link rel="serviceworker">` Polyfill

🐵🔧 Monkeypatch for `<link rel="serviceworker">`

```html
<link rel="serviceworker" href="/sw.js" type="module" />
```

**Warning:** I recommend against actually using this code in any production-grade environment

## How To Use

Include a `<script>` tag somewhere in your HTML source code. That's it! Oh, and don't expect any `link.href` mutations you make to be reflected in any way. This polyfill patch runs _only once_ on the initial page load. After that, you're left with a bunch of regular `<link>` tags.

```html
<script
  crossorigin
  src="https://unpkg.com/@jcbhmr/link-rel-serviceworker-polyfill@1.0.0/main.iife.min.js"
></script>
```

You can also use this as an ES-module

```sh
npm install @jcbhmr/link-rel-serviceworker-polyfill
```

```js
import "@jcbhmr/link-rel-serviceworker-polyfill/main.js";
```

You can [inspect all the generated files over on runpkg](https://runpkg.com/@jcbhmr/link-rel-serviceworker-polyfill@1.0.0) and see which one you want to import

## How To Develop

1. Press the gray "Fork" button on GitHub to make your own copy of this repo
2. Open that fork in your favorite editor (clone it locally, [edit it online](https://github.com/github/dev#readme), whatever)
3. Write code in TypeScript
4. Make sure that the code compiles by running `./build.sh`
5. Commit & push to your fork
6. Open a Pull Request against this repository with the big green button on your forked repo page
7. Profit!
