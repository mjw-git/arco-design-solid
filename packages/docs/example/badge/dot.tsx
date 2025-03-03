import { Badge, Link, Space } from 'arco-design-solid';
import { IconNotification } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge count={9} dot offset={[6, -2]}>
        <Link href="#">Link</Link>
      </Badge>
      <Badge count={9} dot offset={[2, -2]}>
        <IconNotification
          style={{
            color: '#888',
            'font-size': '18px',
            'vertical-align': '-3px',
          }}
        />
      </Badge>
    </Space>
  );
};

export default App;
