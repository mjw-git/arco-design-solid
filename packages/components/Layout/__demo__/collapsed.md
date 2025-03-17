---
order: 2
title:
  zh-CN: 自定义收起按钮
  en-US: Customize collapse button
---

## zh-CN

设置 `Menu.Sider` 的 `trigger` 属性为 `null` 后，`Sider` 内置的缩起按钮不会显示。此时可自定义收起按钮。

## en-US

After setting the `trigger` property of `Menu.Sider` to `null`, the built-in trigger of `Sider` will not be displayed. At this time, you can customize the collapse button.

```tsx
import { Button, Layout } from 'arco-design-solid';
import { createSignal } from 'solid-js';
import { IconCaretLeft, IconCaretRight } from 'arco-solid-icon';

// const Sider = Layout.Sider;
// const Header = Layout.Header;
// const Footer = Layout.Footer;
// const Content = Layout.Content;

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
```

```css
.layout-collapse-demo {
  height: 500px;
  border: 1px solid var(--color-border);
  background: var(--color-fill-2);
}

.layout-collapse-demo .arco-layout-sider .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-collapse-demo .arco-layout-sider-light .logo {
  background: var(--color-fill-2);
}

.layout-collapse-demo .arco-layout-footer,
.layout-collapse-demo .arco-layout-content {
  color: var(--color-white);
  text-align: center;
  font-stretch: condensed;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout-collapse-demo .arco-layout-footer {
  color: var(--color-text-2);
  height: 48px;
  line-height: 48px;
  font-weight: 400;
  font-size: 14px;
}

.layout-collapse-demo .arco-layout-content {
  background: var(--color-bg-3);
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
}

.layout-collapse-demo .arco-layout-header {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-collapse-demo .arco-layout-header .trigger {
  margin-left: 20px;
}
```
