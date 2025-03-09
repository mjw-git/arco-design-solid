---
title: Avatar
lang: en-US
---

# 头像 Avatar

用作头像显示，可以为图片、图标或字符形式展示。

## 基础用法

头像的基础使用。如果头像是文字的话，会自动调节字体大小，来适应头像框。
<demo src="avatar/index.tsx"  github='Avatar'></demo>

## 大小和形状

通过设置 `size` 字段，可以调节头像的大小，默认大小为 `40px`。设置 `shape` 字段，可以设置头像是圆形 (circle) 还是正方形 (square)。
<demo src="avatar/size.tsx" github='Avatar'></demo>

<!-- ## 头像组

使用 `Avatar.Group` 可以使用头像组功能，可通过 `size` 指定头像的大小。
<demo src="avatar/group.tsx" github='Avatar'></demo> -->

## 交互按钮

可以通过 `triggerIcon` `triggerType` 来定制交互按钮，类型有 `mask (遮罩)` 和 `button (按钮)` 两种，通过 `onClick` 参数来添加回调。
<demo src="avatar/trigger.tsx" github='Avatar'></demo>

## 自动调整字体大小

如果头像是文字的话，会自动调节字体大小，来适应头像框。
<demo src="avatar/resize.tsx" github='Avatar'></demo>
