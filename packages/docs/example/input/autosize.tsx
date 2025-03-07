import { Input, Space } from 'arco-design-solid';
const TextArea = Input.TextArea;

const App = () => {
  return (
    <Space wrap align="start">
      <TextArea
        placeholder="Enter something"
        defaultValue="This is the contents of the textarea. "
        autoSize
        style={{ width: '350px' }}
      />
      <TextArea
        allowClear
        showWordLimit
        maxLength={100}
        placeholder="Enter something"
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ width: '350px' }}
        defaultValue="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. "
      />
    </Space>
  );
};

export default App;
