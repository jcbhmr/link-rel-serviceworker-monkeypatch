import linkRelServiceworkerPatch from "./-.js"

// If the document is already loaded, run main() immediately
if (document.readyState !== "loading") {
	linkRelServiceworkerPatch()
}
// Otherwise, wait for the DOMContentLoaded event before doing so
else {
	document.addEventListener(
		"DOMContentLoaded",
		() => void linkRelServiceworkerPatch(),
		{
			passive: true,
			once: true,
		},
	)
}
