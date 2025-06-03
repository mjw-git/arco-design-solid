---
order: 2
title:
  zh-CN: 设置步长
  en-US: Step
---

## zh-CN

传入 `step` 设置步长。 默认步长为 1。建议设置值能够被 `max-min` 整除，否则会出现可选最大值小于 `max` 的情况。当设置 `showTicks` 为 `true` 的时候，可显示 step 的刻度线。

## en-US

Pass in `step` to set the step size. The default step size is 1. It is recommended that the setting value can be divisible by `max-min`, otherwise the maximum value that can be selected is less than `max`. When `showTicks` is set to `true`, the ticks of step can be displayed.

```tsx
import { createSignal } from 'solid-js';
import { Slider, InputNumber, Switch, Typography, Space } from 'arco-design-solid';

function App() {
  const [step, setStep] = createSignal(1);
  const [showTicks, setShowTicks] = createSignal(true);
  return (
    <div style={{ maxWidth: '40%', minWidth: '20%' }}>
      <Space style={{ "margin-bottom": "20px", "line-height": '32px' }} size={20}>
        <div>
          <Typography.Text style={{ margin: '0 4px' }}>step</Typography.Text>
          <InputNumber
            value={step()}
            min={1}
            max={10}
            onChange={setStep}
            style={{ width: "68px" }}
          />
        </div>
        <div>
          <Typography.Text style={{ margin: '0 4px'}}>showTicks</Typography.Text>
          <Switch checked={showTicks()} onChange={setShowTicks} />
        </div>
      </Space>
      <div>
        <Typography.Text>0</Typography.Text>
        <Slider
          defaultValue={5}
          max={10}
          step={step()}
          showTicks={showTicks()}
          style={{
            width: "258px",
            "margin-left":"8px",
            "margin-right": "8px",
            "vertical-align": 'middle',
          }}
        />
        <Typography.Text>10</Typography.Text>
      </div>
    </div>
  );
}

export default App;
```
