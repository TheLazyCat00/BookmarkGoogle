javascript:(function(){
	if(window._mapsInterceptorActive) return;
	window._mapsInterceptorActive = true;

	// Intercept fetch
	const originalFetch = window.fetch;
	window.fetch = function(...args) {
		const url = args[0];
		// 'maps/preview/reveal' is also interesting

		if (typeof url === 'string' && url.includes('maps/preview/place')) {
			return originalFetch.apply(this, args).then(response => {
				const responseClone = response.clone();
				responseClone.text().then(text => {
					handleMapsPlace(url, text);
				});
				return response;
			});
		}
		return originalFetch.apply(this, args);
	};

	// Intercept XHR (this is likely what Google Maps uses)
	const originalXHROpen = window.XMLHttpRequest.prototype.open;
	const originalXHRSend = window.XMLHttpRequest.prototype.send;

	window.XMLHttpRequest.prototype.open = function(method, url, ...args) {
		this._url = url;
		return originalXHROpen.apply(this, [method, url, ...args]);
	};

	window.XMLHttpRequest.prototype.send = function(...args) {
		this.addEventListener('load', function() {
			// 'maps/preview/reveal' is also interesting

			if (this._url && this._url.includes('maps/preview/place')) {
				handleMapsPlace(this._url, this.responseText);
			}
		});
		return originalXHRSend.apply(this, args);
	};

	function handleMapsPlace(url, responseData) {
		// Remove Google's security prefix
		let cleanData = responseData;
		if (responseData.startsWith(")]}'")) {
			cleanData = responseData.substring(4);
		}

		try {
			const data = JSON.parse(cleanData);
			
			let mainChunk = data[6];
			let adress = mainChunk[2];

			let place = {
				shortcut: mainChunk[42],

				name: mainChunk[11],
				street: adress[0],
				place: adress[1],

				phone: mainChunk[178][0][1][1][0],
				url: mainChunk[7][0],
				urlName: mainChunk[7][1],

				coords: { x: mainChunk[9][2], y: mainChunk[9][3] },
			}

			let string =
				`---\n` +
				`locations: ""\n` +
				`\n` +
				`---\n` +
				`### 🌎 [${place.name}](${place.shortcut})\n` +
				`> - [${place.urlName}](${place.url})\n` +
				`> - [📍 ${place.street}, ${place.place}](geo:${place.coords.x},${place.coords.y})\n` +
				`> - 📞 ${place.phone}\n`;

			navigator.clipboard.writeText(string).then(() => {
				//  -- Success
			}).catch(err => {
				console.error('Could not copy text: ', err);
			});
		} catch(e) {
			console.error('Parse error:', e);
		}
	}
})();
