import { Badge, Avatar, Space } from 'arco-design-solid';
import { IconClockCircle } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge count={9}>
        <Avatar shape="square" />
      </Badge>
      <Badge count={9} dot dotStyle={{ width: '10px', height: '10px' }}>
        <Avatar shape="square" />
      </Badge>
      <Badge
        count={
          <IconClockCircle style={{ 'vertical-align': 'middle', color: 'var(--color-text-2)' }} />
        }
        dotStyle={{
          height: '16px',
          width: '16px',
          'font-size': '14px',
        }}
      >
        <Avatar shape="square" />
      </Badge>
    </Space>
  );
};

export default App;
