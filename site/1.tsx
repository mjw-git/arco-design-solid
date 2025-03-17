import configContext from '@/context/configContext';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

import xml from 'highlight.js/lib/languages/xml';
// 只注册 typescript 语言（它包含了 TSX/JSX 的支持）
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
import { Button, Input, Space, Radio, Select, Typography, Grid, Divider } from "arco-design-solid";
import { IconCode, IconClockCircle, IconSearch, IconInfoCircle, IconUser, IconMinus } from "arco-solid-icon";
import { For, useContext, createSignal } from "solid-js";
const Demo0 = () => {
  return <>
      <Input style={{
      width: '350px'
    }} allowClear placeholder="Enter something" />
    </>;
};
const Demo1 = () => {
  return <Space wrap>
      <Input style={{
      width: '350px'
    }} status="error" placeholder="error status" />
      <Input style={{
      width: '350px'
    }} status="warning" placeholder="warning status" />
      <Input style={{
      width: '350px'
    }} disabled placeholder="disabled input" />
    </Space>;
};
const RadioGroup = Radio.Group;
const InputSearch = Input.Search;
const Demo2 = () => {
  const [size, setSize] = createSignal('default');
  const handleChange = val => {
    setSize(val);
  };
  return <div>
      <RadioGroup type="button" mode="fill" name="size" value={size()} onChange={handleChange} style={{
      'margin-bottom': '24px'
    }}>
        {['mini', 'small', 'default', 'large'].map(x => {
        return <Radio value={x}>{x}</Radio>;
      })}
      </RadioGroup>
      <div>
        <Input size={size()} style={{
        width: '350px',
        margin: '12px'
      }} prefix={<IconClockCircle />} placeholder="Enter something" />
        <Input size={size()} style={{
        width: '350px',
        margin: '12px'
      }} suffix={<IconInfoCircle />} placeholder="Enter something" />
      </div>
      <div>
        <Input size={size()} style={{
        width: '350px',
        margin: '12px'
      }} addAfter="KG" placeholder="Enter something" />
        <Input size={size()} style={{
        width: '350px',
        margin: '12px'
      }} addBefore="+86" placeholder="Enter phone number" />
      </div>
      <div>
        <Input size={size()} style={{
        width: '350px',
        margin: '12px'
      }} addBefore="+86" addAfter={<IconSearch />} prefix={<IconClockCircle />} suffix={<IconInfoCircle />} allowClear placeholder="Enter phone number" />
        <InputSearch onSearch={e => console.log(e)} size={size()} placeholder="Enter something" style={{
        width: '350px',
        margin: '12px'
      }} searchButton={true} />
        <InputSearch allowClear onSearch={e => console.log(e)} size={size()} placeholder="Enter something" style={{
        width: '350px',
        margin: '12px'
      }} searchButton={true} />
      </div>
    </div>;
};
const Demo3 = () => {
  return <Space direction="vertical">
      <Space wrap>
        <Input style={{
        width: '350px'
      }} addAfter="RMB" placeholder="Enter amount" />
        <Input style={{
        width: '350px'
      }} addBefore="+86" placeholder="Enter phone number" />
      </Space>
      <Space wrap>
        <Input style={{
        width: '350px'
      }} addBefore="www." addAfter=".com" placeholder="Enter host" />
      </Space>
    </Space>;
};
const Demo4 = () => {
  return <Space direction="vertical">
      <Space wrap>
        <Input style={{
        width: '350px'
      }} prefix={<IconUser />} placeholder="Enter something" />
        <Input allowClear style={{
        width: '350px'
      }} suffix={<IconInfoCircle />} placeholder="Enter something" />
      </Space>
      <Space wrap>
        <Input style={{
        width: '350px'
      }} prefix={<IconUser />} suffix={<IconInfoCircle />} placeholder="Enter something" />
        <Input style={{
        width: '350px'
      }} addBefore="+86" addAfter={<IconSearch />} prefix={<IconUser />} suffix={<IconInfoCircle />} allowClear placeholder="Enter something" />
      </Space>
    </Space>;
};
// const InputSearch = Input.Search;

const Demo5 = () => {
  return <Space wrap>
      <InputSearch loading placeholder="Enter keyword to search" style={{
      width: '350px'
    }} />
      <InputSearch searchButton loading defaultValue="Search content" placeholder="Enter keyword to search" style={{
      width: '350px'
    }} />
      <InputSearch searchButton="Search" loading defaultValue="Search content" placeholder="Enter keyword to search" style={{
      width: '350px'
    }} />
    </Space>;
};
// const InputSearch = Input.Search;

const Demo6 = () => {
  return <Space wrap>
      <InputSearch allowClear placeholder="Enter keyword to search" style={{
      width: '350px'
    }} />
      <InputSearch searchButton defaultValue="Search content" placeholder="Enter keyword to search" style={{
      width: '350px'
    }} />
      <InputSearch searchButton="Search" defaultValue="Search content" placeholder="Enter keyword to search" style={{
      width: '350px'
    }} />
    </Space>;
};
const Demo7 = () => {
  return <div>
      <Grid.Row>
        <div style={{
        'margin-right': '24px',
        width: '360px',
        display: 'inline-block',
        'margin-bottom': '24px'
      }}>
          <Input.Group>
            <Input style={{
            width: '24%',
            'margin-right': '8px'
          }} value="010" readOnly />
            <Input style={{
            width: '60%'
          }} placeholder="Phone number" />
          </Input.Group>
        </div>
        <div style={{
        'margin-right': '24px',
        width: '360px',
        display: 'inline-block',
        'margin-bottom': '24px'
      }}>
          <Input.Group>
            <Input style={{
            width: '24%',
            'margin-right': '8px'
          }} value="010" readOnly />
            <IconMinus style={{
            color: 'var(--color-text-1)'
          }} />
            <Input style={{
            width: '60%',
            'margin-left': '8px'
          }} defaultValue="8899887" placeholder="Phone number" />
          </Input.Group>
        </div>
      </Grid.Row>
    </div>;
};
function Demo8() {
  return <Space direction="vertical">
      <Space align="start" size={24}>
        <Input maxLength={10} showWordLimit placeholder="Enter no more than 10 letters" style={{
        width: '300px'
      }} />
      </Space>

      <Space align="start" size={24}>
        <Input maxLength={{
        length: 10,
        errorOnly: true
      }} showWordLimit defaultValue="More than 10 letters will be error" style={{
        width: '300px'
      }} />
      </Space>
    </Space>;
}
const TextArea = Input.TextArea;
const Demo9 = () => {
  return <Space wrap>
      <TextArea placeholder="Enter something" style={{
      'min-height': '64px',
      width: '350px'
    }} />
      <TextArea defaultValue="Disabled" style={{
      'min-height': '64px',
      width: '350px'
    }} disabled />
    </Space>;
};
// const TextArea = Input.TextArea;

const Demo10 = () => {
  return <Space wrap align="start">
      <TextArea placeholder="Enter something" defaultValue="This is the contents of the textarea. " autoSize style={{
      width: '350px'
    }} />
      <TextArea allowClear showWordLimit maxLength={100} placeholder="Enter something" autoSize={{
      minRows: 2,
      maxRows: 6
    }} style={{
      width: '350px'
    }} defaultValue="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. " />
    </Space>;
};
const Demo11 = () => {
  return <Space wrap size={20}>
      <div>
        <Typography.Paragraph>trim whitespace when out of focus：</Typography.Paragraph>
        <Input placeholder="Enter something" onChange={v => {
        console.log('current value: ', v);
      }} normalizeTrigger={['onBlur']} normalize={v => v ? v.trim() : v} style={{
        width: '350px'
      }} />
      </div>
      <div>
        <Typography.Paragraph>trim whitespace when press enter：</Typography.Paragraph>
        <Input placeholder="Enter something" onChange={v => {
        console.log('current value: ', v);
      }} normalize={v => v ? v.trim() : v} normalizeTrigger={['onPressEnter']} style={{
        width: '350px'
      }} />
      </div>
    </Space>;
};
const Demo12 = () => {
  return <div>
      <Divider>
        <Typography.Text code>
          {JSON.stringify({
          'min-width': 0,
          'max-width': '500px'
        })}
        </Typography.Text>
      </Divider>

      <Input placeholder="Enter something" autoWidth={{
      'max-width': '500px'
    }} />

      <Divider>
        <Typography.Text code>
          {JSON.stringify({
          'min-width': '300px',
          'max-width': '500px'
        })}
        </Typography.Text>
      </Divider>

      <Input autoWidth={{
      'min-width': '300px',
      'max-width': '500px'
    }} placeholder="Enter something" />
      <br />
      <br />
      <Input placeholder="Enter something" prefix="Prefix" autoWidth={{
      'min-width': '300px',
      'max-width': '500px'
    }} />
      <br />
      <br />
      <Input placeholder="Enter something" addBefore="Before" prefix="Prefix" autoWidth={{
      'min-width': '300px',
      'max-width': '500px'
    }} />
    </div>;
};
const demos = [{
  source: "import { Input } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <>\n      <Input style={{ width: '350px' }} allowClear placeholder=\"Enter something\" />\n    </>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "基本用法",
  "zh-CN_desc": "<p>通过鼠标或键盘输入内容。</p>",
  "en-US_desc": "<p>Input content via mouse or keyboard.</p>",
  "en-US_title": "Basic",
  component: () => <Demo0 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <Space wrap>\n      <Input style={{ width: '350px' }} status=\"error\" placeholder=\"error status\" />\n      <Input style={{ width: '350px' }} status=\"warning\" placeholder=\"warning status\" />\n      <Input style={{ width: '350px' }} disabled placeholder=\"disabled input\" />\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "输入框状态",
  "zh-CN_desc": "<p>不同的输入框状态</p>",
  "en-US_desc": "<p>Different Input status.</p>",
  "en-US_title": "Status",
  component: () => <Demo1 />
}, {
  source: "import { Input, Radio, Select, Typography } from 'arco-design-solid';\nimport { IconClockCircle, IconSearch, IconInfoCircle } from 'arco-solid-icon';\nimport { createSignal } from 'solid-js';\n\nconst RadioGroup = Radio.Group;\nconst InputSearch = Input.Search;\nconst App = () => {\n  const [size, setSize] = createSignal('default');\n  const handleChange = (val) => {\n    setSize(val);\n  };\n  return (\n    <div>\n      <RadioGroup\n        type=\"button\"\n        mode=\"fill\"\n        name=\"size\"\n        value={size()}\n        onChange={handleChange}\n        style={{ 'margin-bottom': '24px' }}\n      >\n        {['mini', 'small', 'default', 'large'].map(x => {\n          return <Radio value={x}>{x}</Radio>;\n        })}\n      </RadioGroup>\n      <div>\n        <Input\n          size={size()}\n          style={{ width: '350px', margin: '12px' }}\n          prefix={<IconClockCircle />}\n          placeholder=\"Enter something\"\n        />\n        <Input\n          size={size()}\n          style={{ width: '350px', margin: '12px' }}\n          suffix={<IconInfoCircle />}\n          placeholder=\"Enter something\"\n        />\n      </div>\n      <div>\n        <Input\n          size={size()}\n          style={{ width: '350px', margin: '12px' }}\n          addAfter=\"KG\"\n          placeholder=\"Enter something\"\n        />\n        <Input\n          size={size()}\n          style={{ width: '350px', margin: '12px' }}\n          addBefore=\"+86\"\n          placeholder=\"Enter phone number\"\n        />\n      </div>\n      <div>\n        <Input\n          size={size()}\n          style={{ width: '350px', margin: '12px' }}\n          addBefore=\"+86\"\n          addAfter={<IconSearch />}\n          prefix={<IconClockCircle />}\n          suffix={<IconInfoCircle />}\n          allowClear\n          placeholder=\"Enter phone number\"\n        />\n        <InputSearch\n          onSearch={e => console.log(e)}\n          size={size()}\n          placeholder=\"Enter something\"\n          style={{ width: '350px', margin: '12px' }}\n          searchButton={true}\n        />\n        <InputSearch\n          allowClear\n          onSearch={e => console.log(e)}\n          size={size()}\n          placeholder=\"Enter something\"\n          style={{ width: '350px', margin: '12px' }}\n          searchButton={true}\n        />\n      </div>\n    </div>\n  );\n};\nexport default App;\n",
  "zh-CN_title": "四种尺寸",
  "zh-CN_desc": "<p>输入框定义了四种默认尺寸（<code>mini</code>,<code>small</code>, <code>default</code>, <code>large</code>），分别为 24px，28px，32px，36px。</p>",
  "en-US_desc": "<p>Input defines four sizes (<code>mini</code>, <code>small</code>, <code>default</code>, <code>large</code>), which are 24px, 28px, 32px, and 36px.</p>",
  "en-US_title": "Size",
  component: () => <Demo2 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <Space direction=\"vertical\">\n      <Space wrap>\n        <Input style={{ width: '350px' }} addAfter=\"RMB\" placeholder=\"Enter amount\" />\n        <Input style={{ width: '350px' }} addBefore=\"+86\" placeholder=\"Enter phone number\" />\n      </Space>\n      <Space wrap>\n        <Input\n          style={{ width: '350px' }}\n          addBefore=\"www.\"\n          addAfter=\".com\"\n          placeholder=\"Enter host\"\n        />\n      </Space>\n    </Space>\n  );\n};\n\nexport default App;\n\n",
  "zh-CN_title": "前置、后置标签",
  "zh-CN_desc": "<p>指定<code>addBefore</code>和<code>addAfter</code>在输入框前后添加元素。</p>",
  "en-US_desc": "<p>Specify <code>addBefore</code>/<code>addAfter</code> to add elements before/after the input box.</p>",
  "en-US_title": "Front/Post Label",
  component: () => <Demo3 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\nimport { IconUser, IconSearch, IconInfoCircle } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <Space direction=\"vertical\">\n      <Space wrap>\n        <Input style={{ width: '350px' }} prefix={<IconUser />} placeholder=\"Enter something\" />\n        <Input\n          allowClear\n          style={{ width: '350px' }}\n          suffix={<IconInfoCircle />}\n          placeholder=\"Enter something\"\n        />\n      </Space>\n      <Space wrap>\n        <Input\n          style={{ width: '350px' }}\n          prefix={<IconUser />}\n          suffix={<IconInfoCircle />}\n          placeholder=\"Enter something\"\n        />\n        <Input\n          style={{ width: '350px' }}\n          addBefore=\"+86\"\n          addAfter={<IconSearch />}\n          prefix={<IconUser />}\n          suffix={<IconInfoCircle />}\n          allowClear\n          placeholder=\"Enter something\"\n        />\n      </Space>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "前后缀",
  "zh-CN_desc": "<p>通过指定<code>prefix</code>和<code>suffix</code>来在输入框内添加前缀和后缀。</p>",
  "en-US_desc": "<p>Add a prefix(suffix) in the input box by specifying <code>prefix</code>(<code>suffix</code>).</p>",
  "en-US_title": "Prefix/Suffix",
  component: () => <Demo4 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\n// const InputSearch = Input.Search;\n\nconst App = () => {\n  return (\n    <Space wrap>\n      <InputSearch loading placeholder=\"Enter keyword to search\" style={{ width: '350px' }} />\n      <InputSearch\n        searchButton\n        loading\n        defaultValue=\"Search content\"\n        placeholder=\"Enter keyword to search\"\n        style={{ width: '350px' }}\n      />\n      <InputSearch\n        searchButton=\"Search\"\n        loading\n        defaultValue=\"Search content\"\n        placeholder=\"Enter keyword to search\"\n        style={{ width: '350px' }}\n      />\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "搜索框 Loading",
  "zh-CN_desc": "<p>通过 <code>loading</code> 属性可以设置搜索框在 <code>onSearch</code> 的时候展示 <code>loading</code>。</p>",
  "en-US_desc": "<p>Through the <code>loading</code> property, you can set the search box to display <code>loading</code> when <code>onSearch</code>.</p>",
  "en-US_title": "Search Box with Loading",
  component: () => <Demo5 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\n// const InputSearch = Input.Search;\n\nconst App = () => {\n  return (\n    <Space wrap>\n      <InputSearch allowClear placeholder=\"Enter keyword to search\" style={{ width: '350px' }} />\n      <InputSearch\n        searchButton\n        defaultValue=\"Search content\"\n        placeholder=\"Enter keyword to search\"\n        style={{ width: '350px' }}\n      />\n      <InputSearch\n        searchButton=\"Search\"\n        defaultValue=\"Search content\"\n        placeholder=\"Enter keyword to search\"\n        style={{ width: '350px' }}\n      />\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "搜索框",
  "zh-CN_desc": "<p>带有搜索按钮的输入框，用于内容检索。</p>",
  "en-US_desc": "<p>Input box with search button for content retrieval.</p>",
  "en-US_title": "Search Box",
  component: () => <Demo6 />
}, {
  source: "import { Input, Grid } from 'arco-design-solid';\nimport { IconMinus } from 'arco-solid-icon';\n\nconst App = () => {\n  return (\n    <div>\n      <Grid.Row>\n        <div\n          style={{\n            'margin-right': '24px',\n            width: '360px',\n            display: 'inline-block',\n            'margin-bottom': '24px',\n          }}\n        >\n          <Input.Group>\n            <Input style={{ width: '24%', 'margin-right': '8px' }} value=\"010\" readOnly />\n            <Input style={{ width: '60%' }} placeholder=\"Phone number\" />\n          </Input.Group>\n        </div>\n        <div\n          style={{\n            'margin-right': '24px',\n            width: '360px',\n            display: 'inline-block',\n            'margin-bottom': '24px',\n          }}\n        >\n          <Input.Group>\n            <Input style={{ width: '24%', 'margin-right': '8px' }} value=\"010\" readOnly />\n            <IconMinus style={{ color: 'var(--color-text-1)' }} />\n            <Input\n              style={{ width: '60%', 'margin-left': '8px' }}\n              defaultValue=\"8899887\"\n              placeholder=\"Phone number\"\n            />\n          </Input.Group>\n        </div>\n      </Grid.Row>\n    </div>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "输入框组合",
  "zh-CN_desc": "<p>通过鼠标或键盘输入内容。</p>",
  "en-US_desc": "<p>Input content via mouse or keyboard.</p>",
  "en-US_title": "Input Group",
  component: () => <Demo7 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\n\nfunction App() {\n  return (\n    <Space direction=\"vertical\">\n      <Space align=\"start\" size={24}>\n        <Input\n          maxLength={10}\n          showWordLimit\n          placeholder=\"Enter no more than 10 letters\"\n          style={{ width: '300px' }}\n        />\n      </Space>\n\n      <Space align=\"start\" size={24}>\n        <Input\n          maxLength={{ length: 10, errorOnly: true }}\n          showWordLimit\n          defaultValue=\"More than 10 letters will be error\"\n          style={{ width: '300px' }}\n        />\n      </Space>\n    </Space>\n  );\n}\n\nexport default App;\n",
  "zh-CN_title": "字数统计",
  "zh-CN_desc": "<p>设置 <code>maxLength</code> 可以限制最大字数，配合 <code>showWordLimit</code> 可以显示字数统计。</p>",
  "en-US_desc": "<p>Set <code>maxLength</code> to limit the maximum number of words, and use <code>showWordLimit</code> to display word count statistics.</p>",
  "en-US_title": "Length Limit",
  component: () => <Demo8 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\nconst TextArea = Input.TextArea;\n\nconst App = () => {\n  return (\n    <Space wrap>\n      <TextArea placeholder=\"Enter something\" style={{ 'min-height': '64px', width: '350px' }} />\n      <TextArea defaultValue=\"Disabled\" style={{ 'min-height': '64px', width: '350px' }} disabled />\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "文本域",
  "zh-CN_desc": "<p>可以用于多行输入。</p>",
  "en-US_desc": "<p>A textarea input example.</p>",
  "en-US_title": "Textarea",
  component: () => <Demo9 />
}, {
  source: "import { Input, Space } from 'arco-design-solid';\n// const TextArea = Input.TextArea;\n\nconst App = () => {\n  return (\n    <Space wrap align=\"start\">\n      <TextArea\n        placeholder=\"Enter something\"\n        defaultValue=\"This is the contents of the textarea. \"\n        autoSize\n        style={{ width: '350px' }}\n      />\n      <TextArea\n        allowClear\n        showWordLimit\n        maxLength={100}\n        placeholder=\"Enter something\"\n        autoSize={{ minRows: 2, maxRows: 6 }}\n        style={{ width: '350px' }}\n        defaultValue=\"This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. \"\n      />\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "适应文本高度文本域",
  "zh-CN_desc": "<p>指定 <code>autoSize</code>，文本域会自动根据输入的文本调整文本域的高度。如果指定<code>autoSize={{ minRows, maxRows }}</code>，也能指定最小行数和最大行数。</p>",
  "en-US_desc": "<p>Specify <code>autoSize</code>, the text field will automatically adjust the height of the text field according to the input text. If you specify <code>autoSize={{ minRows, maxRows }}</code>, you can also specify the minimum/maximum number of rows.</p>",
  "en-US_title": "Autosize Textarea",
  component: () => <Demo10 />
}, {
  source: "import { Input, Space, Typography } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <Space wrap size={20}>\n      <div>\n        <Typography.Paragraph>trim whitespace when out of focus：</Typography.Paragraph>\n        <Input\n          placeholder=\"Enter something\"\n          onChange={v => {\n            console.log('current value: ', v);\n          }}\n          normalizeTrigger={['onBlur']}\n          normalize={v => (v ? v.trim() : v)}\n          style={{ width: '350px' }}\n        />\n      </div>\n      <div>\n        <Typography.Paragraph>trim whitespace when press enter：</Typography.Paragraph>\n        <Input\n          placeholder=\"Enter something\"\n          onChange={v => {\n            console.log('current value: ', v);\n          }}\n          normalize={v => (v ? v.trim() : v)}\n          normalizeTrigger={['onPressEnter']}\n          style={{ width: '350px' }}\n        />\n      </div>\n    </Space>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "格式化输入值",
  "zh-CN_desc": "<p>在指定时机对用户输入的值进行格式化处理，前后值不一致时，会触发 onChange</p>",
  "en-US_desc": "<p>Format the value entered by the user at the specified time, and when the previous and subsequent values are inconsistent, onChange will be triggered</p>",
  "en-US_title": "Normalize Value",
  component: () => <Demo11 />
}, {
  source: "import { Input, Divider, Typography } from 'arco-design-solid';\n\nconst App = () => {\n  return (\n    <div>\n      <Divider>\n        <Typography.Text code>\n          {JSON.stringify({ 'min-width': 0, 'max-width': '500px' })}\n        </Typography.Text>\n      </Divider>\n\n      <Input placeholder=\"Enter something\" autoWidth={{ 'max-width': '500px' }} />\n\n      <Divider>\n        <Typography.Text code>\n          {JSON.stringify({ 'min-width': '300px', 'max-width': '500px' })}\n        </Typography.Text>\n      </Divider>\n\n      <Input\n        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}\n        placeholder=\"Enter something\"\n      />\n      <br />\n      <br />\n      <Input\n        placeholder=\"Enter something\"\n        prefix=\"Prefix\"\n        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}\n      />\n      <br />\n      <br />\n      <Input\n        placeholder=\"Enter something\"\n        addBefore=\"Before\"\n        prefix=\"Prefix\"\n        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}\n      />\n    </div>\n  );\n};\n\nexport default App;\n",
  "zh-CN_title": "宽度自适应",
  "zh-CN_desc": "<p>通过 <code>autoWidth</code> 属性可以设置 <code>Input</code> 的宽度跟随文字自适应</p>",
  "en-US_desc": "<p>Through the <code>autoWidth</code> attribute, you can set the width of <code>Input</code> to adapt to the text.</p>",
  "en-US_title": "Auto Width",
  component: () => <Demo12 />
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
