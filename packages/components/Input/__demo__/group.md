---
order: 6
title:
  zh-CN: 输入框组合
  en-US: Input Group
---

## zh-CN

通过鼠标或键盘输入内容。

## en-US

Input content via mouse or keyboard.

```tsx
import { Input, Grid } from 'arco-design-solid';
import { IconMinus } from 'arco-solid-icon';

const App = () => {
  return (
    <div>
      <Grid.Row>
        <div
          style={{
            'margin-right': '24px',
            width: '360px',
            display: 'inline-block',
            'margin-bottom': '24px',
          }}
        >
          <Input.Group>
            <Input style={{ width: '24%', 'margin-right': '8px' }} value="010" readOnly />
            <Input style={{ width: '60%' }} placeholder="Phone number" />
          </Input.Group>
        </div>
        <div
          style={{
            'margin-right': '24px',
            width: '360px',
            display: 'inline-block',
            'margin-bottom': '24px',
          }}
        >
          <Input.Group>
            <Input style={{ width: '24%', 'margin-right': '8px' }} value="010" readOnly />
            <IconMinus style={{ color: 'var(--color-text-1)' }} />
            <Input
              style={{ width: '60%', 'margin-left': '8px' }}
              defaultValue="8899887"
              placeholder="Phone number"
            />
          </Input.Group>
        </div>
      </Grid.Row>
    </div>
  );
};

export default App;
```
