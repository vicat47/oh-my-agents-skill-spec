# AGENTS.md: ADR 写作指南

本目录只记录**已裁决**的架构决策；未定方向走 `record-rfc` 或 OpenSpec 提案。

## 何时创建

- 已做出且难以回退的技术/结构决策
- 规范中出现互斥选项并完成取舍
- 上游 skill 约定与本地示例冲突并已裁决

**不要创建**：纯调研过程（→ `docs/research/`）、操作记录
（→ `docs/agent-sessions/`）、进行中的提案（→ `openspec/changes/`）。

## 命名与结构

- 文件名：`NNN-kebab-case-title.md`，编号三位递增
- 结构：`Context → Decision → Consequences → Alternatives`
- 必填 frontmatter：`status`、`created`、`updated`、`author`、`tags`、`related`

## 检查清单

- [ ] 决策陈述为肯定句，含范围与生效条件
- [ ] 列出被否方案与否决理由
- [ ] 标注受影响的规范/示例路径
- [ ] 更新本目录 README 与 `docs/README.md` 计数
