# oh-my-agents-skill-spec

一套面向开发 Agent 的 skill 生产规范，从选择真实场景到验证交付、升级和退役。

1. **看规则**：[生产规范](spec/README.md)说明每一步怎样才算完成。
2. **制作 skill**：将 [`skills/vicat-skill-creator/`](skills/vicat-skill-creator/SKILL.md) 整个目录放入客户端支持的 skill 发现目录。给 Agent 一个真实请求，请它制作或改进相应的 skill。
3. **跑一个例子**：[lookup-color](examples/typescript/lookup-color/README.md) 从一份 TOML 调色板里查出 `mint` 的十六进制颜色值。安装依赖后，无需账号或在线服务即可运行。

设计取舍见 [`docs/adr/`](docs/adr/README.md)。`openspec/` 是本框架的编制过程稿，使用上述三个产物无需安装 OpenSpec。
