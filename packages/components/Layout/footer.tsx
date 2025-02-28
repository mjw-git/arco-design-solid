import { ParentComponent, splitProps } from 'solid-js';
import { FooterProps } from './interface';
import cs from '../utils/classNames';
const BASE_PREFIX = 'arco-layout-footer';
const Footer: ParentComponent<FooterProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'children']);

  const mergeCls = () => cs(BASE_PREFIX, local.class);
  return (
    <footer class={mergeCls()} {...rest}>
      {local.children}
    </footer>
  );
};

const FooterComponent = Footer as typeof Footer & {
  displayName: string;
};

FooterComponent.displayName = 'LayoutFooter';

export default FooterComponent;
