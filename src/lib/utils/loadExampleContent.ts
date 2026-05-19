/**
 * Utility function to load the example.md content
 * This provides a default content for the editor when first opened
 */

export interface BuiltInExample {
  id: string
  title: string
  template: string
  content: string
}

// Import the example.md content directly
const exampleContent = `# NeuraPress 简介
Markdown 转微信公众帐号内容神器，能让\`Markdown\`内容，无需作任何调整就能**一键复制**到微信公众号使用，特别针对代码展示做了优化。


GitHub 地址：

[https://github.com/tianyaxiang/neurapress](https://github.com/tianyaxiang/neurapress)

> 使用微信公众号编辑器有一个十分头疼的问题——粘贴出来的代码，格式错乱，而且特别丑。




### Markdown基本语法
#### 标题
支持6种大小的标题，分别对应\`#\`,\`##\`,\`###\`,\`####\`,\`#####\`,\`######\`，和样式文件中的\`h1,...,h6\`如：
# H1
## H2
#### 行内代码
如：\`AppCompatActivity\`类,markdown对行内代码的语法是前后用：\\\`,其中 \\\` 为windows键盘左上角那个,

#### 强调
**我是强调**
#### 斜体
试试*斜体*
#### 强调的斜体
试试***强调的斜体***
#### 删除
试试 ~~删除~~
#### 外链的超链接
试试外链的超链接：[我是外链的超链接](https://www.leti.ltd),markdown对链接的语法为：\`[]()\`,如：\`[我是外链的超链接](https://www.leti.ltd)\`
#### 页内的超链接
试试页内的超链接：[我是页内的超链接](#jump_1)，注：你先要在要跳转的到地方放置一个类似：\`<a id="jump_1">任意内容</a>\`的锚点。由\`id="jump_1" \`来匹配。


#### 有序列表
1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

#### 无序列表
- 无序列表 1
- 无序列表 2
- 无序列表 3

#### 引用块
只需要在前面加 \`>\`,如下:
>我是引用块
微信公众号：孟晨
欢迎关注我，一起学习，一起进步，做终身学习者!

#### 分隔线
***


### Markdown扩展语法

#### 表格
| 班级 | 男生 | 女生 |
|-----|-----|------|
| 一(7)班 | 30   | 25 |
| 一(8)班 | 25   | 30 |


### 直接支持html,css
如果你懂html和css，那下面这些效果就不在话下了：

<a href="#jump_1">来个页内跳转</a>，跳转到文未的：\`<a id="jump_1">我是页内跳转到的位置</a>\` ,对应：\`id="jump_1"\`
<span  style="color: #5bdaed; ">先给点颜色你看看</span>
<span  style="color: #AE87FA; ">再给点颜色你看看</span>
<span  style="font-size:1.3em;">试试改变字体大小</span>

<a id="jump_1">我是页内跳转到的位置</a>

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 未完成任务2

### 数学公式
使用两个美元符号包裹TeX或LaTeX格式的数学公式：

$$
E=mc^2
$$

### 代码块显示效果
注：markdown对代码块的语法是开始和结束行都要添加：\\\`\\\`\\\`,其中 \\\` 为windows键盘左上角那个，如下：
\`\`\`yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: haimaxy-sa-rolebinding
  namespace: kube-system
subjects:
- kind: ServiceAccount
  name: haimaxy-sa
  namespace: kube-system
roleRef:
  kind: Role
  name: haimaxy-sa-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`


在页面头部提供了很多中**代码主题**风格，可以根据需要选择合适的即可。

### 用户体验
- 支持自动保存
- 支持多种主题
- 支持快捷键
`;

const builtInExamples: BuiltInExample[] = [
  {
    id: 'example-agent-deep-dive',
    title: '示例：Agent 深度拆解',
    template: 'agent-deep-dive',
    content: `# 拆解 AI Agent：它到底比普通聊天助手多了什么？

> 真正让 Agent 变得有价值的，不是“会回答问题”，而是“会把目标拆成步骤，然后逐步执行”。

## 一、先说结论

如果把聊天助手理解为“给你答案”，那么 Agent 更像“替你推进任务”。

它通常会做 4 件事：

1. 理解目标
2. 拆分步骤
3. 调用工具
4. 检查结果

## 二、一个最小工作流

\`\`\`mermaid
flowchart TD
    A[用户目标] --> B[任务拆解]
    B --> C[选择工具]
    C --> D[执行]
    D --> E{结果可用?}
    E -- 是 --> F[输出结果]
    E -- 否 --> B
\`\`\`

## 三、它和普通聊天助手的区别

| 能力 | 普通聊天助手 | AI Agent |
| --- | --- | --- |
| 回答问题 | 强 | 强 |
| 多步骤执行 | 弱 | 强 |
| 工具调用 | 偶尔 | 常态 |
| 失败重试 | 少 | 更常见 |

## 四、最适合的场景

- 多步骤信息整理
- 内容研究与写作
- 需要搜索、总结、输出一起完成的任务

## 五、最大的限制

Agent 看起来更聪明，但真正难的是：

- 步骤是否稳定
- 工具结果是否可靠
- 失败后能否回正

## 六、最后判断

Agent 的价值不在“替代所有人”，而在于它能把复杂任务变成一条可观察、可干预、可优化的流程。`
  },
  {
    id: 'example-ai-weekly-brief',
    title: '示例：AI 时事周报',
    template: 'ai-weekly-brief',
    content: `# 本周 AI 时事周报：这 5 条最值得看

> 这一周 AI 圈最重要的变化，不是单个模型参数变大，而是产品化和 Agent 化继续往前走了一步。

## 一、本周主线

这周最值得关注的主线有两条：

1. 大模型产品继续向 Agent 能力靠拢
2. 开发者工作流越来越依赖“工具调用 + 自动执行”

## 二、5 条重点动态

### 1. 某家平台发布了新的 Agent 能力

- 发生了什么：支持更复杂的工具调用链
- 为什么重要：从对话进一步走向执行
- 谁会受影响：开发者、内容团队、自动化工具用户

### 2. 某个模型更新了推理能力

- 发生了什么：长任务稳定性更高
- 为什么重要：更适合复杂流程
- 谁会受影响：需要长链路执行的团队

### 3. 某个开源框架更新了多 Agent 协作

- 发生了什么：支持更清晰的角色拆分
- 为什么重要：工程化更容易
- 谁会受影响：正在做内部智能体平台的团队

### 4. 某家产品把工作流做成了可视化

- 发生了什么：非技术用户更容易上手
- 为什么重要：Agent 门槛继续降低
- 谁会受影响：运营、市场、业务团队

### 5. 某个开源项目热度飙升

- 发生了什么：社区开始快速扩展
- 为什么重要：说明需求正在成形
- 谁会受影响：想找低成本方案的开发者

## 三、这一周真正说明了什么？

这周最重要的信号不是“模型更强”，而是：

- AI 正在从回答问题，走向完成任务
- 竞争点开始从模型本身，转向工作流体验

## 四、下周继续关注

- 新的 Agent SDK 是否继续发布
- 更多产品是否补上执行与校验能力
- 开源生态会不会继续分化出更清晰的路线`
  },
  {
    id: 'example-oss-showcase',
    title: '示例：开源项目介绍',
    template: 'oss-showcase',
    content: `# 开源项目介绍：一个值得关注的 AI Agent 框架应该怎么读？

> 看一个 AI 开源项目，最重要的不是 Star 数，而是它到底解决了什么问题，以及你能不能真的用起来。

## 一、这个项目是做什么的？

假设这是一个 AI Agent 框架，它的目标通常会很明确：

- 帮你组织多步骤任务
- 管理工具调用
- 让执行流程更可控

## 二、先看 3 个核心亮点

### 亮点 1：任务拆解

项目能不能把一个复杂目标拆成明确步骤，决定了它是不是“真的像 Agent”。

### 亮点 2：工具接入

如果它只能聊天，价值有限。  
如果它能稳定接搜索、浏览器、代码执行，实用性会高很多。

### 亮点 3：失败恢复

一个成熟框架的差距，往往体现在失败之后怎么办。

## 三、快速评估表

| 维度 | 你该看什么 |
| --- | --- |
| 定位 | 它是框架、平台，还是完整产品？ |
| 任务模型 | 单 Agent 还是多 Agent？ |
| 工具能力 | 能接哪些外部能力？ |
| 上手门槛 | 文档和示例够不够清晰？ |
| 适用场景 | 更适合 Demo，还是适合生产？ |

## 四、最适合谁用？

- 想快速验证 Agent 原型的开发者
- 想做内容自动化流程的团队
- 想研究多步骤 AI 执行链的人

## 五、最常见的问题

> 很多开源项目的问题不是“做不到”，而是“文档说得简单，真正落地很复杂”。

所以你至少要继续追这几件事：

- 文档更新频率
- Issue 活跃度
- 示例是否能直接跑通

## 六、最后判断

一个值得长期关注的 AI 开源项目，必须同时满足三件事：

1. 定位清楚
2. 能力边界清楚
3. 上手路径清楚

否则它很容易停留在“看上去很强”的阶段。`
  }
]

/**
 * Returns the example.md content
 */
export function getExampleContent(): string {
  return exampleContent;
}

export function getBuiltInExamples(): BuiltInExample[] {
  return builtInExamples
}
