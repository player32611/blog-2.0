# Skill

> Skill = AI 智能体可调用的能力包

::danger

该页面尚未完工!

::

## Skill 在 AI 能力栈的位置

L1 基础模型层（星火 Lite / Pro / Max / 4.0 Ultra） ->
L2 智能体层（AstronClaw / Loomy） ->
**L3 能力插件层（Skill）** ->
L4 场景应用层（内容创作 / 办公自动化）

## SKILL.md 结构

**NAME**: 名称，小写字母 + 数字 + 连字符

**DESCRIPTION**: 简介，含触发词 + Use when

**TRIGGER**: 触发词，中英文至少各 2 个

**ABILTIES**: 能力，简洁明确的输入输出

**OUTPUT**: 输出，可被解析的结构化

```md
---

name: hello-skill
description: 当用户说"你好 / hello / hi / 打个招呼"时触发，使用星火 Lite 模型生成一句 30 字以内的中文问候语。Use when the user says hi / hello / great.

# hello-skill

## 能力

调用讯飞星火 Lite 接口，根据用户输入语言返回对应问候语。
```

### DESCRIPTION

description = 决定触发的唯一依据，最长 1024 字符 + 第三人称写法 + 包含触发词 + Use when

::danger
反例：

::code-group

```md[反例 1：太宽]
"这是一个万能 AI 助手"
```

```md[反例 2：太窄]
"用户在深夜 23:30 说晚安时触发"
```

```md[反例 3：太抽象]
"提供友好的人机交互体验"
```

::
::
