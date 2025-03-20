import configContext from '@/context/configContext';
import Icon from '@/icon';
import { createSignal, useContext } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import { Button, Dropdown, Space } from 'arco-design-solid';

import './index.less';
import { IconGithub, IconMoon, IconSun } from 'arco-solid-icon';

const Header = () => {
  const context = useContext(configContext);
  const [mode, setMode] = createSignal(window?.localStorage?.getItem('ac-theme') || 'light');
  const t = () => i18n.translator(() => context?.dict?.());
  return (
    <div class="ac-navbar-container">
      <a class="ac-navbar-logo">
        <Icon />
      </a>

      <Space size={20}>
        <Dropdown
          items={[
            {
              label: 'English',
              key: 'en-US',
              class: context?.lang?.() === 'en-US' ? 'selected-menu-item' : '',
              onClick(key) {
                context.changeLocale?.(key);
              },
            },
            {
              label: '简体中文',
              class: context?.lang?.() === 'zh-CN' ? 'selected-menu-item' : '',
              key: 'zh-CN',
              onClick(key) {
                context.changeLocale?.(key);
              },
            },
          ]}
        >
          <span class="ac-mode-wrapper" style={{ 'font-size': '16px', padding: '4px 8px' }}>
            {context.lang?.() === 'en-US' ? 'English' : '简体中文'}
          </span>
        </Dropdown>
        <span
          onClick={() => {
            window.open('https://github.com/mjw-git/arco-design-solid');
          }}
          class="ac-mode-wrapper"
        >
          <IconGithub />
        </span>
        <Dropdown
          items={[
            {
              label: t()('routes.light') as string,
              key: 'light',
              class: mode() === 'light' ? 'selected-menu-item' : '',
              onClick(key) {
                localStorage.removeItem('ac-mode');
                document.body.removeAttribute('arco-theme');
                setMode(key);
              },
            },
            {
              label: t()('routes.dark') as string,
              key: 'dark',
              class: mode() === 'dark' ? 'selected-menu-item' : '',
              onClick(key) {
                setMode(key);
                localStorage.setItem('ac-mode', 'dark');
                document.body.setAttribute('arco-theme', 'dark');

                // context.changeLocale?.(key);
              },
            },
          ]}
        >
          <span class="ac-mode-wrapper">{mode() === 'dark' ? <IconMoon /> : <IconSun />}</span>
        </Dropdown>
      </Space>
    </div>
  );
};
export default Header;
