import { CheckBox, FlexBox } from 'arco-design-solid';

const Disabled = () => {
  return (
    <FlexBox>
      <CheckBox disabled checked>
        选项1
      </CheckBox>
      <CheckBox disabled>选项1</CheckBox>
      <CheckBox disabled indeterminate>
        选项2
      </CheckBox>
    </FlexBox>
  );
};
export default Disabled;
