const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Clean and recreate dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Items to copy into dist for production deployment
const itemsToCopy = [
  'index.html',
  'profile.jpg',
  'css',
  'js',
  'assets'
];

for (const item of itemsToCopy) {
  const src = path.join(__dirname, item);
  const dest = path.join(distDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied ${item} to dist/`);
  } else {
    console.warn(`Warning: ${item} not found at ${src}`);
  }
}

console.log('Build completed successfully.');
