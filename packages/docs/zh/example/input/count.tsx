import { Input, Space } from 'arco-design-solid';

function App() {
  return (
    <Space direction="vertical">
      <Space align="start" size={24}>
        <Input
          maxLength={10}
          showWordLimit
          placeholder="Enter no more than 10 letters"
          style={{ width: '300px' }}
        />
      </Space>

      <Space align="start" size={24}>
        <Input
          maxLength={{ length: 10, errorOnly: true }}
          showWordLimit
          defaultValue="More than 10 letters will be error"
          style={{ width: '300px' }}
        />
      </Space>
    </Space>
  );
}

export default App;
