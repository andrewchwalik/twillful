import { build, transform } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const output = path.join(root, 'assets/build');
const js = await build({
  entryPoints: ['src/main.jsx'], bundle: true, write: false, minify: true,
  format: 'esm', platform: 'browser', target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'eof'
});
const css = await postcss([tailwindcss('./tailwind.config.cjs'), autoprefixer]).process(
  await readFile('src/styles.css', 'utf8'), { from: 'src/styles.css' }
);
const minifiedCss = await transform(css.css, { loader: 'css', minify: true, target: ['es2020'] });
const files = [];
await mkdir(output, { recursive: true });
for (const [extension, contents] of [['js', js.outputFiles[0].text], ['css', minifiedCss.code]]) {
  const hash = createHash('sha256').update(contents).digest('hex').slice(0, 12);
  const name = `app-${hash}.${extension}`;
  await writeFile(path.join(output, name), contents);
  files.push(name);
}
const template = await readFile('src/index.html', 'utf8');
await writeFile('index.html', template
  .replace('<!-- BUILD_CSS -->', `<link rel="stylesheet" href="/assets/build/${files[1]}" />`)
  .replace('<!-- BUILD_JS -->', `<script type="module" src="/assets/build/${files[0]}"></script>`));
// Only remove obsolete files owned by this build; preserve all other site assets.
for (const file of await readdir(output)) {
  if (/^app-[a-f0-9]{12}\.(js|css)$/.test(file) && !files.includes(file)) await unlink(path.join(output, file));
}
console.log(`Built ${files.join(', ')} for the existing GitHub Pages root.`);
