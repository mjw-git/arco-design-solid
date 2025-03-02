import { Space, Button } from 'arco-design-solid';

function App() {
  return (
    <div>
      <Space align="start" size="large">
        <Button size="mini" type="primary">
          Item1
        </Button>
        <Button type="primary">Item2</Button>
        <Button size="small" type="primary">
          Item3
        </Button>
      </Space>
    </div>
  );
}

export default App;
