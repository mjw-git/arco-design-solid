---
order: 1
title:
  zh-CN: 弹出方向
  en-US: Position of popup
---

## zh-CN

通过 `position` 支持指定 6 种弹出方位，分别是：`top: 向上`, `tl: 左上`, `tr: 右上`, `bottom: 下方`, `bl: 左下(默认)`, `br: 右下`。

## en-US

Six popup `position` are available: `top`, `tl: top-left`, `tr: top-right`, `bottom`, `bl: bottom-left` (default), `br: bottom-right`。

```tsx
import { For } from 'solid-js'
import { Menu, Dropdown, Button } from 'arco-design-solid';
import { IconDown } from 'arco-solid-icon';
const positions = ['bl', 'bottom', 'br', 'tl', 'top', 'tr'];
const Demo = () => {
  return (
    <div class="dropdown-demo">
      <For each={positions}>
        {item => {
          return (
            <Dropdown
              items={[
                {
                  label: 'Item 1',
                  key: '1',

                  onClick: () => {
                    console.log(9999);
                  },
                },
                {
                  label: 'Item 2',
                  key: '2',
                  disabled: true,
                  onClick: () => {
                    console.log(9999);
                  },
                },
              ]}
              position={item}
            >
              <Button type="text">
                Hover Me<IconDown />
              </Button>
            </Dropdown>
          );
        }}
      </For>
    </div>
  );
};
export default Demo
```