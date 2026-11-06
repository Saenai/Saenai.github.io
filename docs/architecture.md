# 初版架构

## 定位与信息架构

优先提供个人名片，再延伸到技术博客与个人工作室。首页先介绍 Saenai，GitHub 是当前唯一的对外联系入口。项目只选用公开仓库，不公开私人资料或未公开项目。

| 路由 | 用途 | 内容来源 |
| --- | --- | --- |
| `/` | 名片、精选项目、最新笔记、联系入口 | 站点配置 + 内容集合 |
| `/about/` | 简介、探索方向、GitHub 链接 | `src/pages/about.astro` |
| `/projects/` | 项目档案、类别筛选 | projects 集合 |
| `/projects/{id}/` | 项目详情 | 单个项目 Markdown |
| `/notes/` | 技术笔记，按日期倒序 | notes 集合 |
| `/notes/{id}/` | 文章阅读 | 单篇笔记 Markdown |
| `/404.html` | GitHub Pages 自定义未找到页 | 静态页面 |

## 构建路径

```text
src/data/site.ts                  身份、导航与公共链接
src/content/projects/*.md  ─┐
src/content/notes/*.md     ─┴─> content.config.ts 校验
                                      │
src/pages + layouts + components <─────┘
              │
          Astro 静态构建
              │
             dist/ ──> GitHub Actions ──> GitHub Pages
```

Astro 负责静态路由、Markdown、构建和内容类型。Zod 在内容载入边界校验 frontmatter。内部组件使用生成的类型，不重复校验同一份数据。没有服务端运行时、数据库、登录、运行时 GitHub API 或客户端框架。

项目筛选是独立的小段浏览器脚本。禁用 JavaScript 后，筛选按钮隐藏，所有项目仍可浏览。笔记的 `draft: true` 同时从首页、列表页、详情路由及 sitemap 排除；草稿源文件仍属于仓库文件，**公开仓库中不要保存保密内容**。

## 设计系统

- 浅暖纸色 `#f5f3ed`、墨色 `#272a24`、朱红点缀 `#e7593c`，文本链接使用更深的 `#ba3e28`。
- 系统字体优先，不从第三方字体服务加载资源。大字号姓名建立视觉身份，等宽小字区分导航性信息。
- 原创 SVG/CSS 几何图形用于身份与项目封面，不依赖图库或生成图片。
- 共用容器、按钮、分隔线、内容排版；项目和笔记分别使用适合其内容的列表形式。
- 700px 以下改为单列；保留键盘焦点、跳转正文链接、页面语言、当前导航状态与减少动画偏好。

## 内容维护

1. 更改名字、公共链接、导航：`src/data/site.ts`。
2. 更改个人介绍与首页文案：`src/pages/about.astro`、`src/pages/index.astro`。
3. 新增项目：在 `src/content/projects/` 添加 Markdown，参考现有字段。`order` 控制顺序，`featured` 控制首页推荐。新增类别或封面类型时同步扩展 `content.config.ts` 和 `ProjectArt.astro`。
4. 新增文章：在 `src/content/notes/` 添加 Markdown，包含 `title`、`description`、`date`、`category`，可设置 `draft: true`。
5. Markdown 文件名就是 URL 的最后一段；发表后改名会改变链接。

## 初版内容边界

项目摘要依据以下公开 README 整理，不表示另行验证了上游项目的运行能力：

- <https://github.com/Saenai/prompt-batch-tool#readme>
- <https://github.com/Saenai/microsoft-todo-safe-mcp#readme>
- <https://github.com/Saenai/japanese-analyzer#readme>

`hello-world.md` 是本次初版的建站记录；没有杜撰其他历史文章。个人介绍为中性初稿，尚未加入头像、职业履历、邮箱或其他社交账号。需要时在现有信息架构中补充。

## 验证与发布

`npm run check` 验证 Astro/TypeScript 与内容类型；`npm run build` 生成静态页面；`npm test` 检查核心路由以及全部生成页面的元数据、内部链接、资源与 sitemap。新增内容自动纳入产物检查。

PR 运行构建检查。默认分支 `master` 检查成功后，上传 `dist` 并部署到 GitHub Pages。首次发布需要在仓库 Settings → Pages → Build and deployment 中把 Source 设为 **GitHub Actions**。配置依据 [Astro GitHub Pages 文档](https://docs.astro.build/en/guides/deploy/github/)，内容集合依据 [Astro 内容集合文档](https://docs.astro.build/en/guides/content-collections/)。

当前按用户站点根路径部署，地址为 `https://saenai.github.io/`。若之后使用其他仓库的子路径部署，需要调整站点基址与根路径链接。自定义域名则需同时更新 `astro.config.mjs`、`robots.txt` 和仓库域名配置。
