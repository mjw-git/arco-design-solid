import { Space, Button, Typography } from 'arco-design-solid';

const App = () => {
  return (
    <Space align="center" size={8}>
      <Typography.Text>Space:</Typography.Text>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
    </Space>
  );
};

export default App;
