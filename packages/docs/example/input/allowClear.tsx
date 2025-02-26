import { Input, message } from 'arco-design-solid';
import { createSignal } from 'solid-js';
const Basic = () => {
  const [value, setValue] = createSignal('123456');
  return (
    <Input
      allowClear
      value={value()}
      onChange={e => {
        message.success('onChange');
        setValue(e.target.value);
      }}
      placeholder="请输入"
    />
  );
};
export default Basic;
