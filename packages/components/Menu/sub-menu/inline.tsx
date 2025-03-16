import { createEffect, createSignal, JSX, ParentComponent, splitProps, useContext } from 'solid-js';
import { MenuSubMenuProps } from '../interface';
import cs from '../../utils/classNames';
import MenuContext from '../context';
import { Enter } from '../../utils/keycode';
import useId from '../../hooks/useId';
import { IconDown } from 'arco-solid-icon';
import { Transition } from 'solid-transition-group';

const CONTENT_HIDDEN_STYLE: JSX.CSSProperties = { height: 0, visibility: 'hidden' };
const SubMenuInline: ParentComponent<MenuSubMenuProps> = props => {
  const [local, rest] = splitProps(props, [
    'children',
    'key',
    'selectable',
    'title',
    'class',
    'style',
  ]);
  const {
    id: menuId,
    prefixCls,
    levelIndent,
    openKeys,
    selectedKeys,
    icons,
    onClickSubMenu,
    onClickMenuItem,
  } = useContext(MenuContext);
  let contentRef: HTMLDivElement;
  const baseClassName = () => `${prefixCls}-inline`;
  const isOpen = () => (openKeys?.() ?? []).indexOf(local.key) > -1;

  createEffect(() => {
    if (isOpen()) {
      contentRef.style.transition = 'none';
      contentRef.style.height = 'auto';
      const height = contentRef.offsetHeight;
      contentRef.style.height = '0px';
      contentRef.offsetHeight;
      contentRef.style.transition = '0.2s';
      contentRef.style.height = `${height}px`;
    } else {
      contentRef.style.transition = '0.2s';
      contentRef.style.height = '0px';
    }
  });

  const isSelected = () =>
    local.selectable && (selectedKeys?.() ?? []).indexOf(local.key as string) > -1;

  const subMenuClickHandler = (event: Event) => {
    onClickSubMenu?.(local.key, 1, 'inline');
    local.selectable && onClickMenuItem?.(local.key, event);
  };

  const instanceId = () => useId(`${menuId}-submenu-inline-`);
  console.log(instanceId()(), '=');
  const header = () => (
    <div
      tabIndex={0}
      aria-expanded={isOpen()}
      aria-controls={instanceId() + ''}
      class={cs(`${baseClassName()}-header`, {
        [`${prefixCls}-selected`]: isSelected(),
      })}
      onClick={subMenuClickHandler}
      onKeyDown={event => {
        const keyCode = event.keyCode || event.which;
        if (keyCode === Enter.code) {
          subMenuClickHandler(event);
        }
      }}
    >
      <span>{local.title}</span>
      <span class={`${prefixCls}-icon-suffix ${isOpen() ? 'is-open' : ''}`}>
        {icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : <IconDown />}
      </span>
    </div>
  );

  const content = () => (
    <div
      ref={el => (contentRef = el)}
      id={local.key}
      class={cs(`${baseClassName()}-content`)}
      //   style={contentStyle()}
    >
      {local.children}
    </div>
  );

  return (
    <div style={local.style} class={cs(baseClassName(), local.class)}>
      {header()}
      <Transition>{content()}</Transition>
    </div>
  );
};
export default SubMenuInline;
