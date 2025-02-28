import { createEffect, createSignal, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { SiderProps } from './interface';
import cs from '../utils/classNames';
import { isNumber } from '../utils';
import { IconLeft, IconRight } from 'arco-solid-icon';
const BASE_PREFIX = 'arco-layout-sider';
const Sider: ParentComponent<SiderProps> = props => {
  const merge = mergeProps({ collapsedWidth: 48, width: 200, theme: 'light' }, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'children',
    'defaultCollapsed',
    'collapsedWidth',
    'onBreakpoint',
    'breakpoint',
    'width',
    'collapsed',
    'style',
    'trigger',
    'reverseArrow',
    'collapsible',
    'theme',
    'onCollapse',
  ]);
  const propsWidth = () => (isNumber(local.width) ? `${local.width}px` : String(local.width));

  const [collapsed, setCollapsed] = createSignal(local.defaultCollapsed);

  const _collapsedWidth = () =>
    isNumber(local.collapsedWidth) ? `${local.collapsedWidth}` : String(local.collapsedWidth);
  const [siderWidth, setSiderWidth] = createSignal<string>(
    local.collapsed ? _collapsedWidth() : propsWidth()
  );

  createEffect(() => {
    const _collapsedWidth = isNumber(local.collapsedWidth)
      ? `${local.collapsedWidth}px`
      : String(local.collapsedWidth);
    setSiderWidth(local.collapsed ? _collapsedWidth : propsWidth);
  });

  const renderTrigger = () => {
    const triggerIcon =
      local.trigger ||
      (local.collapsed ? (
        local.reverseArrow ? (
          <IconLeft />
        ) : (
          <IconRight />
        )
      ) : local.reverseArrow ? (
        <IconRight />
      ) : (
        <IconLeft />
      ));
    return local.collapsible && local.trigger !== null ? (
      <div
        style={{ width: siderWidth() }}
        class={cs(`${BASE_PREFIX}-trigger`, {
          [`${BASE_PREFIX}-trigger-light`]: local.theme === 'light',
        })}
        onClick={() => {
          setCollapsed(!collapsed);
          local.onCollapse && local.onCollapse(!collapsed, 'clickTrigger');
        }}
      >
        {triggerIcon}
      </div>
    ) : null;
  };

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-light`]: local.theme === 'light',
        [`${BASE_PREFIX}-has-trigger`]: local.trigger !== null && local.collapsible,
        [`${BASE_PREFIX}-collapsed`]: collapsed(),
      },
      local.class
    );

  return (
    <aside
      style={{
        width: siderWidth(),
        ...local.style,
      }}
      class={mergeCls()}
    >
      <div class={`${BASE_PREFIX}-children`}>{local.children}</div>
      {renderTrigger()}
    </aside>
  );
};
const SiderComponent = Sider as typeof Sider & {
  __ARCO_SIGN__: 'sider';
  displayName: string;
};
SiderComponent.displayName = 'LayoutSider';
SiderComponent.__ARCO_SIGN__ = 'sider';
export default SiderComponent;
