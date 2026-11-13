---
locale: ja
title: Prompt Batch Generator
description: モデル・入力・繰り返し回数を追跡可能なバッチ処理にまとめ、プロンプトの実験を整理するツール。
category: AI ツール
tags: [Python, Tkinter, LLM]
repository: https://github.com/Saenai/prompt-batch-tool
visual: batch
order: 1
featured: true
---

## 繰り返す実験に、明確な出発点を

Prompt Batch Generator は、OpenAI 互換の Chat Completions API 向けのローカル一括生成ツールです。「モデル × 入力 × 繰り返し回数」でタスクを構成し、プロファイルでプロンプト、実行モード、検証、出力ファイル名を定義します。

## できること

- GUI またはコマンドラインから実行し、ファイル入力と直接入力を組み合わせる。
- モデルごとに入力を連続処理し、ローカルモデルの切り替えを減らす。
- 生のレスポンス、成果物、レポート、タスク一覧を分けて保存する。
- 中断した処理を再開し、失敗した項目だけを再試行する。

## 実装について

中核には Python 標準ライブラリ、GUI には Tkinter を使用しています。実行設定とタスクのプロファイルを分離し、異なる実験でも同じ処理の流れを再利用しやすくしています。Windows ポータブル版のビルドとリリースの仕組みも公開しています。

インストール、設定、使い方は [プロジェクトのドキュメント](https://github.com/Saenai/prompt-batch-tool#readme) をご覧ください。
