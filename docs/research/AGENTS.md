# AGENTS.md: Research 写作指南

本目录承载「选型前」的证据收集与对比；定案后转 ADR 或 OpenSpec 规范。

## 何时创建

- 比较多个 skill 组织方式、示例语言或工具链方案
- 引入新依赖 / 新规范前需要可复核证据
- 复现上游行为差异（APM、OpenSpec、opencode 版本代际）

**不要创建**：一句话结论（写 `MEMORY.md`）、已裁决决策（→ ADR）。

## 命名与结构

- 文件名：`YYYYMMDD-<slug>.md`
- 结构：`问题 → 假设 → 候选方案 → 验证 → 结论 → 参考`
- 必填 frontmatter：`status`、`created`、`updated`、`author`、`tags`、`related`

## 检查清单

- [ ] 每个候选方案有可复现的验证命令或来源链接
- [ ] 明确记录版本与环境（OS、Node/Go、工具版本）
- [ ] 结论区分「事实」与「推断」
- [ ] 更新本目录 README 与 `docs/README.md` 计数
