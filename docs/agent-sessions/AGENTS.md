# AGENTS.md: Agent Sessions 写作指南

本目录记录「做过什么、为什么、结果如何」，面向跨 session 交接。
架构结论归 ADR，选型证据归 Research。

## 何时创建

- 初始化 / 升级装配（APM、OpenSpec、工具链）
- 排查并修复构建、测试、运行问题
- 迁移目录、重命名规范、批量改写引用

**不要创建**：无验证结果的流水账、可从 git log 直接看出的变更。

## 命名与结构

- 文件名：`YYYYMMDD-<slug>.md`
- 结构：`背景 → 操作 → 结果 → 遗留问题`
- 必填 frontmatter：`status`、`created`、`updated`、`author`、`tags`、`related`

## 检查清单

- [ ] 含可复现命令与最终验证结果
- [ ] 失败尝试与回滚方式已记录
- [ ] 遗留项已登记到 `MEMORY.md` 或 `PITFALLS.md`
- [ ] 更新本目录 README 与 `docs/README.md` 计数
