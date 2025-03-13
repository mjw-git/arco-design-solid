---
order: 1
title:
  zh-CN: 其他状态
  en-US: Status
---

## zh-CN
失败、警告、成功等其他状态下操作，可出现不同样式的链接。

## en-US

There are three types of status available: `error`, `success`, `warning`.

```tsx
import { Link, Space } from 'arco-design-solid';
const Test = () => {
  return (
    <Space wrap>
      <Link status="error" href="#">
        Error
      </Link>
      <Link status="warning" href="#">
        Warning
      </Link>
      <Link status="success" href="#">
        Success
      </Link>
      <Link status="error" disabled href="#">
        Error
      </Link>
      <Link status="warning" disabled href="#">
        Warning
      </Link>
      <Link status="success" disabled href="#">
        Success
      </Link>
    </Space>
  );
};
export default Test;

```
