# MEMORY.md — oh-my-agents-skill-spec 交接记忆

> 协议：record-memory（recall 为 session 开始必做）。轻量条目在此，
> 「值得记」的成篇内容按插入路由表落 `docs/`。

## 项目状态快照（2026-11-20）

- 版本：0.1.0
- 上次提交：无（仓库初始化，尚未提交）
- 当前阶段：首版[生产规范](spec/README.md)、[开发 Harness](skills/vicat-skill-creator/SKILL.md) 和只读查询示例。下一步用独立 Agent 验收触发与交付。

## 近期记忆

- 2026-11-20：按 project-bootstrap 完成初始化；APM documentation 域
  （19 skills + brainstorm agent），OpenSpec 10 skills，docs 分类为
  adr / research / agent-sessions。
- 技术栈定为 Markdown + TypeScript/Node.js + Go；`examples/` 按需创建。
- 依赖策略：git 跟踪上游 HEAD（未钉 tag）；更新 skill 后需重启
  opencode 服务。
- [ADR-001](docs/adr/001-single-project-toml.md)：一份项目 TOML 关联一个总 Schema；初始化和添加 skill 时生成或更新总 Schema。
  待验证 Taplo 与 skill 的离线校验一致性，见[领域配置讨论记录](docs/agent-sessions/20261120-skill-domain-config.md)。

## 文档资产索引

| 分类 | 路径 | 文档数 |
|------|------|--------|
| ADR 架构决策 | `docs/adr/` | 1 |
| 调研 Research | `docs/research/` | 0 |
| Agent 会话 | `docs/agent-sessions/` | 2 |

## 升降级日志

<!-- 日期 | 条目 | 层路径 | 判据 | 裁决 -->
