// Rend video/messor-bdaas.html image par image et encode la vidéo MP4 (H.264, 1080p, 30 i/s).
// Usage : node video/render.mjs [fichier-de-sortie.mp4] [i/s]
// Nécessite Chromium (Playwright) et ffmpeg avec libx264.
// Musique : video/music.wav (générée par `python3 video/music.py`) est ajoutée si elle existe.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.argv[2] || resolve(here, 'messor-business-developer-as-a-service.mp4'));
const FPS = Number(process.argv[3] || 30);
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const music = resolve(here, 'music.wav');
const audio = existsSync(music) ? ['-i', music, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest'] : [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(resolve(here, 'messor-bdaas.html')).href + '#render', { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const duration = await page.evaluate(() => window.DURATION);
const frames = Math.round(duration * FPS);

const ff = spawn(FFMPEG, [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  ...audio,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  out,
], { stdio: ['pipe', 'inherit', 'inherit'] });

for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.render(t), i / FPS);
  const jpg = await page.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(jpg)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % (FPS * 5) === 0) process.stdout.write(`\r${Math.round((i / frames) * 100)} %`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
console.log(`\r100 % — ${frames} images → ${out}`);
