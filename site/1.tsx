import configContext from '@/context/configContext';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

import xml from 'highlight.js/lib/languages/xml';
// 只注册 typescript 语言（它包含了 TSX/JSX 的支持）
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
import { Button, Space } from "arco-design-solid";
import { IconCode, IconDelete, IconPlus } from "arco-solid-icon";
import { For, useContext, createSignal } from "solid-js";
const Demo0 = () => {
  return <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>;
};
const Demo1 = () => {
  return <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
    </Space>;
};
const Demo2 = () => {
  return <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button shape="circle" type="primary" icon={<IconPlus />} />
      <Button shape="round" type="primary">
        Primary
      </Button>
      <Button type="primary">Primary</Button>
    </Space>;
};
const Demo3 = () => {
  return <Space align="center">
      <Button size="mini" type="primary">
        Mini
      </Button>
      <Button size="mini" icon={<IconDelete />} type="primary"></Button>
      <Button size="small" type="primary">
        Small
      </Button>
      <Button size="default">Default</Button>
      <Button icon={<IconDelete />} type="primary"></Button>
      <Button size="large">Large</Button>
    </Space>;
};
const Demo4 = () => {
  return <Space align="center" wrap>
      <Button status="warning" type="primary">
        Warning
      </Button>
      <Button status="success" type="primary">
        Success
      </Button>
      <Button status="danger" type="primary">
        Danger
      </Button>
      <Button status="warning" type="secondary">
        Warning
      </Button>
      <Button status="success" type="secondary">
        Success
      </Button>
      <Button status="danger" type="secondary">
        Danger
      </Button>
      <Button status="warning" type="outline">
        Warning
      </Button>
      <Button status="success" type="outline">
        Warning
      </Button>
      <Button status="danger" type="outline">
        Danger
      </Button>
      <Button status="warning" type="text">
        Warning
      </Button>
      <Button status="success" type="text">
        Success
      </Button>
      <Button status="danger" type="text">
        Danger
      </Button>
      <Button status="warning" type="dashed">
        Warning
      </Button>
      <Button status="success" type="dashed">
        Success
      </Button>
      <Button status="danger" type="dashed">
        Danger
      </Button>
    </Space>;
};
const Demo5 = () => {
  return <Space size="large" direction="vertical">
      <Space size="large">
        <Button disabled type="primary">
          Primary
        </Button>
        <Button disabled type="secondary">
          Secondary
        </Button>
        <Button disabled type="dashed">
          Dashed
        </Button>
        <Button disabled type="outline">
          Outline
        </Button>
        <Button disabled type="text">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="danger">
          Primary
        </Button>
        <Button disabled type="secondary" status="danger">
          Secondary
        </Button>
        <Button disabled type="dashed" status="danger">
          Dashed
        </Button>
        <Button disabled type="outline" status="danger">
          Outline
        </Button>
        <Button disabled type="text" status="danger">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="warning">
          Primary
        </Button>
        <Button disabled type="secondary" status="warning">
          Secondary
        </Button>
        <Button disabled type="dashed" status="warning">
          Dashed
        </Button>
        <Button disabled type="outline" status="warning">
          Outline
        </Button>
        <Button disabled type="text" status="warning">
          Text
        </Button>
      </Space>
      <Space size="large">
        <Button disabled type="primary" status="success">
          Primary
        </Button>
        <Button disabled type="secondary" status="success">
          Secondary
        </Button>
        <Button disabled type="dashed" status="success">
          Dashed
        </Button>
        <Button disabled type="outline" status="success">
          Outline
        </Button>
        <Button disabled type="text" status="success">
          Text
        </Button>
      </Space>
    </Space>;
};
const Demo6 = () => {
  const [loading, setLoading] = createSignal(false);
  return <Space wrap align="center">
      <Button type="primary" loading={loading()} onClick={() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }}>
        Click it
      </Button>
      <Button loading type="primary">
        Success
      </Button>

      <Button loading type="secondary">
        Warning
      </Button>
      <Button status="success" loading type="secondary">
        Success
      </Button>
      <Button status="danger" loading type="secondary">
        Danger
      </Button>
      <Button status="warning" loading type="outline">
        Warning
      </Button>
      <Button status="success" loading type="outline">
        Warning
      </Button>
      <Button status="danger" loading type="outline">
        Danger
      </Button>
      <Button status="warning" loading type="text">
        Warning
      </Button>
      <Button status="success" loading type="text">
        Success
      </Button>
      <Button status="danger" loading type="text">
        Danger
      </Button>
      <Button status="warning" loading type="dashed">
        Warning
      </Button>
      <Button status="success" loading type="dashed">
        Success
      </Button>
      <Button status="danger" loading type="dashed">
        Danger
      </Button>
      <Button status="danger" loading shape="circle" type="dashed"></Button>
      <Button status="danger" loading shape="circle" type="dashed" size="mini"></Button>
    </Space>;
};
const demos = [{
  source: "import { Button, Space } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <Space size=\"large\">\n      <Button type=\"primary\">Primary</Button>\n      <Button type=\"secondary\">Secondary</Button>\n      <Button type=\"dashed\">Dashed</Button>\n      <Button type=\"outline\">Outline</Button>\n      <Button type=\"text\">Text</Button>\n    </Space>\n  );\n};\n\nexport default App;\n\n",
  "zh-CN_title": "基本用法",
  "zh-CN_desc": "<p><code>按钮分为</code> 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。</p>",
  "en-US_desc": "<p>There are <code>primary</code>, <code>secondary</code>, <code>dashed</code>, <code>outline</code> and <code>text</code> button types.</p>",
  "en-US_title": "Basic",
  component: () => <Demo0 />
}, {
  source: "import { Button, Space } from 'arco-design-solid';\nimport { IconDelete, IconPlus } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space size=\"large\">\n      <Button type=\"primary\" icon={<IconPlus />} />\n      <Button type=\"primary\" icon={<IconDelete />}>\n        Delete\n      </Button>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "图标按钮",
  "zh-CN_desc": "<p>Button 可以嵌入图标，在只设置图标而没有 children 时，按钮的高宽相等。</p>",
  "en-US_desc": "<p>Icons can be used in buttons. When <code>icon</code> is set and there are no children, the height and width of the button are equal.</p>",
  "en-US_title": "Icon",
  component: () => <Demo1 />
}, {
  source: "import { Button, Space } from 'arco-design-solid';\nimport { IconPlus } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space size=\"large\">\n      <Button type=\"primary\" icon={<IconPlus />} />\n      <Button shape=\"circle\" type=\"primary\" icon={<IconPlus />} />\n      <Button shape=\"round\" type=\"primary\">\n        Primary\n      </Button>\n      <Button type=\"primary\">Primary</Button>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "按钮形状",
  "zh-CN_desc": "<p>Button 有多种形状，<code>square</code> - 长方形 <strong>(默认)</strong>, <code>circle</code> - 圆形, <code>round</code> - 全圆角。</p>",
  "en-US_desc": "<p>Button has many shapes, <code>square</code>-rectangle <strong>(default)</strong>, <code>circle</code>-round, <code>round</code>-full rounded corners.</p>",
  "en-US_title": "Shape",
  component: () => <Demo2 />
}, {
  source: "import { Button, Space } from 'arco-design-solid';\nimport { IconDelete } from 'arco-solid-icon';\n\nconst Test = () => {\n  return (\n    <Space align=\"center\">\n      <Button size=\"mini\" type=\"primary\">\n        Mini\n      </Button>\n      <Button size=\"mini\" icon={<IconDelete />} type=\"primary\"></Button>\n      <Button size=\"small\" type=\"primary\">\n        Small\n      </Button>\n      <Button size=\"default\">Default</Button>\n      <Button icon={<IconDelete />} type=\"primary\"></Button>\n      <Button size=\"large\">Large</Button>\n    </Space>\n  );\n};\nexport default Test;\n",
  "zh-CN_title": "按钮尺寸",
  "zh-CN_desc": "<p>按钮分为：迷你、小、中、大，四种尺寸。高度分别为：<code>24px/28px/32px/36px</code>。推荐及默认为尺寸「中」。可在不同场景及不同业务需求选择适合尺寸。</p>",
  "en-US_desc": "<p>Buttons can be <code>mini</code>, <code>small</code>, <code>medium</code> and <code>large</code> in size, with corresponding height of <code>24px/28px/32px/36px</code>. The recommended and default size is <code>medium</code>. The suitable size can be selected in different scenarios and different business needs.</p>",
  "en-US_title": "Size",
  component: () => <Demo3 />
}, {
  source: "import { Button, Space } from 'arco-design-solid';\n\nconst Test = () => {\n  return (\n    <Space align=\"center\" wrap>\n      <Button status=\"warning\" type=\"primary\">\n        Warning\n      </Button>\n      <Button status=\"success\" type=\"primary\">\n        Success\n      </Button>\n      <Button status=\"danger\" type=\"primary\">\n        Danger\n      </Button>\n      <Button status=\"warning\" type=\"secondary\">\n        Warning\n      </Button>\n      <Button status=\"success\" type=\"secondary\">\n        Success\n      </Button>\n      <Button status=\"danger\" type=\"secondary\">\n        Danger\n      </Button>\n      <Button status=\"warning\" type=\"outline\">\n        Warning\n      </Button>\n      <Button status=\"success\" type=\"outline\">\n        Warning\n      </Button>\n      <Button status=\"danger\" type=\"outline\">\n        Danger\n      </Button>\n      <Button status=\"warning\" type=\"text\">\n        Warning\n      </Button>\n      <Button status=\"success\" type=\"text\">\n        Success\n      </Button>\n      <Button status=\"danger\" type=\"text\">\n        Danger\n      </Button>\n      <Button status=\"warning\" type=\"dashed\">\n        Warning\n      </Button>\n      <Button status=\"success\" type=\"dashed\">\n        Success\n      </Button>\n      <Button status=\"danger\" type=\"dashed\">\n        Danger\n      </Button>\n    </Space>\n  );\n};\nexport default Test;\n",
  "zh-CN_title": "按钮状态",
  "zh-CN_desc": "<p>按钮状态分为 警告，危险，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型。</p>",
  "en-US_desc": "<p>Buttons can be in <code>warning</code>, <code>danger</code>, and <code>success</code> status. Status can co-exist with <code>type</code> but with higher priority.</p>",
  "en-US_title": "Status",
  component: () => <Demo4 />
}, {
  source: "import { Button, Space } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <Space size=\"large\" direction=\"vertical\">\n      <Space size=\"large\">\n        <Button disabled type=\"primary\">\n          Primary\n        </Button>\n        <Button disabled type=\"secondary\">\n          Secondary\n        </Button>\n        <Button disabled type=\"dashed\">\n          Dashed\n        </Button>\n        <Button disabled type=\"outline\">\n          Outline\n        </Button>\n        <Button disabled type=\"text\">\n          Text\n        </Button>\n      </Space>\n      <Space size=\"large\">\n        <Button disabled type=\"primary\" status=\"danger\">\n          Primary\n        </Button>\n        <Button disabled type=\"secondary\" status=\"danger\">\n          Secondary\n        </Button>\n        <Button disabled type=\"dashed\" status=\"danger\">\n          Dashed\n        </Button>\n        <Button disabled type=\"outline\" status=\"danger\">\n          Outline\n        </Button>\n        <Button disabled type=\"text\" status=\"danger\">\n          Text\n        </Button>\n      </Space>\n      <Space size=\"large\">\n        <Button disabled type=\"primary\" status=\"warning\">\n          Primary\n        </Button>\n        <Button disabled type=\"secondary\" status=\"warning\">\n          Secondary\n        </Button>\n        <Button disabled type=\"dashed\" status=\"warning\">\n          Dashed\n        </Button>\n        <Button disabled type=\"outline\" status=\"warning\">\n          Outline\n        </Button>\n        <Button disabled type=\"text\" status=\"warning\">\n          Text\n        </Button>\n      </Space>\n      <Space size=\"large\">\n        <Button disabled type=\"primary\" status=\"success\">\n          Primary\n        </Button>\n        <Button disabled type=\"secondary\" status=\"success\">\n          Secondary\n        </Button>\n        <Button disabled type=\"dashed\" status=\"success\">\n          Dashed\n        </Button>\n        <Button disabled type=\"outline\" status=\"success\">\n          Outline\n        </Button>\n        <Button disabled type=\"text\" status=\"success\">\n          Text\n        </Button>\n      </Space>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "禁用按钮",
  "zh-CN_desc": "<p>按钮的禁用状态。</p>",
  "en-US_desc": "<p>The disabled state of the button.</p>",
  "en-US_title": "Disabled",
  component: () => <Demo5 />
}, {
  source: "import { Button, Space } from 'arco-design-solid';\nimport { createSignal } from 'solid-js';\nconst Test = () => {\n  const [loading, setLoading] = createSignal(false);\n  return (\n    <Space wrap align=\"center\">\n      <Button\n        type=\"primary\"\n        loading={loading()}\n        onClick={() => {\n          setLoading(true);\n          setTimeout(() => {\n            setLoading(false);\n          }, 2000);\n        }}\n      >\n        Click it\n      </Button>\n      <Button loading type=\"primary\">\n        Success\n      </Button>\n\n      <Button loading type=\"secondary\">\n        Warning\n      </Button>\n      <Button status=\"success\" loading type=\"secondary\">\n        Success\n      </Button>\n      <Button status=\"danger\" loading type=\"secondary\">\n        Danger\n      </Button>\n      <Button status=\"warning\" loading type=\"outline\">\n        Warning\n      </Button>\n      <Button status=\"success\" loading type=\"outline\">\n        Warning\n      </Button>\n      <Button status=\"danger\" loading type=\"outline\">\n        Danger\n      </Button>\n      <Button status=\"warning\" loading type=\"text\">\n        Warning\n      </Button>\n      <Button status=\"success\" loading type=\"text\">\n        Success\n      </Button>\n      <Button status=\"danger\" loading type=\"text\">\n        Danger\n      </Button>\n      <Button status=\"warning\" loading type=\"dashed\">\n        Warning\n      </Button>\n      <Button status=\"success\" loading type=\"dashed\">\n        Success\n      </Button>\n      <Button status=\"danger\" loading type=\"dashed\">\n        Danger\n      </Button>\n      <Button status=\"danger\" loading shape=\"circle\" type=\"dashed\"></Button>\n      <Button status=\"danger\" loading shape=\"circle\" type=\"dashed\" size=\"mini\"></Button>\n    </Space>\n  );\n};\nexport default Test;\n",
  "zh-CN_title": "加载中按钮",
  "zh-CN_desc": "<p>通过设置<code>loading</code>可以让一个按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。</p>",
  "en-US_desc": "<p>A button can be on loading state by setting <code>loading</code>. Click events are not triggered when buttons are on loading state.</p>",
  "en-US_title": "Loading",
  component: () => <Demo6 />
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
