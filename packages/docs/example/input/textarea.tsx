import { FlexBox, Input } from 'arco-design-solid';
const TextArea = () => {
  return (
    <FlexBox>
      <Input.TextArea disabled maxLength={20} rows={4} showCount placeholder="maxLength 20" />
      <Input.TextArea
        readOnly
        defaultValue="1111"
        maxLength={20}
        rows={4}
        showCount
        placeholder="maxLength 20"
      />
    </FlexBox>
  );
};
export default TextArea;
