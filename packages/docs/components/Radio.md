---
title: Radio
lang: en-US
---

# 单选框 Radio

在一组相关且互斥数据中，用户仅能选择一个选项。

## 基本使用

基础单选框。
<demo src="radio/index.tsx"  github='BuRadiotton'></demo>

## 单选框组

单选组的用法。有两种用法，可以通过 `children` 的方式或者 `options` 数组的方式。
<demo src="radio/group.tsx"  github='Radio'></demo>

## 竖直单选组

设置 `direction="vertical"` 可以展示竖直的单选组。
<demo src="radio/direction.tsx"  github='Radio'></demo>

## 带图标的单选框

单选框可以与图标进行组合。
<demo src="radio/icon.tsx"  github='Radio'></demo>

## 按钮类型

指定 `type=button`，单选框会展示为按钮样式。
<demo src="radio/type.tsx"  github='Radio'></demo>

## 不同尺寸

按钮类型的单选框分为 4 个尺寸，分别为 `mini`, `small`, `default`, `large`。
<demo src="radio/size.tsx"  github='Radio'></demo>

## 自定义节点内容

可以通过传入函数类型的 `children` 来自定义渲染单选节点。
<demo src="radio/custom.tsx"  github='Radio'></demo>
