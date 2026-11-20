# AGENTS.md - oh-my-agents-skill-spec

## 项目概述

**项目目标：指导开发 Agent 从一个真实任务出发，生产一个能被未参与开发的 Agent 正确选用、执行和维护的 skill。**
首要产物是[生产规范](spec/README.md)；[vicat-skill-creator](skills/vicat-skill-creator/SKILL.md) 是执行这套规范的开发 Harness，也是本仓维护的一个 skill；[调色板示例](examples/typescript/lookup-color/README.md)用可运行的验收场景检验规范。
生产生命周期覆盖选场景、定契约、制作、验收、交付、演进与退役。单次运行的输入、目标、结果、失败和文件归属是调用契约的一部分。

> **Session 交接**：跨 session 关键上下文请先读 `MEMORY.md`（状态快照 /
> 近期决策 / 待办 / 文档索引）。

> **失败协议（强制）**：任何构建/测试失败，或遇 `error TS`、`go: `、
> `apm` 安装/解析失败等报错 → 必须先读 `PITFALLS.md` 比对症状关键字，
> 再开始排查。

## 术语

| 术语 | 说明 |
|------|------|
| skill | Agent 可加载的能力包：`SKILL.md` + 可选 `scripts/`、`templates/`、`references/` |
| APM | Agent Package Manager，负责 skill 依赖声明、安装与部署 |
| 上游 | `home-vicat-skills` 仓库，是 APM 引入的文档类依赖的修改源 |
| Harness | 指导 Agent 开发、验证并交付其他 skill 的能力包 |
| 规范（spec） | `spec/` 中面向使用者交付的规则与验收标准 |
| 示例（example） | 可运行的 skill 最小实现或验证用例 |

## 技术栈

- 文档：Markdown（中文正文，技术术语保留英文）
- 示例：TypeScript / Node.js（CLI、工具链场景）
- 示例：Go（服务端、CLI 场景）
- 工具链：APM 0.36、OpenSpec-cn 2.0.0

## 项目结构

```
oh-my-agents-skill-spec/
├── AGENTS.md / MEMORY.md / PITFALLS.md   # 记忆层
├── apm.yml                                # APM 依赖（documentation 域）
├── spec/                                  # 产品：生产生命周期、包结构、配置、运行时
├── skills/vicat-skill-creator/             # 产品：开发 Harness 的源包
├── examples/typescript/lookup-color/       # 产品：公开调色板示例及其验收用例
├── docs/                                  # 编制依据与历史
│   ├── adr/                               # 架构决策记录
│   ├── research/                          # 调研与选型
│   └── agent-sessions/                    # 修复/排查/工作记录
├── openspec/                              # 编制本框架时的过程稿
└── .agents/ .opencode/                    # 部署产物（gitignore）
```

## 构建与测试速查

```bash
apm install -v --no-policy        # 安装/刷新 skill 部署
apm update                        # 更新上游 skill
openspec-cn list                  # 查看变更提案
python3 .agents/skills/doc-structure/scripts/scan_docs.py summary --dir docs/

# 最小示例（在 examples/typescript/lookup-color/ 中）
npm ci
npm test
```

## 文档规范

- 文档根为 `docs/`（不使用 `doc/`）；写作前先读 `docs/AGENTS.md`
- 分类落点：决策 → `docs/adr/`；调研 → `docs/research/`；
  过程记录 → `docs/agent-sessions/`
- 新建文档后同步分类 README 与 `docs/README.md` 计数
- 交付给 skill 作者的规范正文写入 `spec/`，开发步骤写入 `skills/vicat-skill-creator/`。
  OpenSpec 可辅助编制，阅读规范、安装 Harness 和运行示例均不依赖其过程稿。
  ADR 记录取舍，并链接对应规范，不代替规范。

## OpenSpec 工作流

- **变更隔离**：提案创建（`openspec/changes/<name>/` 首个文件落盘）时即建
  `feat/<change-name>` 分支；纯文档产出物不分支、直接主干提交
- **提交边界**：产出物与实现代码同分支；不混入本地环境文件；禁止提交密钥
- **回归顺序**：归档前 `fetch origin` → 合主干入分支 → 合并后状态回归
  （编译 + 测试 + 冒烟）→ 推分支 → 合回主
- **多仓/子模块**：本仓库当前无子模块；若未来引入，先子模块后主仓库

## APM skill 同步

- 本仓库通过 apm 跟踪上游 `home-vicat-skills` 的 `packages/documentation`
  （跟随 HEAD，未钉 tag）
- **APM 引入的 skill 在上游修改**；本仓原创的 Harness 在 `skills/` 修改，示例在 `examples/` 修改
- 更新：`apm update`（或 `apm install -v --no-policy`）
- **skill 不热加载**：更新后必须重启 opencode 服务
  （本机 `systemctl --user restart opencode-service.service`）

## 其他注意事项

- 新增示例必须可运行：给出明确的安装/测试命令，并在示例 README 说明依赖版本
- 面向公开读者的示例优先选日常任务，从零编写虚构数据；说明、样例、测试和锁文件均不得包含内部业务标识、私有地址、个人绝对路径或凭据。
- 示例与规范不一致时先复现：实现偏离已定契约则修示例；要变更契约则同步规范、Harness 和验收用例
- 不提交 `.agents/`、`.opencode/`、`apm_modules/`、`apm.lock.yaml`、`opencode.json`
