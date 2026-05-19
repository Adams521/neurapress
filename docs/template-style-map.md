# NeuraPress Template And Style Map

## AI Context

- Responsibility: explain how templates are defined, customized, imported, exported, and applied.
- Template model: in-code preset plus localStorage custom template.
- Final output = renderer HTML + template options + user overrides + transform wrapper.

## 正文

## 1. 模板对象长什么样

NeuraPress 当前微信公众号模板定义在：

- `src/config/wechat-templates.ts`

每个模板大致包含：

- `id`
- `name`
- `description`
- `styles`
- `options`
- `transform`

其中最重要的是 `options` 和 `transform`。

## 2. `options` 管什么

`options` 是渲染层配置，主要分三块：

### 2.1 `base`

控制全局基础风格，例如：

- `themeColor`
- `fontFamily`
- `textAlign`
- `lineHeight`
- `fontSize`

### 2.2 `block`

控制块级元素，例如：

- `h1`
- `h2`
- `h3`
- `p`
- `blockquote`
- `code_pre`
- `image`
- `ol`
- `ul`
- `table`

### 2.3 `inline`

控制行内元素，例如：

- `listitem`
- `codespan`
- `em`
- `link`
- `strong`

## 3. `transform` 管什么

`transform(html)` 是模板最后一步。

它常见的作用是：

- 给最终内容包一个外层 `<section>`
- 设置整体背景色
- 设置内容区域边距
- 设定公众号粘贴时的外部容器观感

换句话说：

- `options` 决定元素怎么画
- `transform` 决定整页怎么装

## 4. 模板是怎么生效的

运行时顺序是：

1. 用户选中模板
2. `usePreviewContent` 找到模板对象
3. 合并模板 `options` 和用户 `styleOptions`
4. `MarkdownRenderer` 按 merged options 输出 HTML
5. 模板 `transform` 包装 HTML

所以模板本身不会直接接管 markdown 输入，而是接管“渲染规则”和“最终包装规则”。

## 5. 内置模板 vs 自定义模板

### 内置模板

来源：

- `src/config/wechat-templates.ts`

特点：

- 跟随代码版本管理
- 适合沉淀稳定风格

### 自定义模板

来源：

- `TemplateManager`
- 保存在浏览器 `localStorage`

特点：

- 无需改代码
- 适合个人实验
- 适合导入导出 JSON

## 6. `TemplateManager` 做了什么

位置：

- `src/components/template/TemplateManager.tsx`

它提供的能力包括：

- 查看所有模板
- 收藏模板
- 创建自定义模板
- 导出自定义模板
- 导入模板 JSON

注意点：

- 导入后的模板不会还原任意 JS 函数
- 代码里会给导入模板补一个通用 `transform`

这意味着导入/导出的模板更像“样式配置交换格式”，不是完整的执行逻辑快照。

## 7. 用户样式覆盖如何影响模板

`styleOptions` 会在运行时覆盖模板配置。  
因此你可以把它理解为：

- 模板负责给默认栏目风格
- 用户覆盖负责做一次性的微调

适合这样用：

- 模板保留栏目主色
- 用户临时调字号、间距、标题风格

## 8. 如果要做 AI Agent / AI 时事栏目模板，建议怎么拆

我建议按栏目结构拆，而不是只按颜色拆。

### AI Agent 类模板更适合强调

- 结构化标题层级
- 流程图 / Mermaid 友好
- 对比表格
- 结论卡片
- “适用场景/限制/成本”模块

### AI 时事类模板更适合强调

- 快讯摘要
- 时间线
- “发生了什么 / 为什么重要 / 接下来会怎样”
- 多条新闻的 digest 列表

### 这次已经新增的 3 套模板

- `Agent 深度拆解`
  - 适合架构流程、限制分析、成本对比、Mermaid 图和表格较多的文章
- `AI 时事周报`
  - 适合日报、周报、重点更新列表、主线摘要
- `开源项目介绍`
  - 适合项目亮点、安装方式、适用场景、生态概览

## 9. 什么时候该做模板，什么时候该做 renderer 扩展

### 适合做模板

- 主色不同
- 标题视觉不同
- 根容器样式不同
- 某类栏目需要固定布局包装

### 适合做 renderer 扩展

- 某类 markdown 元素渲染错了
- 表格、公式、Mermaid 的结构要变
- 列表、引用、代码块的 HTML 结构要变

## 10. 给后续维护的建议

如果你要把共享 prompt 库里的栏目方案接进 NeuraPress，建议配套增加两类模板：

1. `AI Agent 深度拆解`
2. `AI 时事快报 / 周报`

这样上游生成内容时，就能直接按栏目结构落到最合适的视觉模板里。
