async function injectBookmarklet() {
	try {
		const scriptUrl = chrome.runtime.getURL('script/minified.js');
		const response = await fetch(scriptUrl);
		let scriptContent = await response.text();

		// Remove the javascript: prefix if it exists
		if (scriptContent.startsWith('javascript:')) {
			scriptContent = scriptContent.substring('javascript:'.length);
		}

		// Create and inject script element
		const script = document.createElement('script');
		script.textContent = scriptContent;
		(document.head || document.documentElement).appendChild(script);
		script.remove();

	} catch (error) {
		console.error('Failed to load script:', error);
	}
}

// Execute when page loads
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', injectBookmarklet);
} else {
	injectBookmarklet();
}
