---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

间距组件的基本用法。

## en-US

Basic usage of spacing components.

```tsx
import { Space, Button, Typography } from 'arco-design-solid';

const App = () => {
  return (
    <Space align="center" size={8}>
      <Typography.Text>Space:</Typography.Text>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
    </Space>
  );
};

export default App;
```
