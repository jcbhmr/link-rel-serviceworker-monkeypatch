const linkRelServiceworkerPatch = /* async */ (
	window$ = window,
	document = window.document,
) => {
	// All <link> tags
	const elements = [...document.getElementsByTagName("link")]
		// Must have rel="serviceworker"
		.filter((element) => element.relList.contains("customelement"))

	// Returns null | HTMLLinkElement
	const element = elements[0]
	if (element == null) {
		return null
	}

	// Default to type="module"
	navigator.serviceWorker.register(element.href, { type: "module" })

	return element
}

export { linkRelServiceworkerPatch as default }
