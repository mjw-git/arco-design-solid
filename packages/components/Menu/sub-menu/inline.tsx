import {
  createEffect,
  createMemo,
  createSignal,
  JSX,
  ParentComponent,
  splitProps,
  useContext,
} from 'solid-js';
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
  const [isChildrenSelected, setIsChildrenSelected] = createSignal(false);
  const isOpen = createMemo(() => (openKeys?.() ?? []).indexOf(local.key) > -1, false, {
    equals: (pre, next) => pre === next,
  });

  createEffect(() => {
    console.log(isOpen(), local.key, '====ddd');
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

  // const isItemSelected = () => {
  //   console.log(contentRef?.querySelectorAll(`#${CSS.escape('0_0')}`), local.key);
  //   return true;

  // };
  createEffect(() => {
    for (let key of selectedKeys?.() ?? []) {
      if (contentRef.querySelectorAll(`[data-item-id="${key}"]`).length > 0) {
        setIsChildrenSelected(true);
        return;
      }
    }
    setIsChildrenSelected(false);
  });

  const isSelected = () =>
    (local.selectable && (selectedKeys?.() ?? []).indexOf(local.key as string) > -1) ||
    isChildrenSelected();
  const subMenuClickHandler = (event: Event) => {
    onClickSubMenu?.(local.key, 1, 'inline');
    local.selectable && onClickMenuItem?.(local.key, event);
  };

  const header = () => (
    <div
      tabIndex={0}
      aria-expanded={isOpen()}
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
