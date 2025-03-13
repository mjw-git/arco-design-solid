import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

// 配置marked选项，禁用HTML转义

export const importMap = new Map<string, { default: string; imports: Set<string> }>();
export const resetImportMap = () => {
  importMap.clear();
  importMap.set('solid-js', { default: '', imports: new Set(['For', 'useContext']) });
  importMap.set('arco-solid-icon', { default: '', imports: new Set(['IconCode']) });
};

// 解析单个Markdown文件
function parseJsCode(_code: string, name: string) {
  // 提取JavaScript代码块

  try {
    // 使用@babel/parser解析JavaScript代码生成AST
    const ast = parse(_code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    // 遍历AST查找import声明
    const defaultDeclaration = ast.program.body.find(
      node => node.type === 'ExportDefaultDeclaration'
    );
    const currentName = defaultDeclaration?.declaration?.loc?.identifierName;

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
            importItem!.default = specifier.local.name;
            //   return specifier.local.name;
          } else if (specifier.type === 'ImportSpecifier') {
            importItem!.imports.add(specifier.local.name);
          }
        });
      }
    });

    traverse(ast, {
      ImportDeclaration(path) {
        path.remove();
      },
      ExportDefaultDeclaration(path) {
        path.remove();
      },
      enter(path) {
        if (path.isIdentifier({ name: currentName })) {
          path.node.name = name;
        }
      },
    });
    return ast;
  } catch (error) {
    console.error(`解析JavaScript代码时出错:`, error);
  }
}

export default parseJsCode;
// parseMarkdownFile(code, 'ddd');
