---
order: 5
title:
  zh-CN: 添加标签文本
  en-US: Marks
---

## zh-CN

可以通过传入 `marks` 添加标签文本。

## en-US

You can add mark by passing in `marks`.

```tsx
import { Slider } from 'arco-design-solid';
import { IconClockCircle } from 'arco-solid-icon';

const App=()=>{
    return  <div style={{ width: 240 }}>
        <Slider
          defaultValue={5}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
          style={{ "margin-bottom": "80px" }}
        />
        <Slider
          onlyMarkValue
          defaultValue={10}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
        />
      </div>
}
export default App

```
