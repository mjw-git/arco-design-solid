import type { Plugin } from 'vite';
import { dirname, resolve } from 'path';
import transformMd from './scripts/transformMd';
export default function viteDemoPlugin(): Plugin {
  return {
    enforce: 'pre',
    name: 'vite-demo-plugin',

    async load(id) {
      if (id.endsWith('md')) {
        return transformMd(resolve(dirname(id), '__demo__'));
      }
      return null;
    },
    // onload()
  };
}
