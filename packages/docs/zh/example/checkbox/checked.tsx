import { Checkbox, Button, Space } from 'arco-design-solid';
import { createSignal } from 'solid-js';

function App() {
  const [checked, setChecked] = createSignal(false);
  return (
    <div>
      <Space size={40}>
        <Checkbox checked={checked()}>Checkbox</Checkbox>
        <Checkbox checked={checked()} disabled>
          disabled Checkbox
        </Checkbox>
      </Space>
      <div style={{ 'margin-top': '30px' }}>
        <Button
          type="primary"
          onClick={() => {
            setChecked(!checked());
          }}
        >
          {checked() ? 'unCheck' : 'Check'}
        </Button>
      </div>
    </div>
  );
}

export default App;
