import { Switch, Space } from 'arco-design-solid';
import { IconCheck, IconClose } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size="large">
      <Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} defaultChecked />
      <Switch
        type="round"
        checkedIcon={<IconCheck />}
        uncheckedIcon={<IconClose />}
        defaultChecked
      />
      <Switch
        type="line"
        checkedIcon={<IconCheck />}
        uncheckedIcon={<IconClose />}
        defaultChecked
      />
    </Space>
  );
};

export default App;
