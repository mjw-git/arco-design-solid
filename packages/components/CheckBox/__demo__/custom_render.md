---
order: 6
title:
  zh-CN: 自定义节点内容
  en-US: Custom Render Checkbox
---

## zh-CN

可以通过传入函数类型的 `children` 来自定义渲染节点内容。


## en-US

Render nodes can be customized by passing a function of type 'children'。.

```tsx
import { Checkbox, Space, Typography } from 'arco-design-solid';
import { createSignal } from 'solid-js';
const App = () => {
  const [value, setValue] = createSignal([1, 2]);
  return (
    <div>
      <Checkbox.Group value={value()} onChange={e => setValue(e)}>
        {[1, 2].map(item => {
          return (
            <Checkbox value={item}>
              {({ checked }) => {
                return (
                  <Space
                    align="start"
                    class={`custom-checkbox-card ${checked() ? 'custom-checkbox-card-checked' : ''}`}
                  >
                    <div class="custom-checkbox-card-mask">
                      <div class="custom-checkbox-card-mask-dot"></div>
                    </div>
                    <div>
                      <div class="custom-checkbox-card-title">Checkbox Card {item}</div>
                      <Typography.Text type="secondary">this is a text</Typography.Text>
                    </div>
                  </Space>
                );
              }}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    </div>
  );
};

export default App;

```

```css

input[type='checkbox']:focus-visible + .arco-tag {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}

input[type='checkbox']:focus-visible + .custom-checkbox-card {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}

.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked  .custom-checkbox-card-mask{
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
```
