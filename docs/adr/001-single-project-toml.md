---
status: accepted
created: 2026-11-20
updated: 2026-11-20
author: opencode
decider: 项目维护者
tags: ["adr", "skill-config", "toml", "json-schema"]
affected_c4_elements: ["项目初始化与 skill 装配工具", "Taplo", "消费配置的 skill"]
related:
  adr: ""
  c4: "#配置流向"
  research: ""
  radar: ""
  session: "../agent-sessions/20261120-skill-domain-config.md"
---

# ADR-001：用一份项目 TOML 管理 skill 配置，按已安装的 skill 生成总 Schema

## 背景

浏览器自动化和云原生排障可能面向同一平台实例。项目维护者希望只登记一次平台，在同一处查看和修改相关服务与 skill 的配置。同时，每个领域或 skill 的作者需要能独立维护字段定义，用户安装新 skill 后就能知道该填什么。

## 决策

**消费项目使用一份可编辑的 TOML 管理项目级配置，并通过 `#:schema` 关联一个项目级 JSON Schema 入口。** TOML 按领域和 skill 划分配置节；明确属于用户全局的设置仍按全局作用域管理。

- **项目维护配置值。** 平台清单和服务实例由项目填写；账号只保存引用。全局默认值可以初始化项目清单，后续装配不得覆盖已有选择。
- **领域和 skill 维护字段定义。** 共享字段由所属领域定义一次；需要配置的 skill 随包提供自有字段的 Schema 和最小示例，并自行解析、校验所需配置节。
- **装配工具维护总 Schema。** 项目初始化时生成，添加 skill 时更新同一入口，保留已有 TOML 配置值。总 Schema 是可重建的产物。统一入口不要求所有源 Schema 物理合并；外部 `$ref` 或单文件打包由后续验证决定。

## 影响与取舍

维护者添加 skill 后仍编辑原文件；编辑器和运行时可以复用同一套字段定义。代价是装配工具需要处理不同 skill 的字段命名冲突，并保证引用对编辑器和校验器都可解析。配置合法只说明字段符合约定，skill 仍须在执行前核对目标、会话和动作权限。

### 配置流向

项目初始化与 skill 装配工具读取领域和 skill 的源 Schema，生成项目总 Schema；Taplo 通过项目 TOML 的 `#:schema` 读取该入口；各 skill 从同一 TOML 读取所需配置。此处描述目标架构，尚未实施。

## 备选方案

| 方案 | 不采用的原因 |
|---|---|
| 每个领域或 skill 各有一份项目 TOML | 分开维护更方便，但用户必须定位多份文件，跨 skill 查看同一平台的配置也更困难。领域边界用 TOML 配置节即可表达。 |
| 一份项目 TOML，手工维护总 Schema | 省去生成步骤，但添加 skill 后需要手工同步字段，编辑器提示容易落后于已安装版本。 |

**验收依据：** 用户初始化项目并登记一个平台后，添加一个 skill；原 TOML 中的平台配置仍在，Taplo 能补全新配置节。漏填必填项时，编辑器和 skill 均能定位到该项。离线引用验证与待验范围见[讨论记录](../agent-sessions/20261120-skill-domain-config.md)。产品规范见[配置契约](../../spec/configuration.md)，可运行样例归 `examples/`。
