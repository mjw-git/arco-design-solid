import configContext from '@/context/configContext';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

import xml from 'highlight.js/lib/languages/xml';
// 只注册 typescript 语言（它包含了 TSX/JSX 的支持）
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
import { Button, Layout } from "arco-design-solid";
import { IconCode, IconCaretLeft, IconCaretRight } from "arco-solid-icon";
import { For, useContext, createSignal } from "solid-js";
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const Demo0 = () => {
  return <div class="layout-basic-demo">
      <Layout style={{
      height: '400px'
    }}>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{
      height: '400px'
    }}>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{
      height: '400px'
    }}>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{
      height: '400px'
    }}>
        <Header>Header</Header>
        <Layout>
          <Sider style={{
          width: '64px'
        }}>Sider</Sider>
          <Sider style={{
          width: '206px',
          'margin-left': '1px'
        }}>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>;
};
// const Sider = Layout.Sider;
// const Header = Layout.Header;
// const Footer = Layout.Footer;
// const Content = Layout.Content;

const Demo1 = () => {
  const [collapsed, setCollapsed] = createSignal(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed());
  };
  return <Layout class="layout-collapse-demo">
      <Sider collapsed={collapsed()} onCollapse={handleCollapsed} collapsible trigger={collapsed() ? <IconCaretRight /> : <IconCaretLeft />} breakpoint="xl">
        <div class="logo" />
      </Sider>
      <Layout>
        <Header style={{
        'padding-left': '20px'
      }}>Header</Header>
        <Layout style={{
        padding: '0 24px'
      }}>
          /home
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>;
};
// const Sider = Layout.Sider;
// const Header = Layout.Header;
// const Footer = Layout.Footer;
// const Content = Layout.Content;

const Demo2 = () => {
  const [collapsed, setCollapsed] = createSignal(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed());
  };
  return <Layout class="layout-collapse-demo">
      <Sider collapsed={collapsed()} onCollapse={handleCollapsed} collapsible trigger={null} breakpoint="xl">
        <div class="logo" />
      </Sider>
      <Layout>
        <Header style={{
        'padding-left': '20px'
      }}>
          <Button shape="round" class="trigger" onClick={handleCollapsed}>
            {collapsed() ? <IconCaretRight /> : <IconCaretLeft />}
          </Button>
        </Header>
        <Layout style={{
        padding: '0 24px'
      }}>
          /home
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>;
};
const demos = [{
  source: "import { Layout } from 'arco-design-solid';\n\nconst Sider = Layout.Sider;\nconst Header = Layout.Header;\nconst Footer = Layout.Footer;\nconst Content = Layout.Content;\n\nconst App = () => {\n  return (\n    <div class=\"layout-basic-demo\">\n      <Layout style={{ height: '400px' }}>\n        <Header>Header</Header>\n        <Content>Content</Content>\n        <Footer>Footer</Footer>\n      </Layout>\n      <br />\n      <Layout style={{ height: '400px' }}>\n        <Header>Header</Header>\n        <Layout>\n          <Sider>Sider</Sider>\n          <Content>Content</Content>\n        </Layout>\n        <Footer>Footer</Footer>\n      </Layout>\n      <br />\n      <Layout style={{ height: '400px' }}>\n        <Header>Header</Header>\n        <Layout>\n          <Content>Content</Content>\n          <Sider>Sider</Sider>\n        </Layout>\n        <Footer>Footer</Footer>\n      </Layout>\n      <br />\n      <Layout style={{ height: '400px' }}>\n        <Header>Header</Header>\n        <Layout>\n          <Sider style={{ width: '64px' }}>Sider</Sider>\n          <Sider style={{ width: '206px', 'margin-left': '1px' }}>Sider</Sider>\n          <Content>Content</Content>\n        </Layout>\n        <Footer>Footer</Footer>\n      </Layout>\n    </div>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "基础用法",
  "zh-CN_desc": "<p>典型的页面布局。</p>",
  "en-US_desc": "<p>A typical page layout.</p>",
  "en-US_title": "Basic",
  component: () => <Demo0 />
}, {
  source: "import { Layout } from 'arco-design-solid';\nimport { createSignal } from 'solid-js';\nimport { IconCaretLeft, IconCaretRight } from 'arco-solid-icon';\n\n// const Sider = Layout.Sider;\n// const Header = Layout.Header;\n// const Footer = Layout.Footer;\n// const Content = Layout.Content;\n\nconst App = () => {\n  const [collapsed, setCollapsed] = createSignal(false);\n  const handleCollapsed = () => {\n    setCollapsed(!collapsed());\n  };\n\n  return (\n    <Layout class=\"layout-collapse-demo\">\n      <Sider\n        collapsed={collapsed()}\n        onCollapse={handleCollapsed}\n        collapsible\n        trigger={collapsed() ? <IconCaretRight /> : <IconCaretLeft />}\n        breakpoint=\"xl\"\n      >\n        <div class=\"logo\" />\n      </Sider>\n      <Layout>\n        <Header style={{ 'padding-left': '20px' }}>Header</Header>\n        <Layout style={{ padding: '0 24px' }}>\n          /home\n          <Content>Content</Content>\n          <Footer>Footer</Footer>\n        </Layout>\n      </Layout>\n    </Layout>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "自定义按钮 Icon",
  "zh-CN_desc": "<p>通过设置 <code>Menu.Sider</code> 的 <code>trigger</code> 属性，实现自定义收起按钮的图标。</p>",
  "en-US_desc": "<p>By setting the <code>trigger</code> property of <code>Menu.Sider</code>, the icon of the collapse button can be customized.</p>",
  "en-US_title": "Customize button's icon",
  component: () => <Demo1 />
}, {
  source: "import { Button, Layout } from 'arco-design-solid';\nimport { createSignal } from 'solid-js';\nimport { IconCaretLeft, IconCaretRight } from 'arco-solid-icon';\n\n// const Sider = Layout.Sider;\n// const Header = Layout.Header;\n// const Footer = Layout.Footer;\n// const Content = Layout.Content;\n\nconst App = () => {\n  const [collapsed, setCollapsed] = createSignal(false);\n  const handleCollapsed = () => {\n    setCollapsed(!collapsed());\n  };\n\n  return (\n    <Layout class=\"layout-collapse-demo\">\n      <Sider\n        collapsed={collapsed()}\n        onCollapse={handleCollapsed}\n        collapsible\n        trigger={null}\n        breakpoint=\"xl\"\n      >\n        <div class=\"logo\" />\n      </Sider>\n      <Layout>\n        <Header style={{ 'padding-left': '20px' }}>\n          <Button shape=\"round\" class=\"trigger\" onClick={handleCollapsed}>\n            {collapsed() ? <IconCaretRight /> : <IconCaretLeft />}\n          </Button>\n        </Header>\n        <Layout style={{ padding: '0 24px' }}>\n          /home\n          <Content>Content</Content>\n          <Footer>Footer</Footer>\n        </Layout>\n      </Layout>\n    </Layout>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "自定义收起按钮",
  "zh-CN_desc": "<p>设置 <code>Menu.Sider</code> 的 <code>trigger</code> 属性为 <code>null</code> 后，<code>Sider</code> 内置的缩起按钮不会显示。此时可自定义收起按钮。</p>",
  "en-US_desc": "<p>After setting the <code>trigger</code> property of <code>Menu.Sider</code> to <code>null</code>, the built-in trigger of <code>Sider</code> will not be displayed. At this time, you can customize the collapse button.</p>",
  "en-US_title": "Customize collapse button",
  component: () => <Demo2 />
}];

const App = () => {
  const [show, setShow] = createSignal([]);
  const context = useContext(configContext);

  return (
    <For each={demos}>
      {demo => {
        const highlightedCode = hljs.highlight(demo.source, {
          language: 'typescript',
        }).value;
        return (
          <div class="codebox-wrapper">
            <div class="ac-description">
              <div class="ac-description-children">
                <div class="code-preview">
                  <div class="ac-demo-title">
                    <h2>{demo[`${context?.lang?.()}_title`]}</h2>
                  </div>
                  <div innerHTML={demo[`${context?.lang?.()}_desc`]}></div>
                </div>
              </div>
            </div>
            <div class="demo">{demo.component()}</div>
            <div class="arco-code-operations">
              <Button
                shape="circle"
                onClick={() => {
                  if (show().includes(demo['zh-CN_title'])) {
                    setShow(show().filter(item => item !== demo['zh-CN_title']));
                  } else {
                    setShow([...show(), demo['zh-CN_title']]);
                  }
                }}
                size="small"
                icon={<IconCode />}
              ></Button>
            </div>
            <div
              style={{ height: show().includes(demo['zh-CN_title']) ? 'unset' : '0px' }}
              class="arco-content-code-wrapper"
            >
              <div class={`content-code-design`}>
                <pre innerHTML={highlightedCode}>11</pre>
              </div>
            </div>
          </div>
        );
      }}
    </For>
  );
};
export default App;
