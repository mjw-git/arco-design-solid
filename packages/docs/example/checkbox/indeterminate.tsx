import { CheckBox, FlexBox } from 'arco-design-solid';

const Indeterminate = () => {
  return (
    <FlexBox>
      <CheckBox indeterminate disabled>
        选项1
      </CheckBox>
      <CheckBox indeterminate>选项2</CheckBox>
    </FlexBox>
  );
};
export default Indeterminate;
