# Saenai — 个人主页

个人名片、公开项目档案与技术笔记。使用 Astro + TypeScript + Markdown 构建，面向 GitHub Pages 静态部署。

## 本地开发

需要 Node.js 24（版本要求见 `package.json`）。

```sh
npm ci
npm run dev
```

打开终端中给出的本地地址。

```sh
npm run check
npm run build
npm test
npm run preview
```

构建产物在 `dist/`。`npm test` 需要先完成构建。

## 内容入口

- `src/data/site.ts`：名字、导航、GitHub 链接。
- `src/content/projects/`：公开项目介绍。
- `src/content/notes/`：Markdown 文章，`draft: true` 不生成公开页面。
- `src/pages/about.astro`：个人简介。
- `src/styles/global.css`：颜色、排版与响应式样式。

详细路由、架构、设计与内容维护说明见 [docs/architecture.md](docs/architecture.md)。

## 首次发布

1. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 将初版 PR 合并到 `master`。
3. 等待 **Check and deploy site** 工作流成功。
4. 访问 <https://saenai.github.io/>。

之后推送到 `master` 会自动检查并部署；PR 只执行检查，不部署。
