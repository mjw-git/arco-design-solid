import { createEffect, For, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { DropdownProps } from './interface';
import useMergeValue from '../hooks/useMergeValue';
import Trigger from '../Trigger';
import Menu from '../Menu';
const BASE_PREFIX = 'arco-dropdown';
const defaultProps: DropdownProps = {
  position: 'bl',
  trigger: 'hover',
  unmountOnExit: true,
};
const trigerPopupAlign = {
  left: 4,
  right: 4,
  top: 4,
  bottom: 4,
};

const Dropdown: ParentComponent<DropdownProps> = props => {
  const merge = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(merge, [
    'trigger',
    'customRender',
    'children',
    'disabled',
    'position',
    'unmountOnExit',
    'triggerProps',
    'getPopupContainer',
    'onVisibleChange',
    'items',
  ]);

  const [popupVisible, setPopupVisible] = useMergeValue(
    merge.defaultPopupVisible,
    () => merge.popupVisible
  );

  const changePopupVisible = (visible: boolean) => {
    setPopupVisible(visible);
    local.onVisibleChange && local.onVisibleChange(visible);
    local.triggerProps &&
      local.triggerProps.onVisibleChange &&
      local.triggerProps.onVisibleChange(visible);
  };

  const handleVisibleChange = (visible: boolean) => {
    if (visible !== popupVisible()) {
      changePopupVisible(visible);
    }
  };
  const popup = () => {
    if (Array.isArray(local.items) && local.items.length > 0) {
      return (
        <Menu
          onClickMenuItem={() => {
            handleVisibleChange(false);
          }}
          prefixCls={`${BASE_PREFIX}-menu`}
          selectable={false}
        >
          <For each={local.items}>
            {item => {
              return (
                <Menu.Item
                  class={item.class}
                  onClick={e => {
                    item.onClick && item.onClick(item.key, e);
                  }}
                  disabled={item.disabled}
                  key={item.key}
                >
                  {item.label}
                </Menu.Item>
              );
            }}
          </For>
        </Menu>
      );
    }
    return local.customRender;
  };
  return (
    <Trigger
      trigger={local.trigger}
      disabled={local.disabled}
      position={local.position}
      mouseEnterDelay={400}
      mouseLeaveDelay={400}
      popupVisible={popupVisible()}
      popupAlign={trigerPopupAlign}
      getPopupContainer={local.getPopupContainer}
      alignPoint={local.trigger === 'contextMenu'}
      popup={() => popup()}
      onVisibleChange={handleVisibleChange}
      {...rest}
    >
      {local.children}
      {/* {local.children}</span> */}
    </Trigger>
  );
};
export default Dropdown;
