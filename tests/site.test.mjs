import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve('dist');
const htmlFiles = (await readdir(root, { recursive: true })).filter(file => file.endsWith('.html'));
const locales = [
  { prefix: '', lang: 'zh-CN', og: 'zh_CN' },
  { prefix: 'en/', lang: 'en', og: 'en_US' },
  { prefix: 'ja/', lang: 'ja', og: 'ja_JP' },
  { prefix: 'zh-tw/', lang: 'zh-TW', og: 'zh_TW' },
];

test('all public routes are built with page metadata and one main heading', async () => {
  for (const { prefix } of locales) {
    for (const route of ['about/index.html', 'index.html', 'notes/index.html', 'projects/index.html', 'projects/prompt-batch-tool/index.html', 'projects/microsoft-todo-safe-mcp/index.html', 'projects/japanese-analyzer/index.html', 'notes/hello-world/index.html']) {
      assert.ok(htmlFiles.some(file => file.replaceAll('\\', '/') === `${prefix}${route}`), `missing route: ${prefix}${route}`);
    }
  }
  for (const file of htmlFiles) {
    const html = await readFile(path.join(root, file), 'utf8');
    const route = file.replaceAll('\\', '/');
    const locale = locales.find(({ prefix }) => prefix && route.startsWith(prefix)) ?? locales[0];
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${file}: one h1`);
    assert.ok(html.includes(`<html lang="${locale.lang}"`), `${file}: page language`);
    assert.ok(html.includes(`<meta property="og:locale" content="${locale.og}"`), `${file}: sharing locale`);
    assert.match(html, /<meta name="description" content="[^"]+"/, file);
    assert.match(html, /<link rel="canonical" href="https:\/\/saenai\.github\.io\//, file);
    assert.match(html, /id="main"/, file);
  }
});

test('language switches and search alternates preserve the current page in every language', async () => {
  for (const file of htmlFiles) {
    const html = await readFile(path.join(root, file), 'utf8');
    const route = file.replaceAll('\\', '/');
    const locale = locales.find(({ prefix }) => prefix && route.startsWith(prefix)) ?? locales[0];
    const page = route.slice(locale.prefix.length).replace(/index\.html$/, '');
    const notFound = /404(?:\.html|\/)$/.test(page);
    const switcher = html.match(/<nav class="language-switcher"[^>]*>(.*?)<\/nav>/s)[1];
    assert.equal([...switcher.matchAll(/aria-current="true"/g)].length, 1, `${file}: one selected language`);
    for (const target of locales) {
      const targetPath = notFound ? (target.prefix ? `/${target.prefix}404/` : '/404.html') : `/${target.prefix}${page}`;
      assert.ok(switcher.includes(`href="${targetPath}" lang="${target.lang}" hreflang="${target.lang}"`), `${file}: switch to ${target.lang}`);
      const targetHtml = await readFile(path.join(root, targetPath, targetPath.endsWith('/') ? 'index.html' : ''), 'utf8');
      assert.ok(targetHtml.includes(`<html lang="${target.lang}"`), `${file}: target language ${target.lang}`);
      if (!notFound) {
        assert.ok(html.includes(`rel="alternate" hreflang="${target.lang}" href="https://saenai.github.io${targetPath}"`), `${file}: search alternate ${target.lang}`);
      }
    }
    const nav = html.match(/<nav class="site-nav"[^>]*>(.*?)<\/nav>/s)[1];
    for (const [, href] of nav.matchAll(/href="([^"]+)"/g)) {
      assert.ok(href.startsWith(`/${locale.prefix}`), `${file}: navigation keeps language`);
    }
  }
});

test('translated archives and article bodies contain their own language', async () => {
  for (const [prefix, projectCount, noteCount, projectHeading, noteHeading] of [
    ['', '3 个项目', '1 篇笔记', '让重复实验有一个清楚的起点', '先有一个可以抵达的地方'],
    ['en/', 'Projects: 3', 'Notes: 1', 'A clear starting point for repeated experiments', 'First, a place you can reach'],
    ['ja/', '3 件のプロジェクト', '1 件のノート', '繰り返す実験に、明確な出発点を', 'まずは、たどり着ける場所を'],
    ['zh-tw/', '3 個專案', '1 篇筆記', '讓重複實驗有一個清楚的起點', '先有一個可以抵達的地方'],
  ]) {
    const projects = await readFile(path.join(root, prefix, 'projects/index.html'), 'utf8');
    assert.ok(projects.includes(projectCount), `${prefix}: translated project count`);
    assert.equal([...projects.matchAll(/class="project-card"/g)].length, 3, `${prefix}: no duplicate translations`);
    const notes = await readFile(path.join(root, prefix, 'notes/index.html'), 'utf8');
    assert.ok(notes.includes(noteCount), `${prefix}: translated note count`);
    assert.equal([...notes.matchAll(/class="note-row"/g)].length, 1, `${prefix}: no duplicate notes`);
    assert.ok((await readFile(path.join(root, prefix, 'projects/prompt-batch-tool/index.html'), 'utf8')).includes(projectHeading), `${prefix}: translated project body`);
    assert.ok((await readFile(path.join(root, prefix, 'notes/hello-world/index.html'), 'utf8')).includes(noteHeading), `${prefix}: translated article body`);
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
  for (const { prefix } of locales) {
    assert.ok(sitemap.includes(`https://saenai.github.io/${prefix}notes/`));
    const notFound = path.join(root, prefix, prefix ? '404/index.html' : '404.html');
    assert.match(await readFile(notFound, 'utf8'), /name="robots" content="noindex"/);
  }
  assert.ok(!sitemap.includes('/404'));
  assert.match(await readFile(path.join(root, '404.html'), 'utf8'), /name="robots" content="noindex"/);
  assert.match(await readFile(path.join(root, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/saenai.github.io\/sitemap-index.xml/);
});
