import { Space, Link, Divider } from 'arco-design-solid';

const App = () => {
  return (
    <Space split={<Divider type="vertical" />}>
      <Link>Link 1</Link>
      <Link>Link 2</Link>
      <Link>Link 3</Link>
    </Space>
  );
};

export default App;
