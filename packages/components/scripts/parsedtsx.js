import { transformSync } from '@babel/core';
const code = `import { Button, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  );
};

export default App;`;

const result = transformSync(code, {
  filename: "virtual-file.tsx'",
  presets: [['babel-preset-solid', { runtime: 'automatic' }], '@babel/preset-typescript'],

  ast: true,
  sourceMaps: true,
  configFile: false,
  babelrc: false,
});
console.log(result.code);
