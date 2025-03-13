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
    {
      path: '/avatar',
      name: t('routes.avatar'),
      component: lazy(() => {
        return new Promise(resolve => {
          resolve(import(`../../packages/components/Avatar/README${suffix}.md`));
        });
      }),
    },
    {
      path: '/badge',
      name: t('routes.badge'),
      component: lazy(() => {
        return new Promise(resolve => {
          resolve(import(`../../packages/components/Badge/README${suffix}.md`));
        });
      }),
    },
  ];
};
export { getRoutes };
