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
            {
              level: 1,
              path: '/tag',
              key: 'tag',
              name: t('routes.tag'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Tag/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/popover',
              key: 'popover',
              name: t('routes.popover'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Popover/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/tooltip',
              key: 'tooltip',
              name: t('routes.tooltip'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Tooltip/README${suffix}.md`));
                });
              }),
            },
          ],
        },
        {
          name: t('routes.data-input'),
          key: 'data-input',
          items: [
            {
              level: 1,
              path: '/input',
              key: 'input',
              name: t('routes.input'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Input/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/input-number',
              key: 'input-number',
              name: t('routes.input-number'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/InputNumber/README${suffix}.md`));
                });
              }),
            },

            {
              level: 1,
              path: '/checkbox',
              key: 'checkbox',
              name: t('routes.checkbox'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Checkbox/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/radio',
              key: 'radio',
              name: t('routes.radio'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Radio/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/slider',
              key: 'slider',
              name: t('routes.slider'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Slider/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/switch',
              key: 'switch',
              name: t('routes.switch'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Switch/README${suffix}.md`));
                });
              }),
            },
          ],
        },
        {
          name: t('routes.feedback'),
          key: 'feedback',
          items: [
            {
              level: 1,
              path: '/message',
              key: 'message',
              name: t('routes.message'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Message/README${suffix}.md`));
                });
              }),
            },
          ],
        },
        {
          name: t('routes.nav'),
          key: 'nav',
          items: [
            {
              level: 1,
              path: '/dropdown',
              key: 'dropdown',
              name: t('routes.dropdown'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/DropDown/README${suffix}.md`));
                });
              }),
            },
          ],
        },

        {
          name: t('routes.other'),
          key: 'other',
          items: [
            {
              level: 1,
              path: '/affix',
              key: 'affix',
              name: t('routes.affix'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Affix/README${suffix}.md`));
                });
              }),
            },
            {
              level: 1,
              path: '/anchor',
              key: 'anchor',
              name: t('routes.anchor'),
              component: lazy(() => {
                return new Promise(resolve => {
                  resolve(import(`../../packages/components/Anchor/README${suffix}.md`));
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
