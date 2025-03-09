import { Space, Radio } from 'arco-design-solid';
const Disabled = () => {
  return (
    <Space>
      <Radio checked disabled>
        选项1
      </Radio>
      <Radio disabled>选项2</Radio>
    </Space>
  );
};
export default Disabled;
