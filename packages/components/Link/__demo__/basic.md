---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

与按钮相比，链接不太突出，因此通常将其用作可选操作。

## en-US

A link text.

```tsx
import { Link, Space } from 'arco-design-solid';
const Test = () => {
  return (
    <Space>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </Space>
  );
};
export default Test;

```
