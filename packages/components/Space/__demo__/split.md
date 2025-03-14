---
order: 5
title:
  zh-CN: 分隔符
  en-US: Split
---

## zh-CN

为相邻子元素设置分隔符。

## en-US

Set separators for adjacent child elements.

```tsx
import { Space, Link, Divider } from 'arco-design-solid';

const App = () => {
  return (
    <Space split={<Divider type="vertical" />}>
      <Link>Link 1</Link>
      <Link>Link 2</Link>
      <Link>Link 3</Link>
    </Space>
  );
};

export default App;
```
