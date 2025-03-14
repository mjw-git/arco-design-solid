---
order: 2
title:
  zh-CN: 文本
  en-US: Text
---

## zh-CN

不同样式的文本以及超链接组件。

## en-US

Different styles of text.

```tsx
import { Typography } from 'arco-design-solid';

const Test = () => {
  return (
    <Typography>
      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text>Arco Design</Typography.Text>
      </div>
      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="secondary">Secondary</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="primary">Primary</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="success">Success</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="warning">Warning</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="error">Error</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text bold>Bold</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text disabled>Disabled</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text mark>Mark</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text underline>Underline</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text delete>Line through</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text code>Code snippet</Typography.Text>
      </div>
    </Typography>
  );
};
export default Test;
```
