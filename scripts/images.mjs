import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile, unlink } from 'node:fs/promises';

// Originals remain editable. Fingerprinted derivatives are the only images shipped to visitors.
export async function optimizeImages() {
  const output = 'assets/optimized';
  await mkdir(output, { recursive: true });
  const manifest = {};
  const generated = new Set();
  let before = 0;
  let after = 0;
  for (const folder of ['client-cards', 'client-logos']) {
    for (const file of (await readdir(`assets/${folder}`)).sort()) {
      if (!/\.(jpg|png|svg)$/i.test(file) || ['the-wash-company.jpg', 'firelands-united.jpg'].includes(file)) continue;
      const source = `assets/${folder}/${file}`;
      const original = await readFile(source);
      before += original.length;
      const widths = folder === 'client-cards' ? [160, 384] : [120];
      const versions = [];
      for (const width of widths) {
        const bytes = await sharp(original).rotate().resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: folder === 'client-cards' ? 76 : 88, effort: 6 }).toBuffer();
        const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
        const name = `${file.replace(/\.[^.]+$/, '')}-${width}-${hash}.webp`;
        await writeFile(`${output}/${name}`, bytes);
        generated.add(name);
        versions.push({ width, src: `/${output}/${name}` });
        after += bytes.length;
      }
      manifest[source] = versions;
    }
  }
  for (const file of await readdir(output)) {
    if (/-\d+-[a-f0-9]{10}\.webp$/.test(file) && !generated.has(file)) await unlink(`${output}/${file}`);
  }
  await writeFile('src/images.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Images: ${Math.round(before / 1024)} KB originals -> ${Math.round(after / 1024)} KB optimized (all sizes combined).`);
  return manifest;
}
