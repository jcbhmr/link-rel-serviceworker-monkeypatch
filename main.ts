/**
 * Here, we just run the function that was the main export.
 * That's it. Oh, and we export the underlying main() function
 * in case you ever want to call it again.
 *
 * This module should execute the main() function ONCE
 * when the page loads. Now, this COULD be run after it has
 * already loaded, but that is the "else" case, since it
 * isn't expected.
 */

import main from "./-";

// We expect that the document is still in "building DOM"
// state since the <script> tag (NON-module type) should
// be included before the DOM finishes parsing (since it
// blocks as a classic script)
if (document.readyState === "loading") {
  // Here we listen for the DOMContentLoaded event which
  // triggers when the DOM is completely 100% no-doubt
  // parsed and all the original HTML text is parsed into
  // a tree. If we tried to to main() immediately, we might
  // find that no <link> tags exist because they haven't made
  // the jump from HTML text into actual live DOM elements!
  document.addEventListener("DOMContendLoaded", () => void main(), {
    // This auto-unregisters this listener when it runs
    once: true,
  });
}
// Uh oh! Looks like this was loaded post-DOM initialization!
// Better immediately run the script!
else {
  main()
}

// Just in case you want to use it again, here it is!
export default main
