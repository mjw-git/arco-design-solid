import { Button, FlexBox } from 'arco-design-solid';
import { IconDelete } from 'arco-solid-icon';
import 'arco-design-solid/es/button/style';
const Test = () => {
  return (
    <FlexBox>
      <Button type="primary" icon={<IconDelete />} />
      <Button type="secondary" icon={<IconDelete />}>
        Secondary Button
      </Button>
    </FlexBox>
  );
};
export default Test;
