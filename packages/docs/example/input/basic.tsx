import { Input, message } from 'arco-design-solid';
import { createSignal } from 'solid-js';
const Basic = () => {
  const [value, setValue] = createSignal('');
  const handleBlur = (msg: string, e: FocusEvent) => {
    message.success(msg);
    console.log(e);
  };
  return (
    <Input
      onBlur={[handleBlur, '额外参数']}
      value={value()}
      onChange={e => {
        console.log(e, '=====');
        setValue(e.target.value);
      }}
      allowClear
      defaultValue="默认值"
      placeholder="请输入"
    />
  );
};
export default Basic;
