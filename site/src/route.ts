import { lazy } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
const getRoutes = (t: i18n.Translator<i18n.BaseRecordDict, string>, lang: string) => {
  const suffix = lang === 'zh-CN' ? '.zh-CN' : '.en-US';
  return [
    {
      name: t('routes.components'),
      key: 'components',
      items: [
        {
          name: t('routes.general'),
          key: 'general',
          level: 1,
          items: [
            {
              level: 1,
              path: '/button',
              key: 'button',
              name: t('routes.button'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Button/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/link',
              key: 'link',
              name: t('routes.link'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Link/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/typography',
              key: 'typography',
              name: t('routes.typography'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Typography/README${suffix}.md`));
                });
              }),
            },
          ],
        },
        {
          name: t('routes._layout'),
          key: 'layout',
          items: [
            {
              level: 1,
              path: '/divider',
              key: 'divider',
              name: t('routes.divider'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Divider/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/grid',
              key: 'grid',
              name: t('routes.grid'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Grid/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/space',
              key: 'space',
              name: t('routes.space'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Space/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/layout',
              key: 'layout',
              name: t('routes.layout'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Layout/README${suffix}.md`));
                });
              }),
            },
          ],
        },
        {
          name: t('routes.data-show'),
          key: 'data-show',
          items: [
            {
              level: 1,
              path: '/avatar',
              key: 'avatar',
              name: t('routes.avatar'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Avatar/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/badge',
              key: 'badge',
              name: t('routes.badge'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Badge/README${suffix}.md`));
                });
              }),
            },
          ],
        },
      ],
    },
  ];
};
export { getRoutes };
