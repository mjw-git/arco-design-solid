import { Avatar, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Avatar size={64}>Arco</Avatar>
        <Avatar size={40}>Arco</Avatar>
        <Avatar size={32}>Arco</Avatar>
        <Avatar size={24}>Arco</Avatar>
      </Space>
      <Space size="large">
        <Avatar size={64} shape="square">
          Arco
        </Avatar>
        <Avatar size={40} shape="square">
          Arco
        </Avatar>
        <Avatar size={32} shape="square">
          Arco
        </Avatar>
        <Avatar size={24} shape="square">
          Arco
        </Avatar>
      </Space>
    </Space>
  );
};

export default App;
