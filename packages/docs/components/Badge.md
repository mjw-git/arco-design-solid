---
title: Badge
lang: en-US
---

# 徽标数 Badge

一般出现在图标或文字的右上角。提供及时、重要的信息提示。

## 基础用法

基础的用法。只需指定 `count`，即可显示徽标。
<demo src="badge/index.tsx"  github='Badge'></demo>

## 独立使用

`children` 为空时，将会独立展示徽标。
<demo src="badge/self.tsx"  github='Badge'></demo>

## 小红点

设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。
<demo src="badge/dot.tsx"  github='Badge'></demo>

## 文本内容

设置 `text`，可设置自定义提示内容。
<demo src="badge/text.tsx"  github='Badge'></demo>

## 最大值

设置 `maxCount`，可以限制最大显示的徽标数值，超过将会加 + 后缀。`maxCount` 默认为 99。

<demo src="badge/max.tsx"  github='Badge'></demo>

## 颜色

我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。
<demo src="badge/color.tsx"  github='Badge'></demo>
