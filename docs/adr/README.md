# ADR 架构决策记录

本目录收录 oh-my-agents-skill-spec 的架构决策记录（ADR）。

## 决策清单

| 编号 | 标题 | 状态 | 日期 |
|------|------|------|------|
| 001 | [单一项目 TOML，按已安装的 skill 生成总 Schema](001-single-project-toml.md) | accepted | 2026-11-20 |

## 约定

- 新建走 `record-adr` skill；编号递增三位（`ls | sort -V | tail -1`）
- frontmatter 必填（status/created/updated/author/tags/related）
- 新建后更新本表与 `docs/README.md` 计数
