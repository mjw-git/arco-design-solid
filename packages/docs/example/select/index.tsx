import { CheckBox, Radio, Select } from 'arco-design-solid';
import { createSignal } from 'solid-js';

const Index = () => {
  const [value, setValue] = createSignal(true);
  return (
    <div>
      <CheckBox
        checked={value()}
        onChange={e => {
          setValue(e.target.checked);
        }}
      >
        开关
      </CheckBox>
      {value() && <Select />}
    </div>
  );
};
export default Index;
