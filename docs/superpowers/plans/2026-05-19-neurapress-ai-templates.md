# NeuraPress AI Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3 new NeuraPress templates tailored for AI Agent deep dives, AI weekly briefs, and AI open-source project introductions.

**Architecture:** Extend the existing in-code template registry in `src/config/wechat-templates.ts` with three new template objects. Keep the current preview/render/transform pipeline unchanged so the new templates work everywhere the existing ones do.

**Tech Stack:** Next.js, TypeScript, marked-based renderer, inline-style template registry

---

### Task 1: Add Template Definitions

**Files:**
- Modify: `src/config/wechat-templates.ts`

- [ ] **Step 1: Add `agent-deep-dive` template object**

Use a blue-gray system-map tone, stronger H2/H3 hierarchy, table-friendly styles, and a transform wrapper with subtle panel background.

- [ ] **Step 2: Add `ai-weekly-brief` template object**

Use warm gold accents, summary-card headings, numbered-news visual hierarchy, and a transform wrapper suitable for digest content.

- [ ] **Step 3: Add `oss-showcase` template object**

Use open-source green accents, product-card-like headings, code/install-friendly blocks, and a transform wrapper for project overviews.

### Task 2: Update Template Documentation

**Files:**
- Modify: `docs/template-style-map.md`

- [ ] **Step 1: Mention the 3 new templates and their ideal content types**

### Task 3: Verify

**Files:**
- Modify: `src/config/wechat-templates.ts`
- Modify: `docs/template-style-map.md`

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/config/wechat-templates.ts docs/template-style-map.md docs/superpowers
git commit -m "feat: add AI-focused wechat templates"
```
