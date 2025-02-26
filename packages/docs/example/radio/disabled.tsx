import { FlexBox, Radio } from 'arco-design-solid';
const Disabled = () => {
  return (
    <FlexBox>
      <Radio checked disabled>
        选项1
      </Radio>
      <Radio disabled>选项2</Radio>
    </FlexBox>
  );
};
export default Disabled;
