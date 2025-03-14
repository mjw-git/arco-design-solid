import { JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { MenuProps } from './interface';
import useMergeValue from '../hooks/useMergeValue';
import useKeyboardEvent from '../hooks/useKeyboardEvent';
import useId from '../hooks/useId';
import { IconMenuUnfold } from 'arco-solid-icon';
const defaultProps: MenuProps = {
  mode: 'vertical',
  selectable: true,
  ellipsis: true,
};
declare namespace C {
  interface IntrinsicElements {
    span: JSX.HTMLAttributes<HTMLSpanElement> & {
      'data-level'?: number; // 自定义属性
      'data-indent'?: string;
    };
  }
}

const DEFAULT_THEME: MenuProps['theme'] = 'light';
const BASE_PREFIX = 'arco-menu';
const Menu: ParentComponent<MenuProps> = props => {
  const merge = mergeProps(props, defaultProps);
  const [local, rest] = splitProps(merge, [
    'style',
    'children',
    'class',
    'prefixCls',
    'mode',
    'theme',
    'id',
    'icons',
    'levelIndent',
    'openKeys',
    'defaultOpenKeys',
    'defaultSelectedKeys',
    'selectedKeys',
    'collapse',
    'inDropdown',
    'ellipsis',
    'onCollapseChange',
    'theme',
    'hasCollapseButton',
    'icons',
  ]);
  const [openKeys, setOpenKeys] = useMergeValue<string[]>(
    local.defaultOpenKeys,
    () => local.openKeys
  );
  const _instanceId = useId(`${BASE_PREFIX}-`);
  const [collapse, setCollapse] = useMergeValue(false, () => local.collapse);

  const [selectKeys, setSelectKeys] = useMergeValue(
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
        <div class={`${BASE_PREFIX}-inner`}>
          {local.mode === 'horizontal' && local.ellipsis !== false ? 1 : local.children}
        </div>
        {mergedHasCollapseButton() && (
          <div
            tabIndex="0"
            role="button"
            aria-controls={'' + instanceId()}
            aria-expanded={!collapse()}
            class={`${BASE_PREFIX}-collapse-button`}
            onClick={collapseButtonClickHandler}
            {...getKeyboardEvents({ onPressEnter: collapseButtonClickHandler })}
          >
            {}
          </div>
        )}
      </>
    );
  };

  return <span data-type="menu"></span>;
};
export default Menu;
