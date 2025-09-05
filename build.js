const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const zipName = `${packageJson.name}.zip`;

async function createZip() {
	return new Promise((resolve, reject) => {
		const output = fs.createWriteStream(zipName);
		const archive = archiver('zip', { zlib: { level: 9 } });

		output.on('close', () => {
			console.log(`Created ${zipName} (${archive.pointer()} bytes)`);
			resolve(zipName);
		});

		archive.on('error', reject);
		archive.pipe(output);

		// Add files and directories
		archive.file('manifest.json', { name: 'manifest.json' });
		archive.file('CreateAddonCode.md', { name: 'CreateAddonCode.md' });
		archive.directory('script/', 'script/');

		archive.finalize();
	});
}

async function build() {
	try {
		// Minify the main script
		console.log('Minifying script...');
		execSync('terser script/main.js -c -m -o script/minified.js', { stdio: 'inherit' });

		// Read the minified content and prepend 'javascript:'
		console.log('Adding javascript: prefix...');
		const minifiedContent = fs.readFileSync('script/minified.js', 'utf8');
		const bookmarkletContent = 'javascript:' + minifiedContent;
		fs.writeFileSync('script/minified.js', bookmarkletContent);

		// Create zip archive
		console.log('Creating zip archive...');
		await createZip();

		// Stage the files in git
		console.log('Staging changes...');
		execSync('git add script/minified.js *.zip', { stdio: 'inherit' });

		console.log('Build completed successfully!');
	} catch (error) {
		console.error('Build failed:', error.message);
		process.exit(1);
	}
}

build();
