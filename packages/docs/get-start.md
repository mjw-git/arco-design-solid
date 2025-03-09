# arco-design-solid

arco-design-solid is a comprehensive UI component library based on solid-js with rich and well-designed components

## Quick Start

Recommended installation using pnpm

```bash
pnpm install arco-design-solid
```

## On-demand Loading

arco-design-solid natively supports tree shaking based on ES modules. Simply import components directly like `import { Button } from 'arco-design-solid';` to enable on-demand loading.

## Example

```js
import { Button, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space>
      <Button>Primary Button</Button>
      <Button type="danger">Danger Button</Button>
      <Button type="ghost">Ghost Button</Button>
    </Space>
  );
};
export default App;
```
