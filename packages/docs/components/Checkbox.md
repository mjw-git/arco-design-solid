---
title: CheckBox
lang: en-US
---

# 复选框 Checkbox

在一组数据中，用户可通过复选框选择一个或多个数据。

## 基本用法

<demo src="checkbox/basic.tsx"  github='Checkbox'></demo>

## 禁用

禁用复选框。
<demo src="checkbox/disabled.tsx"  github='Checkbox'></demo>

## 复选框组

生成复选框组。设置 `direction="vertical"` 可以展示竖向的复选框组
<demo src="checkbox/group.tsx"  github='Checkbox'></demo>

## 全选

通过 `indeterminate` 属性可以实现半选效果。
<demo src="checkbox/indeterminate.tsx"  github='Checkbox'></demo>

## 布局

可以通过 `children` 传入 `checkbox`，配合Grid组件实现灵活的布局。
<demo src="checkbox/grid.tsx"  github='Checkbox'></demo>

## 自定义icon

通过 icon 属性自定义选中态图标。
<demo src="checkbox/icon.tsx"  github='Checkbox'></demo>

## 自定义节点内容

可以通过传入函数类型的 `children` 来自定义渲染节点内容。
<demo src="checkbox/custom.tsx"  github='Checkbox'></demo>
