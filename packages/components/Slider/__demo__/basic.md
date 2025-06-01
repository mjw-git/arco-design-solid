---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基本用法展示。

## en-US

Basic usage of Slider.

```tsx
import { Slider } from 'arco-design-solid';
import { createSignal } from 'solid-js';
function App() {
  const [value,setValue]=createSignal(0);
  return <Slider value={value()} onChange={setValue}  style={{ width: 200 }} />;
}

export default App;
```
