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
	const [link, ...rest] = [...node.querySelectorAll("link")].filter((link) =>
		link.relList.contains("serviceworker"),
	)

	// Here we .dispatchEvent() so that all these invalid link elements
	// get the message that they, indeed, invalid
	for (const other of rest) {
		const error = new Error(
			`Cannot have multiple <link rel="serviceworker"> tags`,
		)
		const event = new ErrorEvent("error", { error, message: error.message })
		queueMicrotask(() => void other.dispatchEvent(event))
	}

	// Might have been a 0-length array
	if (link == null) {
		return
	}

	// Now we deal with that original <link> element. We use an anonymous
	// async function here to make the code flow a little better.
	;(async () => {
		try {
			// 1. Ensure that a valid href was set
			if (first.href === "") {
				throw new TypeError(`Invalid href URL`)
			}

			// 2. Generate the options object conditionally
			const options: { scope?: string; type?: WorkerType } = {}
			if (first.hasAttribute("scope")) {
				options.scope = first.getAttribute("scope")
			}
			if (first.hasAttribute("type")) {
				options.type = first.getAttribute("type")
			}

			// 3. Register it with the serviceWorker
			const success = await serviceWorker.register(first.href, options)

			// Report success
			// Why queueMicrotask()? Well, let me explain...
			// When you use .dispatchEvent(), it executes all registered listeners
			// synchronously. This means that any errors they throw are in the scope
			// of that function, as though the .dispatchEvent() call threw those errors.
			// This queueMicrotask() hoists those thrown errors out of the scope of this
			// try-catch block and into the global scope so that they are uncaught!
			// This is also exactly what the browser does for all its emitted events. ONLY
			// USER EVENTS (the ones manually triggered with .dispatchEvent()) have this
			// issue. Browser-level events are queued until an event loop churn happens.
			const event = new CustomEvent("load", { detail: success })
			queueMicrotask(() => void link.dispatchEvent(event))
		} catch (error: Error) {
			// Report error
			const event = new ErrorEvent("error", {
				error,
				message: error.message,
			})
			queueMicrotask(() => void link.dispatchEvent(event))
			return
		}
	})()

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
// Uh oh! Looks like this was loaded post-DOM initialization, better
// immediately run the script.
else {
	main()
}

// Just in case you want to use it again, here it is
export default main
