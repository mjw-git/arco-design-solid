import configContext from '@/context/configContext';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

import xml from 'highlight.js/lib/languages/xml';
// 只注册 typescript 语言（它包含了 TSX/JSX 的支持）
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
import { Button, Badge, Avatar, Space, Link, Divider } from "arco-design-solid";
import { IconCode, IconClockCircle, IconNotification, IconUser } from "arco-solid-icon";
import { For, useContext, createSignal } from "solid-js";
const Demo0 = () => {
  return <Space size={40}>
      <Badge count={9}>
        <Avatar shape="square" />
      </Badge>
      <Badge count={9} dot dotStyle={{
      width: '10px',
      height: '10px'
    }}>
        <Avatar shape="square" />
      </Badge>
      <Badge count={<IconClockCircle style={{
      'vertical-align': 'middle',
      color: 'var(--color-text-2)'
    }} />} dotStyle={{
      height: '16px',
      width: '16px',
      'font-size': '14px'
    }}>
        <Avatar shape="square" />
      </Badge>
    </Space>;
};
const Demo1 = () => {
  return <Space size={40}>
      <Badge count={2} />
      <Badge count={2} dotStyle={{
      background: '#E5E6EB',
      color: '#86909C'
    }} />
      <Badge count={16} />
      <Badge maxCount={99} count={1000} />
    </Space>;
};
const Demo2 = () => {
  return <Space size={40}>
      <Badge count={9} dot offset={[6, -2]}>
        <Link href="#">Link</Link>
      </Badge>
      <Badge count={9} dot offset={[2, -2]}>
        <IconNotification style={{
        color: '#888',
        'font-size': '18px',
        'vertical-align': '-3px'
      }} />
      </Badge>
    </Space>;
};
const Demo3 = () => {
  return <Space size={40}>
      <Badge text="NEW">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge text="HOT">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>;
};
const Demo4 = () => {
  return <Space size={40}>
      <Badge count={100} maxCount={10}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge count={100}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge count={1000} maxCount={999}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>;
};
const COLORS = ['red', 'orangered', 'orange', 'gold', 'lime', 'green', 'cyan', 'arcoblue', 'purple', 'pinkpurple', 'magenta', 'gray'];
const COLORS_CUSTOM = ['#F53F3F', '#7816FF', '#00B42A', '#165DFF', '#FF7D00', '#EB0AA4', '#7BC616', '#86909C', '#B71DE8', '#0FC6C2', '#FFB400', '#168CFF', '#FF5722'];
const Demo6 = () => {
  return <div>
      <div>
        {COLORS.map(color => {
        return <Badge color={color} text={color} style={{
          'margin-right': '24px'
        }}></Badge>;
      })}
      </div>
      <br />
      <div>
        {COLORS_CUSTOM.map(color => {
        return <Badge color={color} text={color} style={{
          'margin-right': '24px'
        }}></Badge>;
      })}
      </div>
    </div>;
};
const demos = [{
  source: "import { Badge, Avatar, Space } from 'arco-design-solid';\nimport { IconClockCircle } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space size={40}>\n      <Badge count={9}>\n        <Avatar shape=\"square\" />\n      </Badge>\n      <Badge count={9} dot dotStyle={{ width: '10px', height: '10px' }}>\n        <Avatar shape=\"square\" />\n      </Badge>\n      <Badge\n        count={\n          <IconClockCircle style={{ 'vertical-align': 'middle', color: 'var(--color-text-2)' }} />\n        }\n        dotStyle={{\n          height: '16px',\n          width: '16px',\n          'font-size': '14px',\n        }}\n      >\n        <Avatar shape=\"square\" />\n      </Badge>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "基础用法",
  "zh-CN_desc": "<p>基础的用法。只需指定 <code>count</code>，即可显示徽标。</p>",
  "en-US_desc": "<p>Basic usage. Just specify <code>count</code> to display the badge.</p>",
  "en-US_title": "Basic",
  component: () => <Demo0 />
}, {
  source: "import { Badge, Space } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <Space size={40}>\n      <Badge count={2} />\n      <Badge count={2} dotStyle={{ background: '#E5E6EB', color: '#86909C' }} />\n      <Badge count={16} />\n      <Badge maxCount={99} count={1000} />\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "独立使用",
  "zh-CN_desc": "<p><code>children</code> 为空时，将会独立展示徽标。</p>",
  "en-US_desc": "<p>Used in standalone when children is empty.</p>",
  "en-US_title": "Standalone",
  component: () => <Demo1 />
}, {
  source: "import { Badge, Link, Space } from 'arco-design-solid';\nimport { IconNotification } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space size={40}>\n      <Badge count={9} dot offset={[6, -2]}>\n        <Link href=\"#\">Link</Link>\n      </Badge>\n      <Badge count={9} dot offset={[2, -2]}>\n        <IconNotification\n          style={{\n            color: '#888',\n            'font-size': '18px',\n            'vertical-align': '-3px',\n          }}\n        />\n      </Badge>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "小红点",
  "zh-CN_desc": "<p>设置 <code>dot</code>，即可只显示小红点而不显示数字。<code>count > 0</code> 时才显示。</p>",
  "en-US_desc": "<p>A red dot will be displayed instead of the count when <code>dot=true</code>. If count equals 0, the dot will be hidden.</p>",
  "en-US_title": "Red Badge",
  component: () => <Demo2 />
}, {
  source: "import { Badge, Avatar, Space } from 'arco-design-solid';\nimport { IconUser } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space size={40}>\n      <Badge text=\"NEW\">\n        <Avatar shape=\"square\">\n          <span>\n            <IconUser />\n          </span>\n        </Avatar>\n      </Badge>\n      <Badge text=\"HOT\">\n        <Avatar shape=\"square\">\n          <span>\n            <IconUser />\n          </span>\n        </Avatar>\n      </Badge>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "文本内容",
  "zh-CN_desc": "<p>设置 <code>text</code>，可设置自定义提示内容。</p>",
  "en-US_desc": "<p>Customize the content.</p>",
  "en-US_title": "Text",
  component: () => <Demo3 />
}, {
  source: "import { Badge, Avatar, Space } from 'arco-design-solid';\nimport { IconUser } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space size={40}>\n      <Badge count={100} maxCount={10}>\n        <Avatar shape=\"square\">\n          <span>\n            <IconUser />\n          </span>\n        </Avatar>\n      </Badge>\n      <Badge count={100}>\n        <Avatar shape=\"square\">\n          <span>\n            <IconUser />\n          </span>\n        </Avatar>\n      </Badge>\n      <Badge count={1000} maxCount={999}>\n        <Avatar shape=\"square\">\n          <span>\n            <IconUser />\n          </span>\n        </Avatar>\n      </Badge>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "最大值",
  "zh-CN_desc": "<p>设置 <code>maxCount</code>，可以限制最大显示的徽标数值，超过将会加 <code>+</code> 后缀。<code>maxCount</code> 默认为 <code>99</code>。</p>",
  "en-US_desc": "<p>If the count is larger than <code>maxCount</code>, <code>${maxCount}+</code> will be displayed. The default value of <code>maxCount</code> is <code>99</code>.</p>",
  "en-US_title": "Max Count",
  component: () => <Demo4 />
}, {
  source: "import { Badge, Divider } from 'arco-design-solid';\nconst COLORS = [\n  'red',\n  'orangered',\n  'orange',\n  'gold',\n  'lime',\n  'green',\n  'cyan',\n  'arcoblue',\n  'purple',\n  'pinkpurple',\n  'magenta',\n  'gray',\n];\nconst COLORS_CUSTOM = [\n  '#F53F3F',\n  '#7816FF',\n  '#00B42A',\n  '#165DFF',\n  '#FF7D00',\n  '#EB0AA4',\n  '#7BC616',\n  '#86909C',\n  '#B71DE8',\n  '#0FC6C2',\n  '#FFB400',\n  '#168CFF',\n  '#FF5722',\n];\n\nconst App = () => {\n  return (\n    <div>\n      <div>\n        {COLORS.map(color => {\n          return <Badge color={color} text={color} style={{ 'margin-right': '24px' }}></Badge>;\n        })}\n      </div>\n      <br />\n      <div>\n        {COLORS_CUSTOM.map(color => {\n          return <Badge color={color} text={color} style={{ 'margin-right': '24px' }}></Badge>;\n        })}\n      </div>\n    </div>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "颜色",
  "zh-CN_desc": "<p>我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，<code>color</code> 字段也可以设置自定义色值。</p>",
  "en-US_desc": "<p>We provide a variety of preset colors for the badge. You can also set a custom color with <code>color</code> property.</p>",
  "en-US_title": "Color",
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
