# arco-design-solid

soldier是一款基于solid-js的组件丰富和完善的UI组件库

## 快速开始

推荐使用pnpm安装

```bash
pnpm install arco-design-solid
```

## 按需加载

arco-design-solid 默认支持基于 ES modules 的 tree shaking，直接引入 import { Button } from 'arco-design-solid'; 就会有按需加载的效果。

## 第一个例子

```js
import { Button, Space } from 'arco-design-solid';

const Test = () => {
  return (
    <Space>
      <Button>Primary Button</Button>
      <Button type="danger">Danger Button</Button>
      <Button type="ghost">Ghost Button</Button>
    </Space>
  );
};
export default Test;
```
