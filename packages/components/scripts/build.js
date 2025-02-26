import { rollup, watch } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import chokidar from 'chokidar';
import babel from '@rollup/plugin-babel';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import less from 'less';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import glob from 'fast-glob';
const defaultEsLessPath = path.resolve(__dirname, '../es/style/index.css');
const defaultCjsLessPath = path.resolve(__dirname, '../lib/style/index.css');
const defaultLessPath = path.resolve(__dirname, '../style/index.less');
const contentMap = new Map();
const lessTsPaths = glob.sync(path.resolve(__dirname, '../*/style/index.ts'), {
  ignore: [
    path.resolve(__dirname, '../es/style/index.ts'),
    path.resolve(__dirname, '../lib/style/index.ts'),
  ],
});
const lessPaths = glob.sync(path.resolve(__dirname, '../*/style/index.less'), {
  ignore: [
    path.resolve(__dirname, '../es/style/index.less'),
    path.resolve(__dirname, '../lib/style/index.less'),
  ],
});
const type = process.argv[2] || 'es';
const mode = process.argv[3] || 'dev';
// return;
async function buildEs() {
  if (mode === 'dev') {
    const watcher = watch({
      input: path.resolve(__dirname, '../index.ts'),
      external: ['solid-js', 'solid-js/web', 'arco-solid-icon', 'classnames', 'copy-to-clipboard'],
      plugins: [
        del({
          targets: [path.resolve(__dirname, '../es')],
          hook: 'buildStart',
        }),
        resolve({
          extensions: ['.ts', '.tsx'],
        }),
        typescript({
          tsconfig: './tsconfig.json',
          declaration: true,

          declarationDir: './es',
          jsx: 'preserve',
          compilerOptions: {
            noUnusedParameters: false,
            noUnusedLocals: false,
            noUnusedParameters: false,
            noEmit: false,
            emitDeclarationOnly: true,
            allowImportingTsExtensions: false,
          },
        }),
        babel({
          babelHelpers: 'bundled',
          extensions: ['.ts', '.tsx'],
          presets: ['solid'],
        }),
      ],
      output: [
        {
          dir: 'es',
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: '.',
          exports: 'named',
        },
      ],
      watch: {
        include: ['../**/*.{ts,tsx}'],
        exclude: ['../node_modules/**', '../lib/**', '../es/**', '../dist/**'],
      },
    });
    watcher.on('restart', () => {
      console.log('重新构建...');
    });
    watcher.on('event', e => {
      if (e.code === 'END') {
        buildStyle({ type: 'es' });
      }
    });
    return;
  }

  await fs.remove(path.resolve(__dirname, '../es'));

  const bundle = await rollup({
    input: path.resolve(__dirname, '../index.ts'),
    external: ['solid-js', 'solid-js/web', 'arco-solid-icon', 'classnames', 'copy-to-clipboard'],
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx'],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,

        jsx: 'preserve',
        compilerOptions: {
          outDir: './es',
          noUnusedLocals: false,
          noUnusedParameters: false,
          noEmit: true,
          emitDeclarationOnly: true,
          allowImportingTsExtensions: false,
        },
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.ts', '.tsx'],
        presets: ['solid'],
      }),
    ],
  });

  // ES Module 输出
  await bundle.write({
    dir: 'es',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: '.',
    exports: 'named',
  });

  await bundle.close();
}
async function buildCjs() {
  await fs.remove(path.resolve(__dirname, '../lib'));
  await fs.remove(path.resolve(__dirname, '../es'));

  const bundle = await rollup({
    input: [path.resolve(__dirname, '../index.ts')],
    external: [
      'solid-js',
      'solid-js/web',
      'arco-solid-icon',
      'classnames',
      'copy-to-clipboard',
      /.*\.less/,
    ],

    plugins: [
      resolve({
        extensions: ['.ts', '.tsx'],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './lib',
        jsx: 'preserve',
        compilerOptions: {
          noUnusedParameters: false,
          noUnusedLocals: false,
          noUnusedParameters: false,
          noEmit: true,
          emitDeclarationOnly: true,
          allowImportingTsExtensions: false,
        },
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.ts', '.tsx'],
        presets: ['solid'],
      }),
    ],
    watch: {
      include: ['../**/*.{ts,tsx,less}'],
      exclude: ['../node_modules/**', '../lib/**', '../es/**', '../dist/**'],
    },
  });

  await bundle.write({
    dir: 'lib',

    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: '.',
    exports: 'named',
  });

  await bundle.close();
}
async function buildStyle(params) {
  const { type = 'es' } = params || {};

  async function compileDefaultLess() {
    const defaultContent = await fs.readFile(defaultLessPath, 'utf-8');
    const { css: defaultCss } = await less.render(defaultContent, {
      filename: defaultLessPath,
    });
    const defaultLessDistPath = type === 'es' ? defaultEsLessPath : defaultCjsLessPath;
    // 确保目标目录存在
    await fs.ensureDir(path.dirname(defaultLessDistPath));

    await fs.writeFile(defaultLessDistPath, defaultCss);
    await fs.copy(defaultLessDistPath, defaultLessDistPath.replace('.css', '.less'));
  }
  async function compileLess(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const { css } = await less.render(content, {
        filename: filePath,
        javascriptEnabled: true,
      });

      // 确保目标目录存在
      const esPath = filePath
        .replace('components', `components/${type === 'es' ? 'es' : 'lib'}`)
        .replace('.less', '.css');

      const lessPath = filePath.replace('components', `components/${type === 'es' ? 'es' : 'lib'}`);
      await fs.ensureDir(path.dirname(esPath));
      //   await fs.ensureDir(path.dirname(libPath));

      // 写入编译后的 CSS
      await fs.writeFile(esPath, css);
      //   await fs.writeFile(libPath, css);

      // 复制原始 less 文件
      await fs.copy(filePath, lessPath);
      return content;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }
  async function copyStyleTs() {
    await Promise.all(
      lessTsPaths.map(async item => {
        const esPath = item
          .replace('components', `components/${type === 'es' ? 'es' : 'lib'}`)
          .replace('.ts', '.js');

        await fs.copy(item, esPath);
      })
    );
  }
  async function mergeLess(lessContent) {
    await fs.remove(path.resolve(__dirname, '../dist'));
    await fs.mkdirp(path.resolve(__dirname, '../dist'));
    const defaultLess = await fs.readFile(defaultLessPath, 'utf-8');
    const mergedContent = `${defaultLess}\n${lessContent}`;

    // return;
    const { css } = await less.render(mergedContent, {
      filename: defaultLessPath,
    });
    // 写入合并后的 CSS
    await fs.writeFile(path.resolve(__dirname, '../dist/index.css'), css);
    // await fs.writeFile(defaultCjsLessPath, css);
    // await fs.writeFile(defaultEsLessPath, css);
  }

  // 并行处理所有 less 文件
  if (type === 'es') await copyStyleTs();
  const mergeList = await Promise.all(lessPaths.map(compileLess));
  await compileDefaultLess();
  if (type === 'es') await mergeLess(mergeList.join('\n'));
}
function watchLess() {
  chokidar.watch(lessPaths).on('change', async filePath => {
    console.log('less change', filePath);
    await buildStyle({ type: 'es' });
  });
}
async function build() {
  try {
    if (mode !== 'dev' && type === 'cjs') {
      await buildCjs();
    }

    await buildEs();
    if (mode !== 'dev') {
      await buildStyle({ type: 'es' });
      await buildStyle({ type: 'cjs' });
    }
  } catch (error) {
    console.log(error);
  }
}

build();
