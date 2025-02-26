---
title: Button
lang: en-US
---

# Button

按钮用于开始一个即时操作。

## 基本用法

按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。
<demo src="button/index.tsx"  github='Button'></demo>

## 图标按钮

Button 可以嵌入图标，在只设置图标而没有 children 时，按钮的高宽相等。
<demo src="button/icon.tsx"  github='Button'></demo>

## 按钮形状

Button 有多种形状，square - 长方形 **(默认)**, circle - 圆形, round - 全圆角。
<demo src="button/shape.tsx"  github='Button'></demo>

## 按钮尺寸

Button 有多种尺寸，large - 大尺寸 **(默认)**, middle - 中尺寸, small - 小尺寸。
<demo src="button/size.tsx"  github='Button'></demo>

## 按钮状态

按钮状态分为 警告，危险，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型。
<demo src="button/status.tsx"  github='Button'></demo>

## 禁用状态

按钮的禁用状态。
<demo src="button/disabled.tsx"  github='Button'></demo>

## 加载中状态

通过设置loading可以让一个按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。
<demo src="button/loading.tsx"  github='Button'></demo>
