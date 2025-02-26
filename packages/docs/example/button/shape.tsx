import { Button, FlexBox } from 'arco-design-solid';
import { IconDelete } from 'arco-solid-icon';

const Test = () => {
  return (
    <FlexBox>
      <Button type="primary" icon={<IconDelete />} />
      <Button shape="circle" type="primary" icon={<IconDelete />} />
      <Button shape="round" type="secondary" icon={<IconDelete />}>
        Secondary Button
      </Button>
    </FlexBox>
  );
};
export default Test;
