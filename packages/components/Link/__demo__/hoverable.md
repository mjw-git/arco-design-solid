---
order: 3
title:
  zh-CN: 悬浮状态样式
  en-US: Hoverable
---

## zh-CN

可以通过 `hoverable` 属性设置是否在悬浮状态时隐藏底色。

## en-US

You can use the `hoverable` property to set whether to hide the background color of the Link component when it is hovering.

```tsx
import { Link, Space } from 'arco-design-solid';
const Test = () => {
  return (
    <Space>
      <Link hoverable={false} status="error" href="#">
        Error
      </Link>
      <Link hoverable={false} status="warning" href="#">
        Warning
      </Link>
      <Link hoverable={false} status="success" href="#">
        Success
      </Link>
      <Link hoverable={false} status="error" disabled href="#">
        Error
      </Link>
      <Link hoverable={false} status="warning" disabled href="#">
        Warning
      </Link>
      <Link hoverable={false} status="success" disabled href="#">
        Success
      </Link>
    </Space>
  );
};
export default Test;

```
