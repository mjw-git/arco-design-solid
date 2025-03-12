import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from '@babel/parser';

const __filename = fileURLToPath(import.meta.url);

// 配置marked选项，禁用HTML转义

const importMap = new Map();
const code = `import cc, { Button, Space } from 'arco-design-solid';

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
// 存储所有找到的import语句
const allImports = new Set();

// 解析单个Markdown文件
function parseMarkdownFile(_code) {
  // 提取JavaScript代码块

  try {
    // 使用@babel/parser解析JavaScript代码生成AST
    const ast = parse(_code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    // 遍历AST查找import声明
    ast.program.body.forEach(node => {
      if (node.type === 'ImportDeclaration') {
        // 将import语句转换为字符串
        const importSource = node.source.value;
        // let importItem = importMap.has(importSource) ? importMap.get(importSource) : undefined;
        if (!importMap.has(importSource)) {
          importMap.set(importSource, { imports: new Set(), default: '' });
        }
        const importItem = importMap.get(importSource);
        // console.log(node.specifiers, '=');
        node.specifiers.forEach(specifier => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            importItem.default = specifier.local.name;
            //   return specifier.local.name;
          } else if (specifier.type === 'ImportSpecifier') {
            importItem.imports.add(specifier.local.name);
          }
        });
      }
      //删除import
    });
  } catch (error) {
    console.error(`解析文件中的JavaScript代码时出错:`, error);
  }
}
parseMarkdownFile(code);
let str = '';
importMap.forEach((value, key) => {
  const imports = Array.from(value.imports);
  const _default = value.default;
  str =
    str +
    `import ${_default ? `${_default},` : ''} ${imports.length === 0 ? '' : `{ ${imports.join(', ')}}`} from ${key}`;
});
console.log(str);
// 查找所有组件目录下的__demo__目录中的Markdown文件
