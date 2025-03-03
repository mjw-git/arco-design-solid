import { Badge, Avatar, Space } from 'arco-design-solid';
import { IconUser } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge count={100} maxCount={10}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge count={100}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge count={1000} maxCount={999}>
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>
  );
};

export default App;
