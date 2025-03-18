---
order: 4
title:
  zh-CN: 自定义弹出内容
  en-US: Custom pop-up content
---

## zh-CN
可以通过 `customRender` 来自定义弹出内容。

## en-US
You can customize the pop-up content with 'customRender' .

```tsx
import { Dropdown, Button } from 'arco-design-solid';
import { IconDown } from 'arco-solid-icon';
import { createSignal } from 'solid-js';
const style = {
  border: '1px solid var(--color-fill-3)',
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  padding: '12px',
  'border-radius': '4px',
};
const Demo = () => {
  const [visible, setVisible] = createSignal(false);
  return (
    <div class="dropdown-demo">
      <Dropdown
        trigger="hover"
        onVisibleChange={v => {
          console.log(v);
          setVisible(v);
        }}
        popupVisible={visible()}
        customRender={
          <div
            onClick={() => {
              setVisible(false);
            }}
            style={style}
          >
            custom Render
          </div>
        }
      >
        <Button type="text">
          Hover <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
};
export default Demo;
```