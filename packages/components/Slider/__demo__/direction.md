---
order: 7
title:
  zh-CN: 竖直滑动条
  en-US: Vertical
---

## zh-CN

设置 `vertical` 为 `true`，将会显示竖直的滑动条

## en-US

Display vertical slider by setting `vertical={true}`.

```tsx
import { createSignal } from 'solid-js';
import { Slider, Space } from 'arco-design-solid';
import { IconSound, IconMute } from 'arco-solid-icon';

function App() {
  const [value, setValue] = createSignal(10);
  return (
    <Space style={{ "max-width": '60%', "min-width": '20%' }} size={100}>
      <div
        style={{
          width: "22px",
          "text-align": 'center',
          display: 'inline-block',
        }}
      >
        <Slider value={value()} onChange={setValue} vertical />
        {value() ? <IconSound style={{ "font-size": "16px", color: 'var(--color-text-1)' }} /> : null}
        {!value() ? <IconMute style={{ "font-size": "16px", color: 'var(--color-text-1)' }} /> : null}
      </div>
      <Slider
        range
        max={20}
        vertical
        defaultValue={[5, 10]}

        style={{ "vertical-align": 'top' }}
      />
    </Space>
  );
}

export default App;
```
