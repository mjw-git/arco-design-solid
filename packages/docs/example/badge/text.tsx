import { Badge, Avatar, Space } from 'arco-design-solid';
import { IconUser } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge text="NEW">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge text="HOT">
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
