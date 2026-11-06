---
title: Prompt Batch Generator
description: 将模型、输入与重复次数组合成可追踪的批量任务，让 Prompt 实验更有条理。
category: AI 工具
tags: [Python, Tkinter, LLM]
repository: https://github.com/Saenai/prompt-batch-tool
visual: batch
order: 1
featured: true
---

## 让重复实验有一个清楚的起点

Prompt Batch Generator 是一个面向 OpenAI-compatible Chat Completions 接口的本地批量生成工具。它将任务组织成「模型 × 输入 × 重复次数」，通过 profile 描述提示词、运行模式、校验与输出命名。

## 可以做什么

- 通过 GUI 或命令行运行，组合文件输入与直接输入。
- 按模型连续处理输入，减少本地模型反复切换。
- 分别保存原始响应、交付结果、报告与任务清单。
- 断点续跑，并单独重试失败项。

## 实现方式

核心使用 Python 标准库，图形界面使用 Tkinter。运行配置和任务 profile 分离，便于给不同实验复用同一套执行流程。仓库也提供 Windows 便携版的构建与发布流程。

安装、配置与具体用法见 [项目文档](https://github.com/Saenai/prompt-batch-tool#readme)。
