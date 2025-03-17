import { ParentComponent, splitProps, useContext } from 'solid-js';
import { MenuItemGroupProps } from './interface';
import MenuContext from './context';
import cs from '../utils/classNames';
import MenuIndent from './indent';
const ItemGroup: ParentComponent<MenuItemGroupProps> = props => {
  const [local] = splitProps(props, ['children', 'class', 'style', 'title', 'level']);
  const { prefixCls } = useContext(MenuContext);

  return (
    <div data-type="menu-group" class={cs(`${prefixCls}-group`, local.class)} style={local.style}>
      <div class={`${prefixCls}-group-title`}>
        <MenuIndent level={local.level} prefixCls={prefixCls!} />
        <span>{local.title}</span>
      </div>
      {local.children}
    </div>
  );
};
export default ItemGroup;
