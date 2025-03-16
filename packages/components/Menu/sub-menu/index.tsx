import { ParentComponent, splitProps } from 'solid-js';
import { MenuSubMenuProps } from '../interface';

const SubMenu: ParentComponent<MenuSubMenuProps> = props => {
  const [local, rest] = splitProps(props, ['children']);
  return <div></div>;
};
export default SubMenu;
