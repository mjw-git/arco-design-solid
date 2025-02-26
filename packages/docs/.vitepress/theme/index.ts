import theme from 'vitepress/theme';
import 'arco-design-solid/dist/index.css';
import './custom.css';
import { highlight } from '../components/highlight';
import DemoBlock from '../components/demo-block';
import IconDemo from '../components/icon-demo';
import { setupThemeWatcher } from './utils/theme';
// import { onMounted } from 'vue'
export default {
  ...theme,
  setup() {
    setupThemeWatcher();
  },
  enhanceApp({ app }) {
    app.component('Demo', DemoBlock);
    app.component('IconDemo', IconDemo);
    app.component('highlight-code', highlight);
  },
};
