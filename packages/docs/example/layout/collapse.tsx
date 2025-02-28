import { Button, Layout } from 'arco-design-solid';
import './index.less';
import { createSignal } from 'solid-js';
import { IconCaretLeft, IconCaretRight } from 'arco-solid-icon';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const App = () => {
  const [collapsed, setCollapsed] = createSignal(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed());
  };

  return (
    <Layout class="layout-collapse-demo">
      <Sider
        collapsed={collapsed()}
        onCollapse={handleCollapsed}
        collapsible
        trigger={null}
        breakpoint="xl"
      >
        <div class="logo" />
      </Sider>
      <Layout>
        <Header style={{ 'padding-left': '20px' }}>
          <Button shape="round" class="trigger" onClick={handleCollapsed}>
            {collapsed() ? <IconCaretRight /> : <IconCaretLeft />}
          </Button>
        </Header>
        <Layout style={{ padding: '0 24px' }}>
          /home
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
