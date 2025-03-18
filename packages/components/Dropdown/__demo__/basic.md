---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基础下拉菜单。

## en-US

Basic usage of Dropdown.

```tsx
import { Menu, Dropdown, Button } from 'arco-design-solid';
import { IconDown } from 'arco-solid-icon';

const Demo = () => {
  return (
    <div class='dropdown-demo'>
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
        position="bl"
      >
        <Button type="text">
          Hover Me<IconDown />
        </Button>
      </Dropdown>
       <Dropdown
       disabled={true}
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
        position="bl"
      >
        <Button  disabled={true} type="text">
          Hover <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
};
export default Demo;
```

```css
.dropdown-demo > .arco-btn {
  padding: 0 8px;
  font-weight: normal;
}

.dropdown-demo .arco-dropdown-popup-visible .arco-icon-down {
  transform: rotate(180deg);
}
```
