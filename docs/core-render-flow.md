# NeuraPress Core Render Flow

## AI Context

- Responsibility: explain how Markdown becomes final copy-ready HTML.
- Main chain: `WechatEditor` -> `usePreviewContent` -> template merge -> `convertToWechat` -> renderer output -> `template.transform` -> preview -> clipboard.
- Stateful layers: local editor state, localStorage persistence, preview state, selected template, code theme.

## 正文

## 1. 起点：`WechatEditor`

微信公众号场景的主组件是：

- `src/components/editor/WechatEditor.tsx`

它维护的核心状态包括：

- `value`：当前 Markdown 内容
- `selectedTemplate`：当前模板 ID
- `styleOptions`：用户自定义样式覆盖
- `previewSize`
- `codeTheme`
- `isDraft`

你可以把它理解成整条渲染链的状态中心。

### 1.1 新增入口：`ArticleList` 内置示例

现在除了手工输入和本地文章选择，还多了一条入口：

- `src/components/ArticleList.tsx` 的“内置示例”分组

示例源定义在：

- `src/lib/utils/loadExampleContent.ts`

每个示例会携带：

- `content`（Markdown）
- `template`（模板 ID）

点击示例后，`WechatEditor.handleArticleSelect()` 会同时更新：

- `value`
- `selectedTemplate`

所以示例加载不是单纯换文本，而是“内容 + 样式”一起切换。

## 2. 编辑器输入后发生什么

当用户在文本框输入时：

1. `handleInput()` 更新 `value`
2. `useAutoSave` 负责草稿状态与本地保存
3. `usePreviewContent` 会因为依赖变化重新计算预览内容

所以渲染不是手动触发，而是标准 React 状态驱动。

当用户从 `ArticleList` 选择内置示例时，也会走同样的状态驱动链，只是状态源不是键盘输入，而是 `onArticleSelect`。

## 3. `usePreviewContent` 是预览链的核心

位置：

- `src/components/editor/hooks/usePreviewContent.ts`

这个 hook 做了 4 件关键的事。

### 3.1 找到当前模板

从：

- `src/config/wechat-templates.ts`

按 `selectedTemplate` 找到模板对象。

### 3.2 合并渲染配置

它会生成一个 `mergedOptions`，合并顺序大致是：

1. 模板默认 `options`
2. 用户传入的 `styleOptions`
3. 某些块元素上的特殊兜底逻辑
4. 代码主题样式

这意味着用户临时改样式时，不会直接改模板源，而是运行时覆盖。

### 3.3 把 Markdown 转成 HTML

通过：

- `convertToWechat(value, mergedOptions)`

完成真正的格式转换。

### 3.4 运行模板 `transform`

渲染出的 HTML 不是最终结果。  
如果模板存在 `transform`，还会再做一次最终包装。

## 4. `convertToWechat()` 做了什么

位置：

- `src/lib/markdown/index.ts`

它本身很薄，主要做两件事：

1. 合并默认渲染配置和模板配置
2. 创建 `MarkdownParser` 然后调用 `parse()`

所以这里更像一个装配层，而不是复杂逻辑层。

## 5. 真正的结构生成在 `MarkdownRenderer`

位置：

- `src/lib/markdown/renderer.ts`

这里是 NeuraPress 最重要的文件之一。  
它重写了 marked 的多个渲染方法。

### 5.1 标题

`heading()` 会根据 `h1/h2/h3...` 的样式配置输出带内联样式的标题标签。

### 5.2 段落

`paragraph()` 会根据模板/用户样式输出 `<p>`，同时处理内联 token。

### 5.3 引用

`blockquote()` 会强制带主题色边框。

### 5.4 代码块

`code()` 会调用高亮逻辑，再生成带主题样式的 `<pre><code>...`

### 5.5 列表

`list()` 和 `listitem()` 不只是套标签，还会处理：

- 有序 / 无序列表
- 任务列表 checkbox
- 嵌套列表
- 列表项中的 LaTeX

### 5.6 图片与链接

也都被转成了带内联样式的输出，不依赖外部 CSS 才能工作。

## 6. Mermaid 与 LaTeX 怎么进来的

### Mermaid

渲染器里定义了 Mermaid block tokenizer。  
预览更新后，`usePreviewContent` 还会额外调用 Mermaid 初始化逻辑，把图表真正渲染出来。

所以 Mermaid 分两步：

1. Markdown 阶段输出占位 HTML
2. 预览阶段执行图表渲染

### LaTeX

LaTeX 则直接在 renderer 里用 `katex.renderToString()` 处理，分为：

- 行内公式
- 块级公式

## 7. 模板 `transform` 为什么很重要

模板定义里的 `transform(html)` 是最后一道包装钩子。

它能做的事包括：

- 包一个外层 `<section id="nice">`
- 注入背景色、内边距、整体字体
- 控制最终复制到公众号时的根容器样式

这意味着有些视觉差异并不来自标题/段落样式，而来自最外层包装。

## 8. 预览为什么看起来像“所见即所得”

因为预览区不是拿 Markdown 再临时渲染一次纯文本，而是直接把最终 HTML 放进：

- `.preview-content`

再通过：

- `dangerouslySetInnerHTML`

写到 DOM 中。

所以你在预览里看到的，基本就是复制时会拿走的那份结构。

## 9. 复制链路

复制逻辑在：

- `src/components/editor/hooks/useCopy.ts`

`WechatEditor.handleCopy()` 会抓：

- `previewRef.current?.querySelector('.preview-content')`

然后把这个节点内容复制到剪贴板。  
所以如果复制效果和预览不一致，要优先看：

- preview DOM 是否被 Mermaid 二次改写
- copy 时是否拿到了正确节点

## 10. 模板与用户样式，谁优先

运行时优先级可以近似理解为：

1. 默认 options
2. 模板 options
3. 用户 `styleOptions`
4. 部分 hook 中的兜底修正
5. 模板 `transform`

所以：

- 文本块样式主要受 `options` 控制
- 最外层观感主要受 `transform` 控制

## 11. 如果未来接 AI 内容生产，最佳流程是什么

推荐这样接：

1. 上游 AI 输出 Markdown 初稿
2. 丢进 NeuraPress
3. 在 NeuraPress 切模板、微调样式
4. 复制到公众号后台

如果上游就是 `AIWriteX`，最自然的桥接方式是：

- 让 AIWriteX 输出 Markdown
- 再用 NeuraPress 做最终视觉整理

## 12. 快速排查手册

### 预览内容不对

先看：

- `usePreviewContent.ts`
- 当前模板是否选对

### 某个 markdown 元素显示异常

先看：

- `renderer.ts`

### 整体边距、背景、根容器不对

先看：

- 模板 `transform`

### 复制后和预览不一致

先看：

- `useCopy.ts`
- `.preview-content` 结构
