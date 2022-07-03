/**
 * This module should execute the main() function ONCE
 * when the page loads. Now, this COULD be run after it has
 * already loaded, but that is the "else" case, since it
 * isn't expected.
 */

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
const main = (
	node: DocumentLike = document,
	serviceWorker: ServiceWorkerContainer = navigator.serviceWorker,
) => {
	// Extract only the first one to deal with, emit an error
	// event on all the other ones
	const [first, ...rest] = [...node.querySelectorAll("link")].filter((link) =>
		link.relList.contains("serviceworker"),
	)

	// Here we .dispatchEvent() so that all these invalid link elements
	// get the message that they, indeed, invalid
	for (const link of rest) {
		const error = new Error(
			`<link rel="serviceworker"> tag already declared!`,
		)
		link.dispatchEvent(
			new ErrorEvent("error", { error, message: error.message }),
		)
	}

	// Might have been a 0-length array!
	if (first == null) {
		return
	}

	// Now we deal with that original <link> element. We use promises here
	// instead of async-await because they mesh with this being a sync function.
	// These possibly-undefined function calls are OK since if they are indeed
	// undefined, the option won't be interpreted by the .register() function!

	// 1. Ensure that a valid href was set
	if (first.href === "") {
		const error = new Error(`Invalid href URL!`)
		first.dispatchEvent(new ErrorEvent("error", { error, message: error.message }))
	}

	// 2. Generate the options object conditionally
	const options = {}
	if (first.hasAttribute("scope")) {
		options.scope = first.getAttribute("scope")
	}
	if (first.hasAttribute("type")) {
		options.type = first.getAttribute("type")
	}

	// 3. Apply those options
	serviceWorker
		.register(first.href, options)
		.then((registration) => {
			// Make sure to notify the <link> element that it worked!
			first.dispatchEvent(
				new CustomEvent("load", { detail: registration }),
			)
		})
		.catch((error) => {
			// Something went wrong, so better forward that on to the <link> element
			first.dispatchEvent(
				new ErrorEvent("error", { error, message: error.message }),
			)
		})

	// Don't return anything since this is a side-effect-only function
}

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
	document.addEventListener("DOMContentLoaded", () => void main(), {
		// This auto-unregisters this listener when it runs
		once: true,
	})
}
// Uh oh! Looks like this was loaded post-DOM initialization!
// Better immediately run the script!
else {
	main()
}

// Just in case you want to use it again, here it is!
export default main
