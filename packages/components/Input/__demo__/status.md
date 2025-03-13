---
order: 1
title:
  zh-CN: 输入框状态
  en-US: Status
---

## zh-CN

不同的输入框状态

## en-US

Different Input status.

```tsx
import { Input, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space wrap>
      <Input style={{ width: '350px' }} status="error" placeholder="error status" />
      <Input style={{ width: '350px' }} status="warning" placeholder="warning status" />
      <Input style={{ width: '350px' }} disabled placeholder="disabled input" />
    </Space>
  );
};

export default App;
```
