import fs from 'fs';
import path, { dirname } from 'path';
import getMetaData from './parsemd';
import parseJsCode, { importMap } from './parseJsCode';
import { transformFromAstSync, transformSync } from '@babel/core';
import * as t from '@babel/types';
import generate from '@babel/generator';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const transformCode = (_path: string) => {
  const list = fs.readdirSync(_path);
  const result_list = list
    .map(item => getMetaData(path.resolve(_path, item)))
    .sort((a, b) => Number(a.result.order) - Number(b.result.order));
  const ast_list = result_list.map(item =>
    parseJsCode(item.result['js_code'], `Demo${item.result.order}`)
  );
  const demos = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('demos'),
      t.arrayExpression(
        result_list.map(item => {
          return t.objectExpression([
            t.objectProperty(t.identifier('source'), t.stringLiteral(item.result.js_code)),
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
            t.objectProperty(
              t.identifier('component'),
              t.jsxElement(
                t.jsxOpeningElement(t.jsxIdentifier(`Demo${item.result.order}`), [], true),
                null,
                []
              )
            ),
          ]);
        })
      )
    ),
  ]);

  return { ast_list, demos };
};

const transformMd = (_path: string) => {
  importMap.clear();
  const { ast_list, demos } = transformCode(_path);
  const newAst = t.program([...ast_list.map(item => item!.program.body).flat(), demos]);
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
    newAst.body.unshift(newImport);
  });
  const content = generate(newAst, {
    jsescOption: {
      minimal: true,
    },
  });
  const txt = fs.readFileSync(path.resolve(__dirname, './demo.template')).toString();
  const result = transformSync(txt.replace('%CONTENT', content?.code || ''), {
    filename: "virtual-file.tsx'",
    presets: [['babel-preset-solid', { runtime: 'automatic' }], '@babel/preset-typescript'],

    ast: true,
    sourceMaps: true,
    configFile: false,
    babelrc: false,
  });
  return result?.code;
};

export default transformMd;
