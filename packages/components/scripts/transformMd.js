import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import getMetaData from './parsemd.js';
import generate from '@babel/generator';
import parseJsCode, { importMap } from './parseJsCode.js';
import { transformFromAstSync } from '@babel/core';
import * as t from '@babel/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testPath = path.resolve(__dirname, '../Button/__demo__');
const transformCode = () => {
  const list = fs.readdirSync(testPath);
  //   function parse(path) {
  //     getMetaData(path);
  //   }
  const result_list = list
    .map(item => getMetaData(path.resolve(testPath, item)))
    .sort((a, b) => Number(a.result.order) - Number(b.result.order));
  const ast_list = result_list.map(item =>
    parseJsCode(item.result['js_code'], `Demo${item.result.order}`)
  );
  const source_ast_list = [];
  const demos = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('demos'),
      t.arrayExpression(
        result_list.map(item => {
          return t.objectExpression([
            t.objectProperty(t.identifier('source'), t.stringLiteral(item.result.js_code)),
            t.objectProperty(
              t.identifier('component'),
              t.jsxElement(
                t.jsxOpeningElement(t.jsxIdentifier(`Demo${item.result.order}`), [], true),
                null,
                []
              )
            ),
            t.objectProperty(
              t.identifier(`"zh-CN_title"`),
              t.stringLiteral(item.result['zh-CN_title'])
            ),
            t.objectProperty(
              t.identifier(`"zh-CN_desc"`),
              t.stringLiteral(`${item.result?.['zh-CN_desc'] || ''}`)
            ),
            t.objectProperty(
              t.identifier(`"en-US_desc"`),
              t.stringLiteral(`${item.result?.['en-US_desc'] || ''}`)
            ),
            t.objectProperty(
              t.identifier(`"en-US_title"`),
              t.stringLiteral(item.result['en-US_title'])
            ),
          ]);
        })
      )
    ),
  ]);
  result_list.forEach((item, index) => {
    const sourceAst = t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(`Demo${index}_Source`),
        t.identifier(`\`${item.result.js_code}\``)
      ),
    ]);
    source_ast_list.push(sourceAst);
  });

  return { ast_list, source_ast_list, demos };
};
const { ast_list, source_ast_list, demos } = transformCode();
// ast_list.forEach(item => {
//   console.log(transformFromAstSync(item));
// });
const newAst = t.program([...ast_list.map(item => item.program.body).flat(), demos]);
// ast_list.forEach((item, index) => {
//   const sourceAst = t.variableDeclaration('const', [
//     t.variableDeclarator(t.identifier(`Demo${index}`), t.identifier()),
//   ]);
// });

importMap.forEach((value, key) => {
  const imports = Array.from(value.imports);
  const _default = value.default;

  const specifiers = [];
  if (_default) {
    specifiers.push(t.importDefaultSpecifier(t.identifier(_default)));
  }

  imports.forEach(imp => {
    specifiers.push(t.importSpecifier(t.identifier(imp), t.identifier(imp)));
  });

  const newImport = t.importDeclaration(specifiers, t.stringLiteral(key));
  //   const newImport = t.importDeclaration(specifiers, t.stringLiteral(key));
  newAst.body.unshift(newImport);
});
const result = generate.default(newAst, {
  jsescOption: {
    minimal: true,
  },
});
console.log(result.code);
const res = fs.readFileSync('./demo.template').toString();
// console.log(ast_list, importMap, result);
fs.writeFileSync('./result.tsx', res.replace('%CONTENT', result.code));
