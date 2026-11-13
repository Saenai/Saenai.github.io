export const locales = {
  'zh-CN': { label: '简体中文', prefix: '', og: 'zh_CN' },
  en: { label: 'English', prefix: '/en', og: 'en_US' },
  ja: { label: '日本語', prefix: '/ja', og: 'ja_JP' },
  'zh-TW': { label: '繁體中文', prefix: '/zh-tw', og: 'zh_TW' },
};

export type Locale = keyof typeof locales;
export const languages = Object.keys(locales) as Locale[];

export function localizedPath(locale: Locale, path: string) {
  if (path === '/404.html' || path === '/404/') {
    return locale === 'zh-CN' ? '/404.html' : `${locales[locale].prefix}/404/`;
  }
  return `${locales[locale].prefix}${path}`;
}

const zh = {
  title: 'Saenai — 代码、想法与日常探索',
  description: 'Saenai 的个人主页。收集代码、项目，以及探索过程中的技术笔记。',
  nav: ['首页', '项目', '笔记', '关于'],
  skip: '跳到主要内容', homeLabel: 'Saenai 首页', mainNav: '主导航', languageNav: '选择语言',
  footer: '代码、想法与日常探索。', source: '本站源码',
  home: {
    greeting: '你好，我是', tagline: '把想法，慢慢做出来。',
    welcome: '欢迎来到我的个人空间。', description: '这里收集代码、项目，以及探索过程中的笔记。',
    about: '认识一下', github: '在 GitHub 找到我',
    threads: ['代码与工具', '学习与记录', '想法与实验'], explore: '向下探索',
    projects: '一些正在成形的想法', allProjects: '全部项目',
    notes: '在实践中，留下记录', allNotes: '全部笔记',
    hello: '很高兴，在这里遇见你。', connect: '从一个项目、一个问题，或一个新想法开始。', visit: '去 GitHub 看看',
  },
  projects: {
    title: '项目', description: 'Saenai 的公开项目：AI 工具、工作流与语言学习。',
    eyebrow: '项目档案', heading: '从想法，到可用的工具', intro: '把零散的探索整理在这里。每一个项目，都是一次具体的尝试。',
    filter: '按项目类别筛选', all: '全部', count: '{count} 个项目',
    more: '更多代码与实验，收录在', repositories: 'GitHub 仓库',
    back: '← 返回项目', repository: '查看 GitHub 仓库',
    disclaimer: '项目介绍依据公开仓库整理。安装方法与最新进展请以仓库文档为准。',
  },
  notes: {
    title: '笔记', description: '技术、实践与建站记录。Saenai 的公开笔记。',
    eyebrow: '技术与记录', heading: '给思考，留一个落点', intro: '记录做过的事、遇到的问题，以及逐渐清晰的答案。',
    count: '{count} 篇笔记', empty: '还没有公开笔记。新的记录会从这里开始。',
    footnote: '这本笔记刚刚翻开，内容会慢慢生长。', back: '← 返回笔记', all: '← 查看全部笔记',
  },
  about: {
    title: '关于', description: '你好，我是 Saenai。这里是我的个人主页，也是项目与笔记的集合。',
    heading: '你好，我是 Saenai', intro: '一个用来介绍自己、展示作品，也留存思考的地方。',
    space: '这里是我的个人空间。',
    paragraphs: ['你可以在这里找到我的公开项目，以及围绕技术和实践逐步积累的笔记。', '从 AI 工具、工作流到语言学习，这些项目各自回应一个具体的问题。这里把它们串在一起，也为下一次探索留一点空间。'],
    threads: '沿着这些线索，认识我',
    directions: [
      { title: '让工具参与创造', description: '从批量 Prompt 生成开始，探索可复用的 AI 工具。' },
      { title: '把流程理得更清楚', description: '为待办管理建立可预览、可检查的工作流。' },
      { title: '让理解多一种可能', description: '用日语句子解析工具，连接语言与技术。' },
    ],
  },
  notFound: { title: '页面未找到', heading: '这条路，还没有铺好。', description: '页面可能已经移动，或者地址有一点小偏差。', home: '回到首页' },
};

export const messages: Record<Locale, typeof zh> = {
  'zh-CN': zh,
  en: {
    title: 'Saenai — Code, ideas & everyday exploration',
    description: 'Saenai’s personal space. A collection of code, projects, and technical notes from ongoing explorations.',
    nav: ['Home', 'Projects', 'Notes', 'About'],
    skip: 'Skip to main content', homeLabel: 'Saenai home', mainNav: 'Main navigation', languageNav: 'Choose a language',
    footer: 'Code, ideas & everyday exploration.', source: 'Site source',
    home: {
      greeting: 'Hi, I’m', tagline: 'Bringing ideas to life, one step at a time.',
      welcome: 'Welcome to my personal space.', description: 'Here I collect code, projects, and notes along the way.',
      about: 'Get to know me', github: 'Find me on GitHub',
      threads: ['Code & tools', 'Learning & notes', 'Ideas & experiments'], explore: 'Explore below',
      projects: 'Ideas taking shape', allProjects: 'All projects',
      notes: 'Notes from the process', allNotes: 'All notes',
      hello: 'Glad to meet you here.', connect: 'Start with a project, a question, or a new idea.', visit: 'Visit GitHub',
    },
    projects: {
      title: 'Projects', description: 'Public projects by Saenai: AI tools, workflows, and language learning.',
      eyebrow: 'Project archive', heading: 'From ideas to useful tools', intro: 'A place for explorations big and small. Each project is a concrete experiment.',
      filter: 'Filter projects by category', all: 'All', count: 'Projects: {count}',
      more: 'More code and experiments on', repositories: 'GitHub',
      back: '← Back to projects', repository: 'View GitHub repository',
      disclaimer: 'These descriptions are based on the public repositories. See their documentation for installation instructions and the latest updates.',
    },
    notes: {
      title: 'Notes', description: 'Technical notes, hands-on work, and building this site. Public notes by Saenai.',
      eyebrow: 'Learning in practice', heading: 'A place to put thoughts into words', intro: 'Things I’ve tried, problems I’ve met, and answers becoming clearer along the way.',
      count: 'Notes: {count}', empty: 'No public notes yet. New entries will begin here.',
      footnote: 'This notebook has just opened. There is more to come.', back: '← Back to notes', all: '← View all notes',
    },
    about: {
      title: 'About', description: 'Hi, I’m Saenai. This is my personal site, bringing together my projects and notes.',
      heading: 'Hi, I’m Saenai', intro: 'A place to introduce myself, share my work, and keep track of my thoughts.',
      space: 'This is my personal space.',
      paragraphs: ['Here you’ll find my public projects and a growing collection of notes on technology and practice.', 'From AI tools and workflows to language learning, each project addresses a specific question. This site brings them together and leaves room for the next exploration.'],
      threads: 'A few ways to get to know me',
      directions: [
        { title: 'Creating with tools', description: 'Exploring reusable AI tools, starting with batch prompt generation.' },
        { title: 'Making workflows clearer', description: 'Building workflows for task management that can be previewed and checked.' },
        { title: 'Finding new ways to understand', description: 'Connecting language and technology through Japanese sentence analysis.' },
      ],
    },
    notFound: { title: 'Page not found', heading: 'This path isn’t ready yet.', description: 'The page may have moved, or the address may be slightly off.', home: 'Back to home' },
  },
  ja: {
    title: 'Saenai — コード、アイデア、日々の探究',
    description: 'Saenai の個人サイト。コードやプロジェクト、試行錯誤の中で生まれた技術メモをまとめています。',
    nav: ['ホーム', 'プロジェクト', 'ノート', '自己紹介'],
    skip: '本文へスキップ', homeLabel: 'Saenai ホーム', mainNav: 'メインナビゲーション', languageNav: '言語を選択',
    footer: 'コード、アイデア、日々の探究。', source: 'サイトのソースコード',
    home: {
      greeting: 'こんにちは、', tagline: 'アイデアを、少しずつ形に。',
      welcome: '私の個人サイトへようこそ。', description: 'コードやプロジェクト、試行錯誤の記録をまとめています。',
      about: '自己紹介を見る', github: 'GitHub でつながる',
      threads: ['コードとツール', '学びと記録', 'アイデアと実験'], explore: '続きを見る',
      projects: '少しずつ形になるアイデア', allProjects: 'すべてのプロジェクト',
      notes: '実践の中で、記録を残す', allNotes: 'すべてのノート',
      hello: 'ここで出会えて、うれしいです。', connect: 'ひとつのプロジェクト、疑問、新しいアイデアから。', visit: 'GitHub を見る',
    },
    projects: {
      title: 'プロジェクト', description: 'Saenai の公開プロジェクト。AI ツール、ワークフロー、語学学習。',
      eyebrow: 'プロジェクト一覧', heading: 'アイデアから、使えるツールへ', intro: '日々の試行錯誤をここに。ひとつひとつが、具体的な問いへの取り組みです。',
      filter: 'カテゴリーで絞り込む', all: 'すべて', count: '{count} 件のプロジェクト',
      more: 'ほかのコードや実験は', repositories: 'GitHub リポジトリへ',
      back: '← プロジェクト一覧へ', repository: 'GitHub リポジトリを見る',
      disclaimer: '紹介文は公開リポジトリに基づいています。インストール方法や最新情報は、各リポジトリのドキュメントをご確認ください。',
    },
    notes: {
      title: 'ノート', description: '技術、実践、サイト制作の記録。Saenai の公開ノート。',
      eyebrow: '技術と記録', heading: '考えを、言葉にして残す', intro: '試したこと、出会った問題、少しずつ見えてきた答えを記録します。',
      count: '{count} 件のノート', empty: '公開ノートはまだありません。新しい記録はここから始まります。',
      footnote: 'このノートは、まだ開いたばかり。少しずつ書き足していきます。', back: '← ノート一覧へ', all: '← すべてのノートを見る',
    },
    about: {
      title: '自己紹介', description: 'こんにちは、Saenai です。プロジェクトとノートをまとめた個人サイトです。',
      heading: 'こんにちは、Saenai です', intro: '自己紹介や作品の公開、考えを残すための場所です。',
      space: 'ここは、私の個人スペースです。',
      paragraphs: ['公開プロジェクトと、技術や実践を通じて少しずつ積み重ねたノートを紹介しています。', 'AI ツール、ワークフロー、語学学習。それぞれのプロジェクトは、具体的な問いから生まれました。ここでそれらをつなぎ、次の探究のための余白も残しています。'],
      threads: 'こんな取り組みをしています',
      directions: [
        { title: 'ツールと一緒につくる', description: 'プロンプトの一括生成から、再利用できる AI ツールを探ります。' },
        { title: '作業の流れを整える', description: 'タスク管理に、事前確認と検証ができるワークフローを。' },
        { title: '理解への道を広げる', description: '日本語の文解析ツールで、言語と技術をつなぎます。' },
      ],
    },
    notFound: { title: 'ページが見つかりません', heading: 'この道は、まだ整備中です。', description: 'ページが移動したか、アドレスが少し違っているようです。', home: 'ホームへ戻る' },
  },
  'zh-TW': {
    title: 'Saenai — 程式碼、想法與日常探索',
    description: 'Saenai 的個人網站。收集程式碼、專案，以及探索過程中的技術筆記。',
    nav: ['首頁', '專案', '筆記', '關於'],
    skip: '跳至主要內容', homeLabel: 'Saenai 首頁', mainNav: '主導覽', languageNav: '選擇語言',
    footer: '程式碼、想法與日常探索。', source: '本站原始碼',
    home: {
      greeting: '你好，我是', tagline: '把想法，慢慢做出來。',
      welcome: '歡迎來到我的個人空間。', description: '這裡收集程式碼、專案，以及探索過程中的筆記。',
      about: '認識一下', github: '在 GitHub 找到我',
      threads: ['程式碼與工具', '學習與記錄', '想法與實驗'], explore: '向下探索',
      projects: '一些正在成形的想法', allProjects: '所有專案',
      notes: '在實作中，留下記錄', allNotes: '所有筆記',
      hello: '很高興，在這裡遇見你。', connect: '從一個專案、一個問題，或一個新想法開始。', visit: '去 GitHub 看看',
    },
    projects: {
      title: '專案', description: 'Saenai 的公開專案：AI 工具、工作流程與語言學習。',
      eyebrow: '專案一覽', heading: '從想法，到實用的工具', intro: '把零散的探索整理在這裡。每一個專案，都是一次具體的嘗試。',
      filter: '依專案類別篩選', all: '全部', count: '{count} 個專案',
      more: '更多程式碼與實驗，收錄在', repositories: 'GitHub 儲存庫',
      back: '← 返回專案', repository: '查看 GitHub 儲存庫',
      disclaimer: '專案介紹依據公開儲存庫整理。安裝方式與最新進展請以儲存庫文件為準。',
    },
    notes: {
      title: '筆記', description: '技術、實作與網站建置記錄。Saenai 的公開筆記。',
      eyebrow: '技術與記錄', heading: '給思考，留一個落點', intro: '記錄做過的事、遇到的問題，以及逐漸清晰的答案。',
      count: '{count} 篇筆記', empty: '還沒有公開筆記。新的記錄會從這裡開始。',
      footnote: '這本筆記剛剛翻開，內容會慢慢成長。', back: '← 返回筆記', all: '← 查看所有筆記',
    },
    about: {
      title: '關於', description: '你好，我是 Saenai。這裡是我的個人網站，也是專案與筆記的集合。',
      heading: '你好，我是 Saenai', intro: '一個用來介紹自己、展示作品，也留存思考的地方。',
      space: '這裡是我的個人空間。',
      paragraphs: ['你可以在這裡找到我的公開專案，以及圍繞技術和實作逐步累積的筆記。', '從 AI 工具、工作流程到語言學習，這些專案各自回應一個具體的問題。這裡把它們串在一起，也為下一次探索留一點空間。'],
      threads: '沿著這些線索，認識我',
      directions: [
        { title: '讓工具參與創作', description: '從批次 Prompt 生成開始，探索可重複使用的 AI 工具。' },
        { title: '把流程理得更清楚', description: '為待辦管理建立可預覽、可檢查的工作流程。' },
        { title: '讓理解多一種可能', description: '用日語句子解析工具，連結語言與技術。' },
      ],
    },
    notFound: { title: '找不到頁面', heading: '這條路，還沒有鋪好。', description: '頁面可能已經移動，或是網址有一點小偏差。', home: '回到首頁' },
  },
};
