---
order: 3
title:
  zh-CN: 前置、后置标签
  en-US: Front/Post Label
---

## zh-CN

指定`addBefore`和`addAfter`在输入框前后添加元素。

## en-US

Specify `addBefore`/`addAfter` to add elements before/after the input box.

```tsx
import { Input, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: '350px' }} addAfter="RMB" placeholder="Enter amount" />
        <Input style={{ width: '350px' }} addBefore="+86" placeholder="Enter phone number" />
      </Space>
      <Space wrap>
        <Input
          style={{ width: '350px' }}
          addBefore="www."
          addAfter=".com"
          placeholder="Enter host"
        />
      </Space>
    </Space>
  );
};

export default App;


```
