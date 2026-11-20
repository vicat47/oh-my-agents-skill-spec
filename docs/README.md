# INDEX: oh-my-agents-skill-spec 文档索引

> Last updated: 2026-11-20
> Total documents: 3（不含索引 / README / AGENTS）

本文件是 `docs/` 的 Level-0 全局索引，支持 agent 渐进式上下文加载。

## Level 0: 全局总览

| 分类 | 路径 | 文档数 | 状态 |
|------|------|--------|------|
| ADR 架构决策 | `docs/adr/` | 1 | accepted |
| 调研 Research | `docs/research/` | 0 | — |
| Agent 会话 | `docs/agent-sessions/` | 2 | complete |

横切（项目根目录）：

| 文档 | 路径 | 用途 |
|------|------|------|
| AGENTS | `AGENTS.md` | 项目工作约定（技术栈、OpenSpec、APM 同步） |
| Session Memory | `MEMORY.md` | 跨 session 状态快照与资产索引 |
| PITFALLS | `PITFALLS.md` | 环境坑登记（失败协议触发） |

## Level 1: 分类索引

| 目录 | README | Last Updated |
|------|--------|--------------|
| ADR | `docs/adr/README.md` | 2026-11-20 |
| Research | `docs/research/README.md` | 2026-11-20 |
| Agent Sessions | `docs/agent-sessions/README.md` | 2026-11-20 |

## Level 2: 按主题定位

| 主题 | 相关文档 |
|------|----------|
| skill 规范 / 结构约定 | [生产规范入口](../spec/README.md) · [开发 Harness](../skills/vicat-skill-creator/SKILL.md) |
| 领域配置 / 项目总 Schema | [ADR-001](adr/001-single-project-toml.md) · [引用验证](agent-sessions/20261120-skill-domain-config.md) · [关键决策索引](key-decisions.md) |
| 可运行示例 | [lookup-color：从调色板查询颜色](../examples/typescript/lookup-color/README.md) |

## Agent 渐进加载指南

| 场景 | 加载目标 | 预估 |
|------|----------|------|
| 首次进入项目 | `AGENTS.md` + 本索引 + `MEMORY.md` | < 150 行 |
| 文档写作 | `docs/AGENTS.md` + 目标分类 README | < 100 行 |
| 规范变更 | `spec/` 对应章节及 `examples/` 中的验收用例 | 按主题 |

**不要加载**：模板文件、空目录、构建产物、`.agents/` 部署产物。

## Revision Log

| Date | Version | Change Description | Changed By |
|------|---------|-------------------|------------|
| 2026-11-20 | v1.0 | 初始创建：三级索引与 adr/research/agent-sessions 分类 | opencode |
| 2026-11-20 | v1.1 | 补初始化装配记录，Agent Sessions 计数 0→1 | opencode |
| 2026-11-20 | v1.2 | 收录 skill 领域配置讨论与 Schema 引用验证 | opencode |
| 2026-11-20 | v1.3 | 收录 ADR-001：项目配置入口与 Schema 生成时机 | opencode |
