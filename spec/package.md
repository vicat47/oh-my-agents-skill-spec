# 包结构

沿用 [Agent Skills 格式](https://agentskills.io/specification)：一个目录代表一个 skill；根目录必须有 `SKILL.md`，其 YAML frontmatter 至少有 `name` 和 `description`。`name` 与目录名一致；`description` 说明能力及适用请求，让 Agent 在加载正文前可以选择。

| 包内位置 | 何时使用 |
|---|---|
| `SKILL.md` | 必需。写明适用与不适用场景、操作入口、输入、输出和停止条件。 |
| `scripts/` | 有确定性操作或需要反复执行的校验时；写明运行环境、依赖和调用方法。 |
| `references/`、`assets/` | 按需放详细指南、模板或静态样例，从入口按需引用。 |
| `schemas/` | 声明可配置字段时提供源 JSON Schema；消费共享字段时引用其所属领域的定义。 |

包内文件以包根定位；项目输入显式从消费项目定位，不假定二者是同一目录。移动包后用独立工作目录复验。运行产生的文件不得写回包内。
