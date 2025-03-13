---
order: 4
title:
  zh-CN: 按钮状态
  en-US: Status
---

## zh-CN

按钮状态分为 警告，危险，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型。

## en-US

Buttons can be in `warning`, `danger`, and `success` status. Status can co-exist with `type` but with higher priority.

```tsx
import { Button, Space } from 'arco-design-solid';

const Test = () => {
  return (
    <Space align="center" wrap>
      <Button status="warning" type="primary">
        Warning
      </Button>
      <Button status="success" type="primary">
        Success
      </Button>
      <Button status="danger" type="primary">
        Danger
      </Button>
      <Button status="warning" type="secondary">
        Warning
      </Button>
      <Button status="success" type="secondary">
        Success
      </Button>
      <Button status="danger" type="secondary">
        Danger
      </Button>
      <Button status="warning" type="outline">
        Warning
      </Button>
      <Button status="success" type="outline">
        Warning
      </Button>
      <Button status="danger" type="outline">
        Danger
      </Button>
      <Button status="warning" type="text">
        Warning
      </Button>
      <Button status="success" type="text">
        Success
      </Button>
      <Button status="danger" type="text">
        Danger
      </Button>
      <Button status="warning" type="dashed">
        Warning
      </Button>
      <Button status="success" type="dashed">
        Success
      </Button>
      <Button status="danger" type="dashed">
        Danger
      </Button>
    </Space>
  );
};
export default Test;
```
