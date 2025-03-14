---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

这个例子展示了触发器的最基础的使用。`Trigger` 组件默认是没有弹出框的样式的。以下示例均为官网添加的样式。

## en-US

The basic usage. The popup layer has no style by default.

```tsx
import { Button, Input, Trigger } from 'arco-design-solid';
function App() {
  return (
    <>
      <div>
        <Trigger
          popup={() => <div class="demo-trigger-popup"> 11</div>}
          trigger="click"
          position="bottom"
          classNames="zoomInTop"
        >
          <Button>Click me</Button>
        </Trigger>
        <Trigger
          popup={() => <div class="demo-trigger-popup"> 11</div>}
          trigger="hover"
          position="right"
          classNames="zoomInTop"
        >
          <Button>Hover me</Button>
        </Trigger>
        <Trigger
          popup={() => <div class="demo-trigger-popup"> 11</div>}
          trigger={['hover', 'click', 'focus']}
          position="top"
          classNames="zoomInBottom"
        >
          <Input placeholder="Focus on me" />
        </Trigger>
      </div>
    </>
  );
}

export default App;

```

```css
.demo-trigger-popup {
  padding: 10px;
  width: 300px;
  text-align: center;
  background-color: var(--color-bg-popup);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
```
