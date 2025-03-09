import { Button, Space } from 'arco-design-solid';
import { IconDelete } from 'arco-solid-icon';
const Test = () => {
  return (
    <Space>
      <Button type="primary" icon={<IconDelete />} />
      <Button type="secondary" icon={<IconDelete />}>
        Secondary Button
      </Button>
    </Space>
  );
};
export default Test;
