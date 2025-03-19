import { ParentComponent, splitProps } from 'solid-js';
import { LayoutProps } from './interface';
import cs from '../utils/classNames';
import Content from './content';
import Sider from './sider';
import Header from './header';
import Footer from './footer';

const BASE_PREFIX = 'arco-layout';

const Layout: ParentComponent<LayoutProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'children', 'hasSider']);
  const hasSider = () => {
    if (Array.isArray(local.children)) {
      for (const item of local.children) {
        if ((item as any)?.nodeName === 'ASIDE') {
          return true;
        }
      }
    } else {
      return (local.children as any)?.nodeName === 'ASIDE';
    }
    return false;
  };
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : hasSider(),
      },
      local.class
    );

  return (
    <section class={mergeCls()} {...rest}>
      {local.children}
    </section>
  );
};
const LayoutComponent = Layout as typeof Layout & {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
};
LayoutComponent.Footer = Footer;
LayoutComponent.Sider = Sider;
LayoutComponent.Header = Header;
LayoutComponent.Content = Content;
export default LayoutComponent;
