import configContext from '@/context/configContext';
import Icon from '@/icon';
import { useContext } from 'solid-js';
import './index.less';
import { Button, Dropdown } from 'arco-design-solid';
const Header = () => {
  const context = useContext(configContext);
  return (
    <div class="ac-navbar-container">
      <a
        class="ac-navbar-logo"
        onClick={() => {
          // setLocale(() => {
          //   return locale() === 'en-US' ? 'zh-CN' : 'en-US';
          // });
        }}
      >
        <Icon />
      </a>
      <Dropdown
        items={[
          {
            label: 'English',
            key: 'en-US',
            onClick(key) {
              context.changeLocale?.(key);
            },
          },
          {
            label: '简体中文',
            key: 'zh-CN',
            onClick(key) {
              context.changeLocale?.(key);
            },
          },
        ]}
      >
        <Button type="secondary">{context.lang?.() === 'en-US' ? 'English' : '简体中文'}</Button>
      </Dropdown>
    </div>
  );
};
export default Header;
