import {
  children,
  createComponent,
  createSignal,
  mergeProps,
  ParentComponent,
  splitProps,
} from 'solid-js';
import { MenuProps } from './interface';
import useMergeValue from '../hooks/useMergeValue';
import useKeyboardEvent from '../hooks/useKeyboardEvent';
import useId from '../hooks/useId';
import { IconMenuFold, IconMenuUnfold } from 'arco-solid-icon';
import cs from '../utils/classNames';
import MenuContext from './context';
import Item from './item';
import SubMenu from './sub-menu';
import ItemGroup from './item-group';

const defaultProps: MenuProps = {
  mode: 'vertical',
  selectable: true,
  ellipsis: true,
};

const DEFAULT_THEME: MenuProps['theme'] = 'light';
const BASE_PREFIX = 'arco-menu';
const Menu: ParentComponent<MenuProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [subMenuKeys, setSubMenuKeys] = createSignal<string[]>([]);
  const [local, rest] = splitProps(merge, [
    'style',
    'children',
    'class',
    'prefixCls',
    'mode',
    'theme',
    'selectable',
    'id',
    'icons',
    'levelIndent',
    'openKeys',
    'defaultOpenKeys',
    'defaultSelectedKeys',
    'onClickMenuItem',
    'selectedKeys',
    'collapse',
    'inDropdown',
    'ellipsis',
    'onCollapseChange',
    'accordion',
    'theme',
    'hasCollapseButton',
    'autoScrollIntoView',
    'onClickSubMenu',
    'icons',
  ]);
  const [openKeys, setOpenKeys] = useMergeValue<string[]>(
    local.defaultOpenKeys,
    () => local.openKeys
  );
  const _instanceId = useId(`${BASE_PREFIX}-`);
  const [collapse, setCollapse] = useMergeValue(false, () => local.collapse);

  const [selectedKeys, setSelectedKeys] = useMergeValue(
    local.defaultSelectedKeys,
    () => local.selectedKeys
  );
  const instanceId = () => local.id || _instanceId();
  const theme = () => local.theme || DEFAULT_THEME;
  const mergedCollapse = () => collapse() || local.inDropdown || local.mode === 'popButton';
  const getKeyboardEvents = useKeyboardEvent();

  const mergedHasCollapseButton = () =>
    local.mode !== 'horizontal' &&
    local.mode !== 'popButton' &&
    !local.inDropdown &&
    local.hasCollapseButton;

  const collapseButtonClickHandler = () => {
    const newCollapse = !collapse();
    setCollapse(newCollapse);
    local.onCollapseChange && local.onCollapseChange(newCollapse);
  };

  const renderChildren = () => {
    const collapseIcon = () =>
      collapse()
        ? (local.icons && local.icons.collapseActive) || <IconMenuUnfold />
        : (local.icons && local.icons.collapseDefault) || <IconMenuFold />;
    return (
      <>
        <div class={`${_BASE_PREFIX()}-inner`}>
          {local.mode === 'horizontal' && local.ellipsis !== false
            ? local.children
            : local.children}
        </div>

        {mergedHasCollapseButton() && (
          <div
            tabIndex="0"
            role="button"
            aria-controls={'' + instanceId()}
            aria-expanded={!collapse()}
            class={`${_BASE_PREFIX()}-collapse-button`}
            onClick={collapseButtonClickHandler}
            {...getKeyboardEvents({ onPressEnter: collapseButtonClickHandler })}
          >
            {collapseIcon()}
          </div>
        )}
      </>
    );
  };

  const mergeStyle = () => {
    return {
      ...local.style,
      width: mergedCollapse() && !local.inDropdown ? undefined : local.style?.width,
    };
  };
  const _BASE_PREFIX = () => local.prefixCls || BASE_PREFIX;
  return (
    <div
      style={mergeStyle()}
      role="menu"
      data-type="menu"
      {...rest}
      class={cs(
        _BASE_PREFIX(),
        `${_BASE_PREFIX()}-${theme()}`,
        `${_BASE_PREFIX()}-${local.mode === 'horizontal' ? 'horizontal' : 'vertical'}`,
        {
          [`${_BASE_PREFIX()}-collapse`]: mergedCollapse(),
          // 缩起状态自动变成 pop 模式
          [`${_BASE_PREFIX()}-pop`]: local.mode === 'pop' || mergedCollapse,
          [`${_BASE_PREFIX()}-pop-button`]: local.mode === 'popButton',
        },
        local.class
      )}
    >
      <MenuContext.Provider
        value={{
          mode: local.mode,
          theme: () => theme(),
          collapse: mergedCollapse,
          levelIndent: local.levelIndent,
          inDropdown: local.inDropdown,
          selectedKeys: () => selectedKeys() ?? [],
          openKeys: () => openKeys() ?? [],
          icons: local.icons,
          autoScrollIntoView: local.autoScrollIntoView,
          // pass props directly
          id: instanceId + '',
          prefixCls: () => _BASE_PREFIX(),
          collectInlineMenuKeys: (key, unmount) => {
            let keys = [...subMenuKeys()];
            if (unmount) {
              keys = keys.filter(x => x !== key);
            } else {
              keys.push(key);
            }
            // forceUpdate();
            setSubMenuKeys(keys);
          },
          onClickMenuItem: (key, event) => {
            local.selectable && setSelectedKeys([key]);
            local.onClickMenuItem && local.onClickMenuItem(key, event);
          },
          onClickSubMenu: (key, level, type) => {
            let newOpenKeys: string[] = [...(openKeys() ?? [])];

            if (type === 'inline') {
              if ((openKeys() ?? []).indexOf(key) > -1) {
                if (local.accordion && level === 1) {
                  newOpenKeys = [];
                } else {
                  newOpenKeys = (openKeys() ?? []).filter(item => item !== key);
                }
              } else if (local.accordion && level === 1) {
                newOpenKeys = [key];
              } else {
                newOpenKeys = (openKeys() ?? []).concat([key]);
              }
            }

            setOpenKeys(newOpenKeys);
            local.onClickSubMenu && local.onClickSubMenu(key, newOpenKeys);
          },
        }}
      >
        {renderChildren()}
      </MenuContext.Provider>
    </div>
  );
};
const MenuComponent = Menu as typeof Menu & {
  Item: typeof Item;
  SubMenu: typeof SubMenu;
  ItemGroup: typeof ItemGroup;
};
MenuComponent.Item = Item;
MenuComponent.SubMenu = SubMenu;
MenuComponent.ItemGroup = ItemGroup;
export default MenuComponent;
