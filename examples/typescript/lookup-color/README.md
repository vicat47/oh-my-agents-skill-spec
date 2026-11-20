# lookup-color：这个项目里的 mint 是什么色值？

在本目录使用 Node.js 24 运行下面两行。第一行按锁文件安装依赖，第二行查询[虚构的项目调色板](demo/project.toml)。

```sh
npm ci
node scripts/lookup.ts demo/project.toml mint
```

输出一行：

```text
#83D6AE
```

要查自己的项目，把 `demo/project.toml` 换成项目文件路径，`mint` 换成颜色名称。比如，项目与本包是相邻目录时，从项目目录运行 `node ../lookup-color/scripts/lookup.ts project.toml mint`。名称区分大小写；未找到或配置错误时，退出码为 1，原因写入标准错误，标准输出为空。

## 一份 TOML，两层 Schema

项目只编辑一份 TOML。[示例](demo/project.toml)首行的 `#:schema` 让支持该指令的编辑器找到[项目总 Schema](schemas/project.schema.json)。总 Schema 要求有 `[palette]` 表，各名称的值通过 `$ref` 复用[色值字段 Schema](schemas/hex-color.schema.json)。因此别的字段也可以引用同一个六位十六进制规则，而具体色值只存在项目数据中。

查询脚本使用 `smol-toml` 1.x 解析 TOML，使用 Ajv 8.x 加载包内这两份 Schema，离线校验；确切版本见[公开 npm 锁文件](package-lock.json)。不需要编译 TypeScript。更换安装位置后，如要保留编辑器提示，请更新 TOML 首行到总 Schema 的相对路径。移除本包不会改动消费项目，也没有查询日志、缓存或结果文件需要迁移。

## 验收

运行 `npm test`。测试从独立的临时项目目录调用脚本，查询进程只有文件读取权限：

| 请求 | 应观察到的行为 |
| --- | --- |
| 查当前项目的 `mint` | 两次查询均返回该项目的值，保留大小写，TOML 内容不变 |
| 把 `mint` 改成白色 | Agent 不应选用此 skill；脚本也不接受额外的改色参数 |
| 文件缺失、语法错误、缺少 `[palette]`、有坏色值或名称不存在 | 退出并报告原因，不返回任何颜色 |

自动化测试验证脚本行为。独立 Agent 能否仅凭描述选对 skill，需另行验收；选用与停止条件见 [SKILL.md](SKILL.md)。
