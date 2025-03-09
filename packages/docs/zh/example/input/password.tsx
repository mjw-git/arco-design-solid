import { Input, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space wrap>
      <Input.Password defaultValue="password" style={{ width: '350px' }} />
      <Input.Password
        defaultValue="password"
        defaultVisibility={true}
        placeholder="Enter password"
        style={{ width: '350px' }}
      />
    </Space>
  );
};

export default App;
