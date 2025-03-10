---
title: Tag
lang: zh-CN
---

# 标签 Tag

用于信息的选择、筛选、分类。用户通过标签进行信息反馈和交互操作。

## 基础用法

标签的基础用法。

<demo src="tag/index.tsx"  github='Tag'></demo>

## 可关闭标签

可设置 `closable` 属性控制标签是否可关闭，可关闭标签可通过 `onClose` 事件执行一些关闭后操作。也可通过 `visible` 属性控制标签的显示隐藏。

<demo src="tag/close.tsx"  github='Tag'></demo>

## 可选中

通过参数 `checkable`，可以实现点击选中的效果。

<demo src="tag/checkable.tsx"  github='Tag'></demo>

## 多色标签

我们提供多种预设色彩的标签样式，通过 `color` 设置不同颜色。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。
<demo src="tag/color.tsx"  github='Tag'></demo>

## 动态编辑标签

可动态添加和删除标签。

<demo src="tag/edit.tsx"  github='Tag'></demo>

## 不同尺寸

标签分为：小、中、大、巨大，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为「中」。
<demo src="tag/size.tsx"  github='Tag'></demo>

## 异步关闭

如果 `onClose` 返回一个 `Promise`，可以异步关闭标签，并且在未关闭时展示加载效果。
<demo src="tag/promise.tsx"  github='Tag'></demo>
