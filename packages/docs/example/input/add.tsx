import { Input, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: '350px' }} addAfter="RMB" placeholder="Enter amount" />
        <Input style={{ width: '350px' }} addBefore="+86" placeholder="Enter phone number" />
      </Space>
      <Space wrap>
        <Input
          style={{ width: '350px' }}
          addBefore="www."
          addAfter=".com"
          placeholder="Enter host"
        />
      </Space>
    </Space>
  );
};

export default App;
