import { onCleanup, onMount, ParentComponent, splitProps, useContext } from 'solid-js';
import { MenuSubMenuProps } from '../interface';
import SubMenuInline from './inline';
import MenuContext from '../context';

const SubMenu: ParentComponent<MenuSubMenuProps> = props => {
  const [local, rest] = splitProps(props, ['children', 'key']);
  const { collectInlineMenuKeys } = useContext(MenuContext);
  onMount(() => {
    collectInlineMenuKeys?.(local.key);
  });
  onCleanup(() => {
    collectInlineMenuKeys?.(local.key, true);
  });
  return (
    <SubMenuInline key={local.key} {...rest}>
      {local.children}
    </SubMenuInline>
  );
};
export default SubMenu;
