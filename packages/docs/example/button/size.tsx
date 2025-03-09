import { Button, Space } from 'arco-design-solid';
import { IconDelete } from 'arco-solid-icon';

const Test = () => {
  return (
    <Space align="center">
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
    </Space>
  );
};
export default Test;
