---
status: complete
created: 2026-11-20
updated: 2026-11-20
author: opencode
tags: ["agent-session", "skill-config", "json-schema", "taplo"]
related:
  adr: "../adr/001-single-project-toml.md"
  c4: ""
  research: ""
  radar: ""
  session: "./20261120-project-bootstrap.md"
---

# Skill 如何读取领域配置：讨论记录与 Schema 引用验证

## 背景

`browser-automation-workspace` 通过浏览器访问平台，`spic-cloud-native-skill` 提供 Kubernetes 排障等能力。两者需要对同一个平台目标有一致的理解，但各自的操作方法不同。本次讨论确认了配置归属与执行边界；项目总 Schema 的生成方式仍在讨论。本文是会话记录，供后续 OpenSpec 提案引用。

## 已确认的边界

| 谁维护 | 维护什么 |
|---|---|
| 基础领域 | 平台标识、网络区域（如内网、外网、系统服务区）、环境（如 dev、sit、uat、prod）及实际存在的访问目标。这些共享字段的 Schema 只定义一次。区域和环境是筛选条件，不保证唯一标识平台。 |
| 各业务或技术领域 | 按目标登记控制台、中间件等服务实例，以及适用的操作指南。账号绑定到具体实例；配置只存 `credentialRef`，不存密码、令牌或会话。 |
| 项目与用户 | 项目维护本项目的平台清单；全局默认值仅用于首次初始化。之后重跑或升级不得补回项目删掉的平台，显式空清单也是有效选择。明确属于全局的设置仍从全局读取。 |
| 需要配置的 skill | 随包提供自有字段的 Schema、最小配置示例，并在 `SKILL.md` 说明位置和格式。skill 自行解析实际配置、校验所用部分，引用共享字段定义。安装位置不决定配置作用域。 |

**配置的字段有效，不等于操作可以执行。** 访问外部环境的 skill 声明支持的目标和动作，执行前核对实际实例、网络条件和当前会话；直接调用脚本也执行同样的检查。所有环境默认按生产标准操作，项目、实例或 skill 可以进一步收紧。`sit` 不是放宽变更限制的理由。

### 用云原生平台检验边界

| 服务实例 | 访问事实 | 预期行为 |
|---|---|---|
| 外网 PROD 控制台 | 不要求 VPN，支持 4A 单点认证 | 选用该实例的账号。“不要求 VPN”不意味着必须断开 VPN。 |
| 内网 SIT 控制台 | 需要 VPN，必须访问该目标的 `host/loginOld` | 即使浏览器里有有效的 PROD 会话，也不能复用它执行 SIT 请求。 |
| 内网 SIT 某中间件 | 与控制台是不同服务，有自己的账号和指南 | 缺少该实例的 `credentialRef`，编辑器和 skill 都应指出缺项；执行在登录前停止，不借用控制台账号。 |

## 验证：JSON Schema 能否像 `import` 一样复用定义？

可以用 `$ref` 对某个配置值应用另一份 Schema。它引用的是校验规则，不会复制字段或合并配置值。相对引用按 Schema 的基准 URI 解析；使用标识 URI 也不必联网，可由校验器在本地注册对应内容。见 [JSON Schema 模块化与引用](https://json-schema.org/understanding-json-schema/structuring#ref)。

本次用 Python 的 `jsonschema` 和 `referencing` 做了离线验证。以下命令可复现；示例中的 `console` 只为演示引用，不预定最终配置结构：

```bash
python3 - <<'PY'
from jsonschema import Draft4Validator
from referencing import Registry
from referencing.jsonschema import DRAFT4
uri = "https://example.invalid/schemas/service.json"
service = {"type": "object", "required": ["credentialRef"],
           "properties": {"credentialRef": {"type": "string"}}}
registry = Registry().with_resource(uri, DRAFT4.create_resource(service))
root = {"type": "object", "properties": {"console": {"$ref": uri}}, "required": ["console"]}
v = Draft4Validator(root, registry=registry)
assert v.is_valid({"console": {"credentialRef": "example-account"}})
error, = v.iter_errors({"console": {}})
assert list(error.path) == ["console"] and error.validator == "required"
print(error.json_path, error.message)
PY
```

结果：有效配置通过，缺字段时返回 `$.console 'credentialRef' is a required property`。这个结果验证了跨 Schema 引用，不代表已经验证编辑器或真实 skill。

[Taplo 官方文档](https://taplo.tamasfe.dev/configuration/developing-schemas.html)明确支持 JSON Schema Draft 4 及外部引用；TOML 可通过文件头的 [`#:schema`](https://taplo.tamasfe.dev/configuration/directives.html#the-schema-directive) 关联同一份 JSON Schema。因此可以只维护一套字段定义。当前环境未发现 `taplo` 命令，尚未实测 TOML 补全和诊断，也未选定项目通用的 Schema 草案版本。

## 已确认：一个项目 TOML，一个总 Schema 入口

此项决策已收录为 [ADR-001](../adr/001-single-project-toml.md)。

用户在同一份项目 TOML 中维护平台清单、领域服务实例和 skill 专属配置。该文件通过 `#:schema` 关联项目总 Schema。各 skill 从同一份 TOML 读取自己需要的配置节；共享字段仍由所属领域定义。

项目初始化时生成总 Schema，添加 skill 时更新它；已有 TOML 配置值保留。候选实现是在总 Schema 中为各配置节生成 `$ref`，例如 `"console": {"$ref": "./schemas/console.json"}`。各领域或 skill 维护源 Schema；是否需要把这些源文件打包为一个物理文件，取决于离线引用验证结果。

下一步验证：初始化项目 TOML，填写一个平台，再添加一个 skill。预期仍编辑原文件，平台配置保留，Taplo 能补全新增配置节，且与 skill 的离线校验都能定位到同一缺失字段。引用路径、版本管理、移除或升级 skill 时的行为待定。
