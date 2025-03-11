import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins/code';
import fs from 'fs';
// https://vitepress.dev/reference/site-config
const components = [
  {
    text: 'Basic',
    collapsed: false,
    items: [
      { text: 'Icon', link: '/components/Icon' },
      {
        text: 'Button',
        link: '/components/Button',
      },
      {
        text: 'Link',
        link: '/components/Link',
      },
      {
        text: 'Typography',
        link: '/components/Typography',
      },
    ],
  },
  {
    text: 'Layout',
    collapsed: false,
    items: [
      {
        text: 'Divider',
        link: '/components/Divider',
      },
      {
        text: 'Grid',
        link: '/components/Grid',
      },

      {
        text: 'Layout',
        link: '/components/Layout',
      },
      {
        text: 'Space',
        link: '/components/Space',
      },

      {
        text: 'VirtualList',
        link: '/components/VirtualList',
      },
    ],
  },
  {
    text: 'Data Display',
    collapsed: false,
    items: [
      {
        text: 'Avatar',
        link: '/components/Avatar',
      },
      {
        text: 'Badge',
        link: '/components/Badge',
      },
      { text: 'Tag', link: '/components/Tag' },
    ],
  },
  {
    text: 'Data Entry',
    collapsed: false,
    items: [
      { text: 'Checkbox', link: '/components/Checkbox' },
      {
        text: 'Input',
        link: '/components/Input',
      },
      {
        text: 'Switch',
        link: '/components/Switch',
      },
      {
        text: 'Radio',
        link: '/components/Radio',
      },
    ],
  },
  {
    text: 'Other',
    collapsed: false,
    items: [{ text: 'Trigger', link: '/components/Trigger' }],
  },
  // {
  //   text: 'FeedBack',
  //   collapsed: false,
  //   items: [
  //     {
  //       text: 'Message',
  //       link: '/components/Message',
  //     },
  //   ],
  // },

  // {
  //   text: 'Data Entry',
  //   collapsed: false,
  //   items: [
  //     {
  //       text: 'Input',
  //       link: '/components/Input',
  //     },
  //     {
  //       text: 'CheckBox',
  //       link: '/components/CheckBox',
  //     },
  //     {
  //       text: 'Radio',
  //       link: '/components/Radio',
  //     },
  //     { text: 'Select', link: '/components/Select' },
  //   ],
  // },
  // {
  //   text: 'Data Display',
  //   collapsed: false,
  //   items: [
  //     {
  //       text: 'Empty',
  //       link: '/components/Empty',
  //     },
  //   ],
  // },
];

const zhComponents = components.map(category => {
  return {
    ...category,
    items: category.items.map(item => ({
      ...item,
      link: item.link ? `/zh${item.link}` : item.link,
    })),
  };
});

export default defineConfig({
  title: 'Arco-Design-Solid',
  description: 'A UI library for solid-js',
  lang: 'en-US',
  themeConfig: {
    logo: '/arco.svg',
  },
  locales: {
    root: {
      themeConfig: {
        logo: '/arco.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Components', items: components },
        ],
        sidebar: {
          '/components': components,
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/mjw-git/arco-design-solid' }],
      },
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh',
      themeConfig: {
        logo: '/arco.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: 'Home', link: '/zh' },
          { text: 'Components', items: zhComponents },
        ],
        sidebar: {
          '/zh/components': zhComponents,
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/mjw-git/arco-design-solid' }],
      },
    },
  },
  markdown: {
    config: md => {
      applyPlugins(md);
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
});
