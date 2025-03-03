import { Avatar, Button, Space } from 'arco-design-solid';
import { createSignal } from 'solid-js';

function App() {
  const [index, setIndex] = createSignal(0);
  const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];
  return (
    <Space>
      <Avatar>{list[index()]}</Avatar>
      <Button type="secondary" onClick={() => setIndex(index() >= 4 ? 0 : index() + 1)}>
        Change
      </Button>
    </Space>
  );
}

export default App;
