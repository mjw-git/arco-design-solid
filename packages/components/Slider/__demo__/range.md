---
order: 3
title:
  zh-CN: 范围选择
  en-US: Range
---

## zh-CN

设置 `range = true` 即可开启范围选择，此时 `value` 为数组。

## en-US

Set `range = true` to enable range selection, at this time `value` is an array.

```tsx
import { createSignal } from 'solid-js';
import { Slider } from 'arco-design-solid';

function App() {
  const [value, setValue] = createSignal([0, 5]);
  return (
    <div style={{ width: "200px" }}>
      <Slider showTicks max={10} range value={value()} onChange={setValue} />
    </div>
  );
}

export default App;
```
