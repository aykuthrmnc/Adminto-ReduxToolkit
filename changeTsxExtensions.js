const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function isJSX(fileContent) {
	const jsxElementRegex = /<[\w\s.:]+\/?>/; // Basit JSX elementlerini kontrol etmek için düzenli ifade
	const reactComponentRegex = /import.*from\s+['"]react(-router-dom|-icomoon)?['"]/; // React, react-router-dom ve react-icomoon içe aktarımını kontrol etmek için düzenli ifade
	const reactElementRegex = /<\w+(\s+\w+(\s*=\s*{[^}]*}|"[^"]*"|'[^']*'))*\s*\/?>/; // Karmaşık JSX elementlerini kontrol etmek için düzenli ifade
	const capitalizedFunctionComponentRegex = /function\s+[A-Z]\w*\s*\(/; // Fonksiyon bileşeni için düzenli ifade
	const capitalizedConstComponentRegex = /const\s+[A-Z]\w*\s*=\s*\(/; // Const bileşeni için düzenli ifade
	return (
		reactComponentRegex.test(fileContent) ||
		jsxElementRegex.test(fileContent) ||
		reactElementRegex.test(fileContent) ||
		capitalizedFunctionComponentRegex.test(fileContent) ||
		capitalizedConstComponentRegex.test(fileContent)
	);
}

function changeExtension(filePath) {
	const newFilePath = filePath.replace(/\.ts$/, '.tsx');
	fs.rename(filePath, newFilePath, (err) => {
		if (err) throw err;
		console.log(`Renamed: ${filePath} -> ${newFilePath}\n`);
	});
}

function processDirectory(directory) {
	fs.readdir(directory, (err, files) => {
		if (err) {
			return console.log('Unable to scan directory:', err);
		}

		files.forEach((file) => {
			const filePath = path.join(directory, file);

			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.log('Error reading file:', err);
					return;
				}

				if (stats.isDirectory()) {
					processDirectory(filePath);
				} else if (stats.isFile() && path.extname(file) === '.ts') {
					fs.readFile(filePath, 'utf8', (err, data) => {
						if (err) {
							console.log('Error reading file:', err);
							return;
						}

						if (isJSX(data)) {
							changeExtension(filePath);
						}
					});
				}
			});
		});
	});
}

processDirectory(directoryPath);