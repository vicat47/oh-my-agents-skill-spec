# AGENTS.md: docs/ 写作指南

本文件指导 AI agent 在 `docs/` 下创建与维护文档。产品规范正文归 `spec/`，
`docs/` 只收录决策、调研与工作记录。

## 文档类型与归属

| 内容 | 落点 | 负责 skill |
|------|------|-----------|
| 架构决策 | `docs/adr/NNN-kebab-title.md` | `record-adr` |
| 技术调研 / 选型 | `docs/research/YYYYMMDD-<slug>.md` | `record-research` |
| 修复 / 排查 / 装配记录 | `docs/agent-sessions/YYYYMMDD-<slug>.md` | `record-docs` |
| 会话记忆 | 项目根 `MEMORY.md` | `record-memory` |
| skill 产品规范 | `spec/`；`openspec/` 可保留编制过程稿 | 见根目录 `AGENTS.md` |

## 约定

- 中文撰写；文件名英文 kebab-case（日期前缀除外）
- 分类文档带 YAML frontmatter（`status`/`created`/`updated`/`author`/`tags`/`related`）
- 不复制粘贴既有内容，用相对路径引用
- 新建后同步分类 README 与 `docs/README.md` 计数

## 回归检查（创建前必做）

1. 读 `docs/README.md` 与目标分类 README，检查同主题是否已存在
2. ADR 取号：`ls docs/adr/ | sort -V | tail -1`，递增三位编号
3. 查重与校验：

   ```bash
   python3 .agents/skills/doc-structure/scripts/scan_docs.py check-duplicates --dir docs/
   python3 .agents/skills/doc-structure/scripts/scan_docs.py validate --dir docs/ --recursive
   ```

## 清理纪律

- 空目录不建；文档被替代时标记 `superseded` 并保留历史
- 索引计数以 `scan_docs.py summary --dir docs/` 输出为准
