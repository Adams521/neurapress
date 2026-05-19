# NeuraPress Architecture Context

## AI Context

- Responsibility: turn Markdown into WeChat-friendly HTML with live preview, style presets, and copy-ready output.
- Primary entrypoints: `src/app/wechat/page.tsx`, `src/components/editor/WechatEditor.tsx`.
- Core render chain: editor state -> `usePreviewContent` -> `convertToWechat` -> `MarkdownParser` / `MarkdownRenderer` -> template transform -> preview / copy.
- Template source: in-code template registry at `src/config/wechat-templates.ts`, plus user-defined templates in localStorage.
- Non-goal: this project does not generate article ideas or content by itself.
- Extension points: new templates, renderer rules, copy behaviors, preview widgets, and upstream AI-generation bridges.

## 正文

## 1. 这个项目真正做什么

`NeuraPress` 的核心职责不是“帮你决定写什么”，而是“把你已经写好的 Markdown 变成更适合微信公众号粘贴发布的 HTML”。

它更接近：

- 排版编辑器
- Markdown 到微信 HTML 的渲染器
- 模板与样式管理器
- 预览与复制工具

所以如果说 `AIWriteX` 偏“内容生产编排”，那么 `NeuraPress` 偏“内容呈现与交付”。

## 2. 架构边界

### 负责的事

- 编辑 Markdown
- 合并模板样式
- 自定义渲染标题、列表、代码块、图片、链接
- 支持 Mermaid / LaTeX
- 预览最终 HTML
- 把结果复制到公众号编辑器

### 不负责的事

- 热点抓取
- 搜索增强
- 多 agent 编排
- 自动写稿
- 自动发布到公众号后台

这点很关键，因为它决定了后面你要把“AI 写作能力”放在哪里：  
更合理的做法是上游生成内容，下游用 NeuraPress 精修样式。

## 3. 目录地图

- 页面入口：
  - `src/app/wechat/page.tsx`
- 主编辑器：
  - `src/components/editor/WechatEditor.tsx`
- 预览计算：
  - `src/components/editor/hooks/usePreviewContent.ts`
- Markdown 转换：
  - `src/lib/markdown/index.ts`
  - `src/lib/markdown/parser.ts`
  - `src/lib/markdown/renderer.ts`
- 模板系统：
  - `src/config/wechat-templates.ts`
  - `src/components/template/TemplateManager.tsx`
- 复制逻辑：
  - `src/components/editor/hooks/useCopy.ts`
- Mermaid：
  - `src/lib/markdown/mermaid-utils.ts`
  - `src/lib/markdown/mermaid-init.ts`

## 4. 主执行链

在微信公众号编辑器场景里，主链路大致是：

1. 用户在 `WechatEditor` 输入 Markdown
2. 编辑器状态变化后，`usePreviewContent` 重新计算预览
3. 选中的模板样式与用户样式覆盖被合并
4. `convertToWechat()` 调用 `MarkdownParser`
5. `MarkdownRenderer` 把 Markdown token 渲染成 HTML
6. 模板的 `transform` 再包一层外部结构
7. 结果写入预览区
8. 用户点击复制，把 `.preview-content` 复制到剪贴板

这条链说明：NeuraPress 的真正核心不在页面布局，而在“样式合并 + 自定义渲染 + transform 包装”。

## 5. 模板在系统里的地位

NeuraPress 的模板不是完整 HTML 文件库，而是内存中的模板配置对象：

- `id`
- `name`
- `description`
- `styles`
- `options`
- `transform`

这和 AIWriteX 很不一样：

- `AIWriteX` 模板是磁盘上的 HTML 成品
- `NeuraPress` 模板是渲染选项和包装逻辑

所以两个项目的模板系统虽然都叫“模板”，但抽象层级完全不同。

## 5.1 内置示例与模板绑定

最新实现里，`ArticleList` 顶部增加了“内置示例”分组，示例内容来自：

- `src/lib/utils/loadExampleContent.ts`

每个内置示例都带有目标模板 ID（例如 `agent-deep-dive`、`ai-weekly-brief`、`oss-showcase`）。  
用户点击示例后，会通过 `onSelect(article)` 一次性载入：

- 示例 Markdown 内容
- 对应模板 ID

这让“示例内容”和“模板样式”形成了可直接复用的组合，而不是手动先选文章再选模板。

## 6. 渲染层的职责

`MarkdownRenderer` 会接管很多标准 markdown 元素的输出：

- 标题
- 段落
- 引用
- 代码块
- 行内代码
- 加粗/斜体
- 图片
- 链接
- 列表与嵌套列表
- 删除线
- LaTeX
- Mermaid

这意味着：

- 视觉控制不只是 CSS
- 很多结构其实是在 renderer 里硬编码出来的

如果某种元素显示不对，先排查 `renderer.ts`，再看模板 CSS。

## 7. 本地存储与用户态扩展

`NeuraPress` 不依赖后端数据库去保存模板配置，很多用户态状态直接放在浏览器本地：

- 当前编辑内容
- 自定义模板
- 收藏模板
- 代码主题

这使它非常轻量，但也意味着：

- 跨设备同步不是天然能力
- 模板扩展更适合“导入/导出 JSON”

## 8. AI 集成的最佳位置

如果你想把外部 AI 工作流和 NeuraPress 结合，有 3 个合理接点：

### 接点 A：上游生成 Markdown

最自然。  
AI 负责产出 Markdown 初稿，NeuraPress 负责排版。

### 接点 B：上游生成结构化文章大纲

你把大纲放进编辑器，手工或半自动补正文，再由 NeuraPress 输出。

### 接点 C：扩展模板库

把 AI Agent / AI 时事等栏目常用视觉结构做成模板，减少重复配置。

## 9. 维护时最值得记住的事

1. NeuraPress 是“渲染与排版系统”，不是“写作引擎”。
2. 真正的视觉结果由三部分共同决定：
   - 模板 `options`
   - 用户覆盖 `styleOptions`
   - `MarkdownRenderer` 的结构输出
3. `transform` 是最后一道包装钩子，影响很大。
4. 如果要和 AIWriteX 协同，最好让 AIWriteX 输出 Markdown，再由 NeuraPress 处理最终视觉。
