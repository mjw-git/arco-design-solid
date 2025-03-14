---
order: 3
title:
  zh-CN: 对齐
  en-US: Align
---

## zh-CN

内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。

## en-US

There are 4 built-in alignment methods, namely `start` `center` `end` `baseline`, and the default is `center` in horizontal mode.

```tsx
import { Space, Button } from 'arco-design-solid';

function App() {
  return (
    <div>
      <Space align="start" size="large">
        <Button size="mini" type="primary">
          Item1
        </Button>
        <Button type="primary">Item2</Button>
        <Button size="small" type="primary">
          Item3
        </Button>
      </Space>
    </div>
  );
}

export default App;
```
