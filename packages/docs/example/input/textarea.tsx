import { Input, Space } from 'arco-design-solid';
const TextArea = Input.TextArea;

const App = () => {
  return (
    <Space wrap>
      <TextArea placeholder="Enter something" style={{ 'min-height': '64px', width: '350px' }} />
      <TextArea defaultValue="Disabled" style={{ 'min-height': '64px', width: '350px' }} disabled />
    </Space>
  );
};

export default App;
