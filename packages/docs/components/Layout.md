---
title: Layout
lang: en-US
---

# 布局 Layout

页面的基础布局框架，常与组件嵌套使用，构建页面整体布局。

## 基本使用

典型的页面布局。
<demo src="layout/index.tsx"  github='Layout'></demo>

## 自定义按钮 Icon

通过设置 Layout.Sider 的 trigger 属性，实现自定义收起按钮的图标。

<demo src="layout/icon.tsx"  github='Layout'></demo>

## 自定义收起按钮

设置 Menu.Sider 的 trigger 属性为 null 后，Sider 内置的缩起按钮不会显示。此时可自定义收起按钮。

<demo src="layout/collapse.tsx"  github='Layout'></demo>
