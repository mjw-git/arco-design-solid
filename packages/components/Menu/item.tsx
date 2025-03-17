import { children, createEffect, ParentComponent, Show, splitProps, useContext } from 'solid-js';
import { MenuItemProps } from './interface';
import MenuContext from './context';
import { Dynamic } from 'solid-js/web';
import scrollIntoView from 'scroll-into-view-if-needed';
import cs from '../utils/classNames';
import { Enter } from '../utils/keycode';
import MenuIndent from './indent';
const Item: ParentComponent<MenuItemProps> = props => {
  let ref: HTMLElement;
  const [local, rest] = splitProps(props, [
    'children',
    'level',
    'disabled',
    'class',
    'style',
    'wrapper',
    'onClick',
    'renderItemInTooltip',
    '_key',
    'key',
    'ref',
  ]);
  const {
    prefixCls,
    mode,
    collapse,
    selectedKeys,
    autoScrollIntoView,

    onClickMenuItem,
  } = useContext(MenuContext);

  const isSelected = () => selectedKeys?.() && ~selectedKeys?.().indexOf(local.key);

  createEffect(() => {
    if (ref && isSelected() && autoScrollIntoView) {
      setTimeout(() => {
        scrollIntoView(ref, {
          behavior: 'smooth',
          block: 'start',
          scrollMode: 'if-needed',
          boundary: document.body,
        });
      });
    }
  });

  const menuItemClickHandler = (event: Event) => {
    if (!local.disabled) {
      onClickMenuItem?.(local.key, event);
      local.onClick && local.onClick(event);
    }
  };

  const itemElement = () => {
    return (
      <Dynamic
        data-type="menu-item"
        data-item-id={local.key}
        ref={(el: HTMLElement) => {
          local.ref = el;
          ref = el;
        }}
        tabIndex={local.disabled ? -1 : 0}
        role="menuitem"
        component={local.wrapper || 'div'}
        style={local.style}
        class={cs(
          `${prefixCls}-item`,
          {
            [`${prefixCls}-disabled`]: local.disabled,
            [`${prefixCls}-selected`]: isSelected(),
            // 存在缩进dom
            [`${prefixCls}-item-indented`]: local.level && !collapse?.(),
          },
          local.class
        )}
        onClick={menuItemClickHandler}
        onKeyDown={(event: any) => {
          const keyCode = event.keyCode || event.which;
          if (keyCode === Enter.code) {
            menuItemClickHandler(event);
          }
        }}
        {...rest}
      >
        {local.level && !collapse?.() ? (
          <>
            <MenuIndent prefixCls={prefixCls!} level={local.level} />
            <span
              class={`${prefixCls}-item-inner`}
              style={{
                display: 'block',
              }}
            >
              {local.children}
            </span>
          </>
        ) : (
          local.children
        )}
        <Show when={isSelected() && mode === 'horizontal'}>
          <div class={`${prefixCls}-selected-label`} />
        </Show>
      </Dynamic>
    );
  };
  return <>{itemElement()}</>;
};
export default Item;
