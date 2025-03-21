---
order: 2
title:
  zh-CN: 位置
  en-US: Position
---

## zh-CN

`Popover` 支持 12 个不同的方位。分别为：`上左` `上` `上右` `下左` `下` `下右` `左上` `左` `左下` `右上` `右` `右下`。

## en-US

`Popover` supports 12 different positions. `top left` `top` `top right` `bottom left` `bottom` `bottom right` `top left` `left` `bottom left` `top right` `right` `bottom right`.

```tsx
import { Popover, Button } from 'arco-design-solid'
const style = {
  margin: "0px",
};

function getStyle(top, left) {
  return {
    position: 'absolute',
    width: "80px",
    top,
    left,
  };
}

const content = (
  <span>
    <p style={style}>Here is the text content</p>
    <p style={style}>Here is the text content</p>
  </span>
);

const App = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: "440px",
        height: "280px",
      }}
    >
      <Popover position="tl" title="Title" content={content}>
        <Button style={getStyle("0px", "70px")}>TL</Button>
      </Popover>
      <Popover position="top" title="Title" content={content}>
        <Button style={getStyle("0px", "180px")}>Top</Button>
      </Popover>
      <Popover position="tr" title="Title" content={content}>
        <Button style={getStyle("0px", "290px")}>TR</Button>
      </Popover>
      <Popover position="lt" title="Title" content={content}>
        <Button style={getStyle("60px", "10px")}>LT</Button>
      </Popover>
      <Popover position="left" title="Title" content={content}>
        <Button style={getStyle("120px", "10px")}>Left</Button>
      </Popover>
      <Popover position="lb" title="Title" content={content}>
        <Button style={getStyle("180px", "10px")}>LB</Button>
      </Popover>
      <Popover position="rt" title="Title" content={content}>
        <Button style={getStyle("60px", "350px")}>RT</Button>
      </Popover>
      <Popover position="right" title="Title" content={content}>
        <Button style={getStyle("120px", "350px")}>Right</Button>
      </Popover>
      <Popover position="rb" title="Title" content={content}>
        <Button style={getStyle("180px", "350px")}>RB</Button>
      </Popover>
      <Popover position="bl" title="Title" content={content}>
        <Button style={getStyle("240px", "70px")}>BL</Button>
      </Popover>
      <Popover position="bottom" title="Title" content={content}>
        <Button style={getStyle("240px", "180px")}>Bottom</Button>
      </Popover>
      <Popover position="br" title="Title" content={content}>
        <Button style={getStyle("240px", "290px")}>BR</Button>
      </Popover>
    </div>
  );
};

export default App;
```
