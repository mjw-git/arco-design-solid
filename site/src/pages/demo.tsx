import configContext from '@/context/configContext';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
// 只注册 typescript 语言（它包含了 TSX/JSX 的支持）
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
const AnchorLink = Anchor.Link;

import { Button, Typography, Divider, Anchor } from 'arco-design-solid';
import { IconCode } from 'arco-solid-icon';
import { For, useContext, createSignal } from 'solid-js';
const Demo0 = () => {
  return (
    <div class="divider-demo">
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider />
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider
        style={{
          'border-bottom-style': 'dashed',
        }}
      />
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider
        style={{
          'border-bottom-width': '2px',
          'border-bottom-style': 'dotted',
        }}
      />
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider class="half-divider" />
    </div>
  );
};
const orientations = ['left', 'center', 'right'] as const;
const Demo1 = () => {
  return (
    <div class="divider-demo">
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider orientation={orientations[0]}>Text</Divider>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider orientation={orientations[1]}>Text</Divider>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object.
      </Typography.Paragraph>
      <Divider orientation={orientations[2]}>Text</Divider>
    </div>
  );
};
const { Text } = Typography;
const Demo2 = () => {
  return (
    <div class="divider-demo">
      <Text>Item 1</Text>
      <Divider type="vertical">11</Divider>
      <Text>Item 2</Text>
      <Divider type="vertical" />
      <Text>Item 3</Text>
    </div>
  );
};
const demos = [
  {
    source:
      "import { Typography, Divider } from 'arco-design-solid';\nconst Test = () => {\n  return (\n    <div class=\"divider-demo\">\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider />\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider\n        style={{\n          'border-bottom-style': 'dashed',\n        }}\n      />\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider\n        style={{\n          'border-bottom-width': '2px',\n          'border-bottom-style': 'dotted',\n        }}\n      />\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider class=\"half-divider\" />\n    </div>\n  );\n};\nexport default Test;\n",
    'zh-CN_title': '基本用法',
    css_code:
      '.divider-demo {\n  box-sizing: border-box;\n  width: 560px;\n  padding: 24px;\n  border: 30px solid rgb(var(--gray-2));\n}\n\n.divider-demo-flex-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.divider-demo .avatar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  margin-right: 16px;\n  border-radius: 50%;\n  font-size: 16px;\n  background-color: var(--color-fill-3);\n  color: var(--color-text-2);\n}\n\n.divider-demo .content {\n  flex: 1;\n  font-size: 12px;\n  line-height: 20px;\n  color: var(--color-text-2);\n}\n\n.divider-demo .title {\n  margin-bottom: 2px;\n  font-size: 16px;\n  line-height: 24px;\n  color: #1d2129;\n}\n\n.divider-demo .half-divider {\n  left: 55px;\n  min-width: auto;\n  width: calc(100% - 55px);\n  margin: 16px 0;\n}\n',
    'zh-CN_desc': '<p>对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。</p>',
    'en-US_desc':
      '<p>Can be used to separate paragraphs of different chapters. The default is a horizontal dividing line. Text can be added within divider.</p>',
    'en-US_title': 'Basic',
    component: () => <Demo0 />,
  },
  {
    source:
      "import { Divider, Typography } from 'arco-design-solid';\nconst orientations = ['left', 'center', 'right'];\nconst App = () => {\n  return (\n    <div class=\"divider-demo\">\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider orientation={orientations[0]}>Text</Divider>\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider orientation={orientations[1]}>Text</Divider>\n      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>\n      <Divider orientation={orientations[2]}>Text</Divider>\n    </div>\n  );\n};\n\nexport default App;\n",
    'zh-CN_title': '带有文字的分割线',
    css_code:
      '.divider-demo {\n  box-sizing: border-box;\n  width: 560px;\n  padding: 24px;\n  border: 30px solid rgb(var(--gray-2));\n}\n',
    'zh-CN_desc': '<p>通过 <code>orientation</code> 指定分割线文字的位置。</p>',
    'en-US_desc':
      '<p>Specify the position of the texts within divider by <code>orientation</code>.</p>',
    'en-US_title': 'With Text',
    component: () => <Demo1 />,
  },
  {
    source:
      'import { Divider, Typography } from \'arco-design-solid\';\nconst { Text } = Typography;\nconst App = () => {\n  return (\n    <div class="divider-demo">\n      <Text>Item 1</Text>\n      <Divider type="vertical">11</Divider>\n      <Text>Item 2</Text>\n      <Divider type="vertical" />\n      <Text>Item 3</Text>\n    </div>\n  );\n};\n\nexport default App;\n',
    'zh-CN_title': '竖直分割线',
    css_code:
      '.divider-demo {\n  box-sizing: border-box;\n  width: 560px;\n  padding: 24px;\n  border: 30px solid rgb(var(--gray-2));\n}\n',
    'zh-CN_desc':
      '<p>指定 <code>type</code> 为 <code>vertical</code> 即可使用竖直分割线。竖直分割线不能带文字。</p>',
    'en-US_desc':
      "<p>Specify <code>type</code> as <code>vertical</code> to make it vertical. Vertical dividers can't contain texts.</p>",
    'en-US_title': 'Vertical divider',
    component: () => <Demo2 />,
  },
];

const App = () => {
  const [show, setShow] = createSignal([]);
  const context = useContext(configContext);

  return (
    <>
      <For each={demos}>
        {demo => {
          const highlightedCssCode = hljs.highlight(demo.css_code, {
            language: 'css',
          }).value;
          const highlightedCode = hljs.highlight(demo.source, {
            language: 'typescript',
          }).value;
          const split_list = demo['en-US_title'].split(' ');
          const id = split_list.length > 1 ? `${split_list.join('-')}` : demo['en-US_title'];
          return (
            <div class="codebox-wrapper" id={id}>
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
                  <pre innerHTML={highlightedCode}></pre>
                </div>

                {demo.css_code && (
                  <div class={`content-css-design`}>
                    <pre innerHTML={highlightedCssCode}></pre>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </For>
      <div class="ac-anchor-content">
        <Anchor lineless>
          <For each={demos}>
            {demo => {
              const split_list = demo[`${context?.lang?.()}_title`].split(' ');
              const id = split_list.length > 1 ? `${split_list.join('-')}` : demo['en-US_title'];
              return <AnchorLink href={`#${id}`} title={demo[`${context?.lang?.()}_title`]} />;
            }}
          </For>
        </Anchor>
      </div>
    </>
  );
};
export default App;
