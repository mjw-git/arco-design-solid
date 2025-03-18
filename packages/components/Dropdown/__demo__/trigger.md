---
order: 3
title:
  zh-CN: 触发方式
  en-US: Trigger mode
---


## zh-CN

通过 `trigger` 指定触发方式。

## en-US

Specify the trigger mode by `trigger`.

```tsx
const Demo = () => {
  return (
    <div class="dropdown-demo">
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
      >
        <Button type="text">
          Hover <IconDown />
        </Button>
      </Dropdown>
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
        trigger="click"
      >
        <Button type="text">
          Click <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
};
export default Demo;
```
