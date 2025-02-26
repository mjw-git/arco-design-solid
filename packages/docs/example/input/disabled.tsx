import { FlexBox, Input } from 'arco-design-solid';
const Disabled = () => {
  return (
    <FlexBox>
      <Input style={{ width: '200px' }} disabled defaultValue="默认值" placeholder="请输入" />
      <Input allowClear disabled style={{ width: '200px' }} placeholder="请输入" />
    </FlexBox>
  );
};
export default Disabled;
