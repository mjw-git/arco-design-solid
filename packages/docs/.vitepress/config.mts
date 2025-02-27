import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins/code';
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
      {
        text: 'CopyClickBoard',
        link: '/components/CopyClickBoard',
      },
    ],
  },
  {
    text: 'FeedBack',
    collapsed: false,
    items: [
      {
        text: 'Message',
        link: '/components/Message',
      },
    ],
  },
  {
    text: 'Layout',
    collapsed: false,
    items: [
      {
        text: 'Grid',
        link: '/components/Grid',
      },
      {
        text: 'FlexBox',
        link: '/components/FlexBox',
      },
      {
        text: 'VirtualList',
        link: '/components/VirtualList',
      },
    ],
  },
  {
    text: 'Data Entry',
    collapsed: false,
    items: [
      {
        text: 'Input',
        link: '/components/Input',
      },
      {
        text: 'CheckBox',
        link: '/components/CheckBox',
      },
      {
        text: 'Radio',
        link: '/components/Radio',
      },
      { text: 'Select', link: '/components/Select' },
    ],
  },
  {
    text: 'Data Display',
    collapsed: false,
    items: [
      {
        text: 'Empty',
        link: '/components/Empty',
      },
    ],
  },
];
export default defineConfig({
  title: 'Arco-Design-Solid',
  description: 'A UI library for solid-js',

  themeConfig: {
    logo: '',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', items: components },
    ],

    sidebar: {
      '/components': components,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
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
