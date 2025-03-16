import { createEffect, createSignal, ParentComponent } from 'solid-js';

import en from './locale/en';
import zh from './locale/zh';
import Icon from './icon';
import ConfigContext, { Locale } from '@/context/configContext';
import './custom.css';
import './App.css';
import './arco.css';
import { Avatar, Badge, Link, Menu, Space } from 'arco-design-solid';
import { IconClockCircle, IconNotification } from 'arco-solid-icon';
const SubMenu = Menu.SubMenu;
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
          <div class="ac-content-menu">
            <Menu hasCollapseButton>
              <SubMenu key="0" title={<>Navigation 1</>}>
                <Menu.Item key="0_0">Menu 1</Menu.Item>
                <Menu.Item key="0_1">Menu 2</Menu.Item>
                <Menu.Item key="0_2">Menu 3</Menu.Item>
                <Menu.Item key="0_3">Menu 4</Menu.Item>
              </SubMenu>
              <SubMenu key="1" title={<>Navigation 2</>}>
                <Menu.Item key="1_0">Menu 1</Menu.Item>
                <Menu.Item key="1_1">Menu 2</Menu.Item>
                <Menu.Item key="1_2">Menu 3</Menu.Item>
              </SubMenu>
              <SubMenu key="2" title={<>Navigation 3</>}>
                <Menu.Item key="2_0">Menu 1</Menu.Item>
                <Menu.Item key="2_1">Menu 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="3_0" renderItemInTooltip={() => 'NAVIGATION-4'}>
                Navigation 4
              </Menu.Item>
            </Menu>
          </div>
          <div class="ac-content-body">{props.children}</div>
          <div class="ac-anchor-layout-holder"></div>
        </div>
      </div>
    </ConfigContext.Provider>
  );
};
export default App;
