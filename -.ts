// All of these have .querySelectorAll()-type methods
type DocumentLike = Document | DocumentFragment | ShadowRoot | Element

/**
 * 🏗️ Inspects the document for a <link rel="serviceworker"> and
 * registers it
 *
 * The first <link rel="serviceworker"> wins, regardless of its
 * validity. Any others will emit an error event on themselves.
 *
 * The scope="" and type="" attributes are used to build the
 * options object that is passed to serviceWorker.register()
 * function. Any errors in registration will be passed up as
 * error events to the relevant <link> element.
 *
 * This polyfill does NOT respond to updates the the <link>
 * tag after the DOMContentLoaded event. It is a single-execution
 * function. You can trigger it again manually if you so choose.
 */
export default (
  node: DocumentLike = document,
  serviceWorker: ServiceWorkerContainer = navigator.serviceWorker
) => {
  // Extract only the first one to deal with, emit an error
  // event on all the other ones
  const [first, ...rest] = [...node.querySelectorAll("link")].filter((link) =>
    link.relList.contains("serviceworker")
  );

  // Here we .dispatchEvent() so that all these invalid link elements
  // get the message that they, indeed, invalid
  for (const link of rest) {
    const error = new Error(`<link rel="serviceworker"> tag already declared!`);
    link.dispatchEvent(
      new ErrorEvent("error", { error, message: error.message })
    );
  }

  // Might have been a 0-length array!
  if (first == null) {
    return;
  }

  // Now we deal with that original <link> element. We use promises here
  // instead of async-await because they mesh with this being a sync function.
  // These possibly-undefined function calls are OK since if they are indeed
  // undefined, the option won't be interpreted by the .register() function!
  serviceWorker
    .register(first.href, {
      scope: first.getAttribute("scope"),
      type: first.getAttribute("type") as WorkerType,
    })
    .then((registration) => {
      // Make sure to notify the <link> element that it worked!
      first.dispatchEvent(new CustomEvent("load", { detail: registration }));
    })
    .catch((error) => {
      // Something went wrong, so better forward that on to the <link> element
      first.dispatchEvent(
        new ErrorEvent("error", { error, message: error.message })
      );
    });

  // Don't return anything since this is a side-effect-only function
};
