---
locale: en
title: Prompt Batch Generator
description: Combine models, inputs, and repeat counts into traceable batch jobs for more organized prompt experiments.
category: AI tools
tags: [Python, Tkinter, LLM]
repository: https://github.com/Saenai/prompt-batch-tool
visual: batch
order: 1
featured: true
---

## A clear starting point for repeated experiments

Prompt Batch Generator is a local batch generation tool for OpenAI-compatible Chat Completions APIs. It organizes jobs as “model × input × repeat count,” with profiles defining prompts, run modes, validation, and output naming.

## What it does

- Run through a GUI or command line, combining file inputs with directly entered text.
- Process inputs consecutively for each model to reduce repeated switching between local models.
- Save raw responses, deliverables, reports, and job manifests separately.
- Resume interrupted jobs and retry failed items individually.

## How it is built

The core uses the Python standard library, and the GUI uses Tkinter. Runtime configuration is separate from task profiles, making it easier to reuse the same execution workflow across experiments. The repository also includes a build and release workflow for a portable Windows edition.

See the [project documentation](https://github.com/Saenai/prompt-batch-tool#readme) for installation, configuration, and usage.
