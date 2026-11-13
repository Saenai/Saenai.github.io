import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { languages } from './i18n';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(languages).default('zh-CN'),
    description: z.string(),
    category: z.enum(['AI 工具', '工作流', '语言学习', 'AI tools', 'Workflows', 'Language learning', 'AI ツール', 'ワークフロー', '語学学習', '工作流程', '語言學習']),
    tags: z.array(z.string()),
    repository: z.url(),
    visual: z.enum(['batch', 'todo', 'language']),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(languages).default('zh-CN'),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
