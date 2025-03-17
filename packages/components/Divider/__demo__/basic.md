---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。

## en-US

Can be used to separate paragraphs of different chapters. The default is a horizontal dividing line. Text can be added within divider.

```tsx
import { Typography, Divider } from 'arco-design-solid';
const Test = () => {
  return (
    <div class="divider-demo">
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider />
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider
        style={{
          'border-bottom-style': 'dashed',
        }}
      />
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider
        style={{
          'border-bottom-width': '2px',
          'border-bottom-style': 'dotted',
        }}
      />
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider class="half-divider" />
    </div>
  );
};
export default Test;
```

```css
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}

.divider-demo-flex-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-demo .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 50%;
  font-size: 16px;
  background-color: var(--color-fill-3);
  color: var(--color-text-2);
}

.divider-demo .content {
  flex: 1;
  font-size: 12px;
  line-height: 20px;
  color: var(--color-text-2);
}

.divider-demo .title {
  margin-bottom: 2px;
  font-size: 16px;
  line-height: 24px;
  color: #1d2129;
}

.divider-demo .half-divider {
  left: 55px;
  min-width: auto;
  width: calc(100% - 55px);
  margin: 16px 0;
}
```
