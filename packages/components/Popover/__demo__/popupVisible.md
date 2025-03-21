---
order: 3
title:
  zh-CN: 浮层内关闭
  en-US: Manual close
---

## zh-CN

控制浮层显示。更多示例可查看 [Trigger](/react/components/trigger)组件。

## en-US

Manual close popover.

```tsx
import {createSignal} from 'solid-js';
import { Popover, Button, Link,Space } from 'arco-design-solid'

const style = {
  margin: "0px",
};

function App() {
  const [visible, setVisible] = createSignal(false);
  const [visible2, setVisible2] = createSignal(false);
  return (
    <Space size={40}>
      <Popover
        title="Title"
        popupVisible={visible()}
        onVisibleChange={setVisible}
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
            <p style={{ ...style, "text-align": 'right', "margin-top": "4px" }}>
              <Link onClick={() => setVisible(false)}>Close</Link>
            </p>
          </span>
        }
      >
        <Button type="primary">
          Hover
        </Button>
      </Popover>
      <Popover
        title="Title"
        popupVisible={visible2()} // button 触发 mouseenter的时候会调用该方法。更多的用法可以查看Trigger组件。
        onVisibleChange={(visible) => {
          if (visible) {
            setVisible2(true);
          }
        }}
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
            <p style={{ ...style, "text-align": 'right', "margin-top": "4px" }}>
              <Link onClick={() => setVisible2(false)}>Close</Link>
            </p>
          </span>
        }
      >
        <Button type="primary">Will not close when moved out</Button>
      </Popover>
    </Space>
  );
}

export default App;
```
