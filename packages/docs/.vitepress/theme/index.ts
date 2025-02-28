import theme from 'vitepress/theme';
import './custom.css';
import './arco.css';

// import 'arco-design-solid/es/style/index.css';

import { highlight } from '../components/highlight';
import DemoBlock from '../components/demo-block';
import IconDemo from '../components/icon-demo';

import { setupThemeWatcher } from './utils/theme';
// import { onMounted } from 'vue'
export default {
  Layout: theme.Layout,
  // ...theme.enhanceApp,
  setup() {
    setupThemeWatcher();
  },
  enhanceApp({ app }) {
    app.component('Demo', DemoBlock);
    app.component('IconDemo', IconDemo);
    app.component('highlight-code', highlight);
  },
};
