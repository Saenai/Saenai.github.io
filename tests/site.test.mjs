import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve('dist');
const htmlFiles = (await readdir(root, { recursive: true })).filter(file => file.endsWith('.html'));

test('all public routes are built with page metadata and one main heading', async () => {
  for (const route of ['404.html', 'about/index.html', 'index.html', 'notes/index.html', 'projects/index.html']) {
    assert.ok(htmlFiles.some(file => file.replaceAll('\\', '/') === route), `missing route: ${route}`);
  }
  for (const file of htmlFiles) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${file}: one h1`);
    assert.match(html, /<html lang="zh-CN"/, file);
    assert.match(html, /<meta name="description" content="[^"]+"/, file);
    assert.match(html, /<link rel="canonical" href="https:\/\/saenai\.github\.io\//, file);
    assert.match(html, /id="main"/, file);
  }
});

test('every local link, image, script and stylesheet resolves in the static output', async () => {
  for (const file of htmlFiles) {
    const html = await readFile(path.join(root, file), 'utf8');
    for (const [, href] of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
      if (/^(?:https?:|data:|mailto:)/.test(href)) continue;
      const url = new URL(href, `https://saenai.github.io/${file.replaceAll('\\', '/')}`);
      const target = path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
      assert.ok((await stat(target)).isFile(), `${file}: missing ${href}`);
      if (url.hash) {
        const targetHtml = await readFile(target, 'utf8');
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing anchor ${href}`);
      }
    }
  }
});

test('search engines receive the sitemap and the missing page is not indexed', async () => {
  const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
  assert.ok(sitemap.includes('https://saenai.github.io/notes/'));
  assert.ok(!sitemap.includes('/404'));
  assert.match(await readFile(path.join(root, '404.html'), 'utf8'), /name="robots" content="noindex"/);
  assert.match(await readFile(path.join(root, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/saenai.github.io\/sitemap-index.xml/);
});
