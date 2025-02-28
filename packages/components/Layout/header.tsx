import cs from '../utils/classNames';
import { HeaderProps } from './interface';
import { ParentComponent, splitProps } from 'solid-js';

const BASE_PREFIX = 'arco-layout-header';

const Header: ParentComponent<HeaderProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  const mergeCls = () => cs(BASE_PREFIX, local.class);

  return (
    <header class={mergeCls()} {...rest}>
      {local.children}
    </header>
  );
};

const HeaderComponent = Header as typeof Header & {
  displayName: string;
};

HeaderComponent.displayName = 'LayoutHeader';

export default HeaderComponent;
