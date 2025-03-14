---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

基础单选框。

## en-US

Basic usage.

```tsx
import { Radio, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space size={40}>
      <Radio>Radio</Radio>
      <Radio checked disabled>
        Disabled Radio
      </Radio>
    </Space>
  );
};

export default App;

```
