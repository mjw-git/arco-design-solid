import { Switch, Space } from 'arco-design-solid';
import { IconCheck, IconClose } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size="large">
      <Switch checkedText="ON" uncheckedText="OFF" />
      <Switch checkedText="1" uncheckedText="0" type="round" defaultChecked />
      <Switch checkedText={<IconCheck />} uncheckedText={<IconClose />} defaultChecked />
    </Space>
  );
};

export default App;
