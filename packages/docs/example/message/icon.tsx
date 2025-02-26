import { Copy } from 'arco-solid-icon';
import { Button, FlexBox, message } from 'arco-design-solid';

const Icon = () => {
  return (
    <FlexBox>
      <Button
        type="primary"
        onClick={() => {
          message.success('success', {
            icon: <Copy />,
          });
        }}
      >
        success
      </Button>
    </FlexBox>
  );
};
export default Icon;
