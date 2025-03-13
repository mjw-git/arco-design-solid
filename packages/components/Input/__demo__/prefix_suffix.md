---
order: 4
title:
  zh-CN: 前后缀
  en-US: Prefix/Suffix
---

## zh-CN

通过指定`prefix`和`suffix`来在输入框内添加前缀和后缀。

## en-US

Add a prefix(suffix) in the input box by specifying `prefix`(`suffix`).

```tsx
import { Input, Space } from 'arco-design-solid';
import { IconUser, IconSearch, IconInfoCircle } from 'arco-solid-icon';

const App = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: '350px' }} prefix={<IconUser />} placeholder="Enter something" />
        <Input
          allowClear
          style={{ width: '350px' }}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
      </Space>
      <Space wrap>
        <Input
          style={{ width: '350px' }}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
        <Input
          style={{ width: '350px' }}
          addBefore="+86"
          addAfter={<IconSearch />}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          allowClear
          placeholder="Enter something"
        />
      </Space>
    </Space>
  );
};

export default App;

```
