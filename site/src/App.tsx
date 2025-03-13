import { createEffect, createSignal, ParentComponent } from 'solid-js';

import en from './locale/en';
import zh from './locale/zh';
import Icon from './icon';
import ConfigContext, { Locale } from '@/context/configContext';
import './custom.css';
import './App.css';
import './arco.css';
import { Avatar, Badge, Link, Space } from 'arco-design-solid';
import { IconClockCircle, IconNotification } from 'arco-solid-icon';

const App: ParentComponent = props => {
  const [locale, setLocale] = createSignal<Locale>('en-US');
  const [i18dict, setI18dict] = createSignal<any>({});
  createEffect(() => {
    setI18dict(locale() === 'en-US' ? zh : en);
  });
  return (
    <ConfigContext.Provider value={{ lang: locale, dict: i18dict }}>
      <div>
        <div class="ac-navbar-container">
          <a
            class="ac-navbar-logo"
            onClick={() => {
              setLocale(() => {
                return locale() === 'en-US' ? 'zh-CN' : 'en-US';
              });
            }}
          >
            <Icon />
          </a>
        </div>
        <div class="ac-content">
          <div class="ac-content-menu"></div>
          <div class="ac-content-body">{props.children}</div>
          <div class="ac-anchor-layout-holder"></div>
        </div>
      </div>
    </ConfigContext.Provider>
  );
};
export default App;
