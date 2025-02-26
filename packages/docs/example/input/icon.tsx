import { Copy, Success } from 'arco-solid-icon';
import { FlexBox, Input } from 'arco-design-solid';
const Basic = () => {
  return (
    <FlexBox direction="column">
      <Input prefixIcon={<Copy />} placeholder="请输入" />
      <Input suffixIcon={<Success />} allowClear placeholder="请输入" />
    </FlexBox>
  );
};
export default Basic;
