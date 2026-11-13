---
locale: zh-TW
title: Prompt Batch Generator
description: 將模型、輸入與重複次數組合成可追蹤的批次任務，讓 Prompt 實驗更有條理。
category: AI 工具
tags: [Python, Tkinter, LLM]
repository: https://github.com/Saenai/prompt-batch-tool
visual: batch
order: 1
featured: true
---

## 讓重複實驗有一個清楚的起點

Prompt Batch Generator 是一個面向 OpenAI 相容 Chat Completions API 的本機批次生成工具。它將任務組織成「模型 × 輸入 × 重複次數」，透過 profile 描述提示詞、執行模式、驗證與輸出命名。

## 可以做什麼

- 透過 GUI 或命令列執行，組合檔案輸入與直接輸入。
- 依模型連續處理輸入，減少本機模型反覆切換。
- 分別儲存原始回應、交付結果、報告與任務清單。
- 從中斷處繼續執行，並單獨重試失敗項目。

## 實作方式

核心使用 Python 標準函式庫，圖形介面使用 Tkinter。執行設定與任務 profile 分離，方便讓不同實驗重複使用同一套執行流程。儲存庫也提供 Windows 可攜版的建置與發布流程。

安裝、設定與具體用法請參閱 [專案文件](https://github.com/Saenai/prompt-batch-tool#readme)。
