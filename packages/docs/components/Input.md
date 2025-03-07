---
title: Input
lang: en-US
---

# 输入框 Input

## 基本用法

通过鼠标或键盘输入内容。
<demo src="input/index.tsx"  github='Input'></demo>

## 输入框状态

不同的输入框状态
<demo src="input/status.tsx"  github='Input'></demo>

## 四种尺寸

输入框定义了四种默认尺寸（`mini`,`small`, `default`, `large`），分别为 24px，28px，32px，36px。
<demo src="input/size.tsx"  github='Input'></demo>

## 前置、后置标签

指定`addBefore`和`addAfter`在输入框前后添加元素。
<demo src="input/add.tsx"  github='Input'></demo>

## 前后缀

通过`prefix`和`suffix`来在输入框内添加前缀和后缀。
<demo src="input/prefix-suffix.tsx"  github='Input'></demo>

## 搜索框

带有搜索按钮的输入框，用于内容检索。
<demo src="input/search.tsx"  github='Input'></demo>

## 搜索框 Loading

通过 `loading` 属性可以设置搜索框在 `onSearch` 的时候展示 `loading`。
<demo src="input/loading.tsx"  github='Input'></demo>

## 字数统计

设置 `maxLength` 可以限制最大字数，配合 `showWordLimit` 可以显示字数统计。

设置 `maxLength.errorOnly` 后不会限制用户输入字数，但是超过最大字数会展示错误状态。

值得注意的是，如果配置了 `showWordLimit`，那么你将不能使用 `suffix`。

<demo src="input/count.tsx"  github='Input'></demo>

## 文本域

可以用于多行输入。
<demo src="input/textarea.tsx"  github='Input'></demo>

## 适应文本高度文本域

指定 `autoSize`，文本域会自动根据输入的文本调整文本域的高度。如果指定`autoSize={{ minRows, maxRows }}`，也能指定最小行数和最大行数。

<demo src="input/autosize.tsx"  github='Input'></demo>

## 密码输入

用于密码的输入。
<demo src="input/password.tsx"  github='Input'></demo>

## 格式化输入值

在指定时机对用户输入的值进行格式化处理，前后值不一致时，会触发 `onChange`
<demo src="input/format.tsx"  github='Input'></demo>

## 宽度自适应

通过 `autoWidth` 属性可以设置 `Input` 的宽度跟随文字自适应
<demo src="input/fit.tsx"  github='Input'></demo>
