import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins/code';
import { link } from 'fs';
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
      // {
      //   text: 'CopyClickBoard',
      //   link: '/components/CopyClickBoard',
      // },
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
export default defineConfig({
  title: 'Arco-Design-Solid',
  description: 'A UI library for solid-js',
  lang: 'en-US',
  themeConfig: {
    logo: '',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', items: components },
    ],
    langMenuLabel: 'Language',
    sidebar: {
      '/components': components,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/mjw-git/arco-design-solid' }],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh',
    },

    fr: {
      label: 'French',
      lang: 'fr', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/fr/guide', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的

      // 其余 locale 特定属性...
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
