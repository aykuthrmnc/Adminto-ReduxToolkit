const fs = require('fs');
const path = require('path');

// Değişiklik yapılacak olan dosya uzantıları
const fileExtensions = ['.ts', '.tsx'];

// Analiz edilecek olan dizinler
const sourceDirectories = ['src'];

// Yeni başlangıç karakteri
const newStartChar = '~/';

// Paket isimleri
const packageNames = Object.keys(require('./package.json').dependencies);

// Dizinlerdeki tüm dosyaları listeleme
function getFiles(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
}

// Başlangıç karakterini güncelleme
function replaceStartChar(content) {
    const regex = /export\s+(.*)\s+from\s+['|"]([^'|"]*)['|"]|import\s+(.*)\s+from\s+['|"]([^'|"]*)['|"]/g;
    return content.replace(regex, function (match, p1, p2, p3, p4) {
        let importPath;

        if (p1 !== undefined && p2 !== undefined) {
            importPath = p2;
        } else {
            importPath = p4;
        }

        // Paket ismi veya paketin alt dizini ise dokunma
        const isPackageOrSubPackage = packageNames.some((packageName) => {
            return (
                importPath.startsWith(packageName) &&
                (importPath[packageName.length] === '/' || importPath[packageName.length] === undefined)
            );
        });

        if (isPackageOrSubPackage) {
            return match;
        }

        // Başına `~/` ekle
        if (importPath.startsWith('.') === false) {
            return match.replace(importPath, `${newStartChar}${importPath}`);
        }

        return match;
    });
}

// Tüm dosyaları gezerek işlem yapma
function processFiles(files) {
    files.forEach((file) => {
        const ext = path.extname(file);

        // Uzantısı `.js` veya `.jsx` ise işlem yap
        if (fileExtensions.includes(ext)) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    const newContent = replaceStartChar(data);
                    if (data !== newContent) {
                        console.log(`Updated file: ${file}`);
                        fs.writeFile(file, newContent, (err) => {
                            if (err) throw err;
                        });
                    }
                }
            });
        }
    });
}

// Tüm dizinlerdeki dosyaları bul
let files = [];
sourceDirectories.forEach((dir) => {
    files = [...files, ...getFiles(dir)];
});

// İşlem yap
processFiles(files);
