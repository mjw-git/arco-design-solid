import { lazy } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';

const getRoutes = (t: i18n.Translator<i18n.BaseRecordDict, string>, lang: string) => {
  const suffix = lang === 'zh-CN' ? '.zh-CN' : '.en-US';
  return [
    {
      path: '/button',
      name: t('routes.button'),
      component: lazy(() => {
        return new Promise(resolve => {
          resolve(import(`../../packages/components/Button/README${suffix}.md`));
        });
      }),
    },
  ];
};
export { getRoutes };
