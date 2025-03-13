---
order: 2
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN
通过 `Icon` 属性设置带图标的链接，设置为 `true`时候显示默认图标。

## en-US

Customize icon node. If true, the default icon will be displayed.

```tsx
import { Link, Space } from 'arco-design-solid';
import { IconCode } from 'arco-solid-icon';
const Test = () => {
  return (
    <Space>
      <Link icon href="#">
        Hyperlinks
      </Link>
      <Link href="#" icon disabled>
        Hyperlinks
      </Link>
      <Link href="#" icon={<IconCode />}>
        Hyperlinks
      </Link>
    </Space>
  );
};
export default Test;

```
