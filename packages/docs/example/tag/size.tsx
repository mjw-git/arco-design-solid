import { Tag, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space size="large">
      <Tag size="large" closable>
        Large
      </Tag>
      <Tag size="medium" closable>
        Medium
      </Tag>
      <Tag size="default" closable>
        default
      </Tag>
      <Tag size="small" closable>
        small
      </Tag>
    </Space>
  );
};

export default App;
