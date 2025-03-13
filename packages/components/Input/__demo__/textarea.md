---
order: 8
title:
  zh-CN: 文本域
  en-US: Textarea
---

## zh-CN

可以用于多行输入。

## en-US

A textarea input example.

```tsx
import { Input, Space } from 'arco-design-solid';
const TextArea = Input.TextArea;

const App = () => {
  return (
    <Space wrap>
      <TextArea placeholder="Enter something" style={{ 'min-height': '64px', width: '350px' }} />
      <TextArea defaultValue="Disabled" style={{ 'min-height': '64px', width: '350px' }} disabled />
    </Space>
  );
};

export default App;
```
