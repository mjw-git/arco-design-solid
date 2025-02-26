import { parse } from 'svg-parser';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path, { basename } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const template = readFileSync('./icon.ts.template', 'utf-8');
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function processSvg(svgPath) {
  // 读取 SVG 文件
  const svg = readFileSync(svgPath, 'utf-8');

  // 解析 SVG 为 AST
  const ast = parse(svg);

  // 获取根节点
  const svgNode = ast.children[0];

  // 删除 width 和 height 属性
  if (svgNode.properties) {
    delete svgNode.properties.width;
    delete svgNode.properties.height;

    // 添加 class 属性
    const fileName = basename(svgPath, '.svg');
    svgNode.properties.class = `arco-icon arco-icon-${fileName}`;
  }

  // 将处理后的 AST 转换回 SVG 字符串
  const processedSvg = stringifyAst(ast.children);
  console.log(processedSvg);

  // 生成 Icon 组件
  const fileName = basename(svgPath, '.svg');
  const componentName = `Icon${capitalize(fileName)}`;

  const iconContent = template
    .replace(/<% ICON_IDENTIFIER %>/g, componentName)
    .replace(/<% ICON_JSON %>/g, processedSvg);

  // 写入文件
  writeFileSync(`./${componentName}.tsx`, iconContent);
}

// 辅助函数：将 AST 转换回字符串
function stringifyAst(ast) {
  // if (!ast.children) return '';

  return `${ast
    .map(child => {
      const props = child.properties
        ? Object.entries(child.properties)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')
        : '';

      return `<${child.tagName} ${props}>${stringifyAst(child.children)}</${child.tagName}>`;
    })
    .join('')}`;
}

// 辅助函数：首字母大写
function getOutlineIconPaths() {
  const outlinePath = path.resolve(__dirname, `./outline`);
  const files = readdirSync(outlinePath);
  return files.filter(file => file.endsWith('.svg')).map(file => `${outlinePath}/${file}`);
}

// Update the usage example to process all icons
const iconPaths = getOutlineIconPaths();
iconPaths.forEach(path => processSvg(path));
