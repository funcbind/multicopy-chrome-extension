const EXTENSIONS_CONTEXTS = {
	CONTENT_SCRIPT: 'content-script',
	POPUP: 'popup',
	OPTIONS: 'options',
	BACKGROUND: 'background',
	DEVTOOLS: 'devtools',
	OFFSCREEN: 'offscreen',
};

export function getBrowserAPI() {
	let api;

	try {
		// eslint-disable-next-line no-undef
		api = self.chrome || self.browser || browser;
	} catch (error) {
		// eslint-disable-next-line no-undef
		api = browser;
	}

	if (!api) {
		throw new Error('Browser API is not present');
	}

	return api;
}

export function getContextType() {
	const browser = getBrowserAPI();
	const manifest = browser.runtime.getManifest();

	// console.log(`manifest`, manifest);

	const isContentScript = Boolean(
		!browser.tabs && browser.extension && browser.runtime.getURL
	);
	const isOffscreen = Boolean(
		!browser.tabs && !browser.extension && browser.runtime.getURL
	);
	const isOptionsPage =
		Boolean(browser.tabs) &&
		location.href ===
			browser.runtime.getURL(
				manifest.options_page || manifest.options_ui?.page || ''
			);
	// this will be wrong when using browser.action.setPopup with a different path
	const isPopupPage =
		Boolean(browser.tabs) &&
		location.href ===
			browser.runtime.getURL(
				(manifest.action || manifest.browser_action)?.default_popup
			);
	const isDevtools = Boolean(browser.devtools);

	const getBackgroundPageFn = browser.extension?.getBackgroundPage;
	const isBackgroundPage =
		manifest.manifest_version === 3
			? typeof ServiceWorkerGlobalScope === 'function'
			: getBackgroundPageFn === window;

	const activeContexts = {
		[EXTENSIONS_CONTEXTS.CONTENT_SCRIPT]: isContentScript,
		[EXTENSIONS_CONTEXTS.OFFSCREEN]: isOffscreen,
		[EXTENSIONS_CONTEXTS.OPTIONS]: isOptionsPage,
		[EXTENSIONS_CONTEXTS.POPUP]: isPopupPage,
		[EXTENSIONS_CONTEXTS.DEVTOOLS]: isDevtools,
		[EXTENSIONS_CONTEXTS.BACKGROUND]: isBackgroundPage,
	};

	// console.log(`Utils -> getContextType() :  Active Contexts: `, activeContexts);

	const activeContextsCount = Object.values(activeContexts).filter(
		(activeContext) => Boolean(activeContext)
	);

	const moreThanOneActiveContext = activeContextsCount.length > 1;
	const noActiveContext = activeContextsCount.length === 0;

	if (moreThanOneActiveContext) {
		throw new Error(
			`Utils -> getContextType() : Multiple active contexts found : Some Testing Method Failed`
		);
	}

	if (noActiveContext) {
		throw new Error(
			`Utils -> getContextType() : No active context found : Some Testing Method Failed`
		);
	}

	let contextType = '';
	for (let [key, value] of Object.entries(activeContexts)) {
		if (value) {
			contextType = key;
			break;
		}
	}

	if (contextType === '') {
		throw new Error(
			`Utils -> getContextType() : Right context not found : Some Testing Method Failed`
		);
	}

	// console.log(`Utils.js : getContextType() - contextType : `, contextType);

	return contextType;
}
