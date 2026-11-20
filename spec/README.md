# Agent Skill 生产规范

读者是制作 skill 的开发者和 Agent。目标是：给未参与开发的 Agent 一个已安装的 skill 和真实请求，它能判断是否适用，执行后能说明结果或失败原因。

| 想回答的问题 | 规范 |
|---|---|
| 从任务到交付，什么时候算完成？ | [生产生命周期](lifecycle.md) |
| skill 包里有哪些文件，哪些可选？ | [包结构](package.md) |
| 字段由谁定义，项目值从哪里读？ | [配置契约](configuration.md) |
| 一次调用如何选目标、报告结果和处理文件？ | [运行时契约](runtime.md) |

“必须”是验收条件；“建议”是默认做法；标明条件的规则只对相应类型的 skill 生效。例如，不读取配置的 skill 无需创建 Schema，不写文件的 skill 无需创建运行目录。

**使用方式：** 由 [vicat-skill-creator](../skills/vicat-skill-creator/SKILL.md) 引导开发；以 [lookup-color](../examples/typescript/lookup-color/README.md) 查看一个只读查询成品。示例文件名和技术栈仅用于示范，除非正文明确规定，否则不构成通用要求。
