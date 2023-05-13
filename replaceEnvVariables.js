const fs = require('fs');
const path = require('path');

// Değişiklik yapılacak olan dosya uzantıları
const fileExtensions = ['.ts', '.tsx'];

// Analiz edilecek olan dizinler
const sourceDirectories = ['src'];

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

// process.env.REACT_APP_ değerlerini import.meta.env.VITE_ değerine döndüren fonksiyon
function replaceEnvVariables(content) {
    const regex = /process\.env\.REACT_APP_([a-zA-Z_]+)/g;
    return content.replace(regex, 'import.meta.env.VITE_$1');
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
                    const newContent = replaceEnvVariables(data);
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
