const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

const uploadToCDN = true;

const rootDir = __dirname;                        
const parentDir = path.resolve(__dirname, '..');   

const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const [major, minor, patch] = pkg.version.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`Nueva versión: ${newVersion}`);

console.log('Compilando librería con vite...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

const distPath = path.join(rootDir, 'dist', 'PocLib.js');
const versionedFileName = `PocLibv${newVersion}.js`;

if (!fs.existsSync(distPath)) {
  console.error('Build falló: dist/PocLib.js no encontrado.');
  process.exit(1);
}

const dirs = fs.readdirSync(parentDir).filter((name) => {
  const fullPath = path.join(parentDir, name);
  return fs.statSync(fullPath).isDirectory() && name.startsWith('mf-');
});

dirs.forEach((dirName) => {
  const libsDir = path.join(parentDir, dirName, 'libs');

  if (!fs.existsSync(libsDir)) {
    console.warn(`⚠️ Carpeta libs no existe en ${dirName}, se omite.`);
    return;
  }

  const destPathBase = path.join(libsDir, 'PocLib.js');
  const destPathVersioned = path.join(libsDir, versionedFileName);

  fs.copyFileSync(distPath, destPathBase);
  fs.copyFileSync(distPath, destPathVersioned);

  console.log(`Copiado a ${dirName}/libs/ [${versionedFileName}]`);
});

if (uploadToCDN) {
  try {
    const renamedDistPath = path.join(rootDir, 'dist', versionedFileName);
    fs.renameSync(distPath, renamedDistPath);

    execSync(`git add dist/${versionedFileName}`, { stdio: 'inherit' });
    execSync(`git commit -m "Versión ${newVersion}"`, { stdio: 'inherit' });

    execSync(`git push`, { stdio: 'inherit' });

    console.log(`Versión ${newVersion} enviada a Git con éxito.`);
  } catch (err) {
    console.error('Error durante el push a Git:', err.message);
  }
}
