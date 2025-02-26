import { Button, FlexBox, message } from 'arco-design-solid';

const Duration = () => {
  return (
    <FlexBox>
      <Button
        type="primary"
        onClick={() => {
          message.success('success', {
            duration: 5000,
          });
        }}
      >
        success
      </Button>
      <Button
        type="primary"
        onClick={() => {
          message.warn('warning', {
            duration: 4000,
          });
        }}
      >
        warn
      </Button>
      <Button
        type="danger"
        onClick={() => {
          message.error('error thing', {
            duration: 6000,
          });
        }}
      >
        error
      </Button>
    </FlexBox>
  );
};
export default Duration;
