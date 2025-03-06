import { Input, Space } from 'arco-design-solid';
import { IconUser, IconSearch, IconInfoCircle } from 'arco-solid-icon';

const App = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: '350px' }} prefix={<IconUser />} placeholder="Enter something" />
        <Input
          allowClear
          style={{ width: '350px' }}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
      </Space>
      <Space wrap>
        <Input
          style={{ width: '350px' }}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
        <Input
          style={{ width: '350px' }}
          addBefore="+86"
          addAfter={<IconSearch />}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          allowClear
          placeholder="Enter something"
        />
      </Space>
    </Space>
  );
};

export default App;
