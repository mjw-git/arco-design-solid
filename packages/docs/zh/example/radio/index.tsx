import { Radio, Space } from 'arco-design-solid';

const App = () => {
  return (
    <Space size={40}>
      <Radio>Radio</Radio>
      <Radio checked disabled>
        Disabled Radio
      </Radio>
    </Space>
  );
};

export default App;
