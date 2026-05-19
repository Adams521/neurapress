# NeuraPress AI-Focused Templates Design

## Goal

为 `NeuraPress` 新增 3 套直接可用的微信公众号模板，分别服务于：

- AI Agent 深度拆解
- AI 时事周报
- AI 开源项目介绍

## Scope

- 只扩展 `src/config/wechat-templates.ts`
- 保持现有模板注册方式和运行时合并方式不变
- 不修改 renderer、编辑器、模板管理器的架构
- 可选更新现有模板文档，补充新增模板定位

## Chosen Direction

### 1. Agent Deep Dive

- 视觉目标：结构化、冷静、像技术媒体专题
- 内容特征：适合架构拆解、流程说明、成本/限制/场景对比
- 风格要点：深蓝灰主色、卡片式模块、结论/引用块强化

### 2. AI Weekly Brief

- 视觉目标：高密度但清晰，像 newsletter/行业周报
- 内容特征：适合主线摘要、重点事件列表、编号速览
- 风格要点：暖金色强调、时间标签、摘要块、编号列表

### 3. OSS Showcase

- 视觉目标：产品卡片感，偏“项目导览”
- 内容特征：适合亮点、适用场景、安装、生态概览
- 风格要点：绿色开源感、指标卡片、功能亮点区

## Constraints

- 不引入新依赖
- 不增加测试框架
- 模板需兼容当前 `usePreviewContent -> convertToWechat -> transform` 链路
- 复制到微信公众号编辑器时仍保持纯 HTML/内联样式友好
