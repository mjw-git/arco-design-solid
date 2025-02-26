import { Button, FlexBox } from 'arco-design-solid';
import { IconDelete } from 'arco-solid-icon';

const Test = () => {
  return (
    <FlexBox align="center">
      <Button size="mini" type="primary">
        Mini
      </Button>
      <Button size="mini" icon={<IconDelete />} type="primary"></Button>
      <Button size="small" type="primary">
        Small
      </Button>
      <Button size="default">Default</Button>
      <Button icon={<IconDelete />} type="primary"></Button>
      <Button size="large">Large</Button>
    </FlexBox>
  );
};
export default Test;
