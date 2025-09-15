# Bookmark Google Maps

A browser extension that automatically extracts location data from Google Maps and formats it for [Obsidian Map View](https://github.com/esm7/obsidian-map-view).

## ✨ Features

- **One-Click Data Extraction**: Click on any location in Google Maps to automatically copy formatted data
- **Obsidian Integration**: Seamlessly works with the [Obsidian Map View](https://github.com/esm7/obsidian-map-view) plugin
- **Cross-Platform Support**: Available for desktop browsers and mobile devices
- **Privacy-Focused**: Reduces dependency on Google Maps by allowing easy data export

## 🎯 How It Works

1. Browse to any location on Google Maps
2. Click on a place (restaurant, landmark, etc.)
3. The extension automatically copies formatted location data to your clipboard
4. Paste the data directly into your Obsidian notes
5. View the location in Obsidian Map View

## 📦 Installation

### 🖥️ Desktop (Firefox/Zen Browser)
Install directly from the Firefox Add-ons store:

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Install%20Extension-orange?logo=firefox)](https://addons.mozilla.org/en-US/firefox/addon/bookmark-google-maps/)

### 📱 Mobile Devices
Due to mobile browser limitations, installation requires creating a bookmarklet:

1. **Create the bookmarklet**:
   - Add a new bookmark/favorite in your mobile browser
   - Instead of a URL, paste the contents of `script/minified.js` from this repository
   - Save the bookmark with a recognizable name (e.g., "Extract Map Data")

2. **Usage**:
   - Navigate to Google Maps and select a location
   - Tap your bookmarklet to run the script
   - The formatted data will be copied to your clipboard

## 🚀 Usage

1. **Extract Location Data**:
   - Open Google Maps in your browser
   - Click on any location (restaurant, store, landmark, etc.)
   - The extension will automatically copy the formatted data

2. **Import to Obsidian**:
   - Open your Obsidian vault
   - Paste the copied content into any note
   - The location will automatically appear in your Map View

## 🤝 Contributing

Contributions are welcome! If there's interest, I can add the option to change the formatting for other uses. However, this will not be implemented until there are requests for the feature.
