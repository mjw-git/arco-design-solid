import { Avatar, Badge, Link, Menu, Space } from 'arco-design-solid';
import { createEffect, For, useContext } from 'solid-js';
import ConfigContext from '@/context/configContext';
import * as i18n from '@solid-primitives/i18n';
import './index.less';
import { getRoutes } from '@/route';
import { BaseRecordDict, Translator } from '@solid-primitives/i18n';
import { useLocation, useNavigate } from '@solidjs/router';
const SubMenu = Menu.SubMenu;
const ItemGroup = Menu.ItemGroup;
const MenuWidget = () => {
  const context = useContext(ConfigContext);
  const location = useLocation();

  const selectKey = () =>
    location.pathname.startsWith('/') ? location.pathname.slice(1) : location.pathname || 'button';

  const navigate = useNavigate();

  const t = () => i18n.translator(() => context?.dict?.());

  const routes = () => {
    return getRoutes(t() as Translator<BaseRecordDict, string>, context.lang?.() || 'en');
  };

  return (
    <div class="arco-menu-fixed-wrapper">
      <Menu defaultOpenKeys={['components']} defaultSelectedKeys={[selectKey()]} hasCollapseButton>
        <For each={routes()}>
          {item => {
            return (
              <SubMenu key={item.key} title={item.name as string}>
                <For each={item.items}>
                  {item2 => {
                    return (
                      <ItemGroup level={item2.level} title={item2.name as string}>
                        <For each={item2.items}>
                          {item3 => {
                            return (
                              <Menu.Item
                                level={item3.level}
                                onClick={() => {
                                  navigate(item3.path);
                                }}
                                key={item3.key}
                              >
                                {item3.name as string}
                              </Menu.Item>
                            );
                          }}
                        </For>
                      </ItemGroup>
                    );
                  }}
                </For>
              </SubMenu>
            );
          }}
        </For>
      </Menu>
    </div>
  );
};
export default MenuWidget;
