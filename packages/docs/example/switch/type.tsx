import { Switch, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space size="large">
      <Switch />
      <Switch type="round" />
      <Switch type="line" />
    </Space>
  );
};

export default App;
