---
order: 4
title:
  zh-CN: 多点选择
  en-US: Multiple Dots
---

## zh-CN

范围内多个点选择。(`2.61.0` 支持)

## en-US

Select multiple points within the range. (in `2.61.0`)


```tsx
import { createSignal } from 'solid-js';
import { Slider, Typography } from 'arco-design-solid';

function App() {
  const [value, setValue] = createSignal([0, 20, 50]);
  return (
    <div style={{ width: 200 }}>
      <Slider range value={value()} onChange={setValue} />
      <br/>
      <Typography.Text code>value: {JSON.stringify(value)}</Typography.Text>
    </div>
  );
}

export default App;
```
