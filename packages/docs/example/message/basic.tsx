import { Button, FlexBox, message } from 'arco-design-solid';

const Basic = () => {
  return (
    <FlexBox>
      <Button
        type="primary"
        onClick={() => {
          message.success('success');
        }}
      >
        success
      </Button>
      <Button
        type="primary"
        onClick={() => {
          message.warn('warning');
        }}
      >
        warn
      </Button>
      <Button
        type="danger"
        onClick={() => {
          message.error('error thing');
        }}
      >
        error
      </Button>
      <Button
        type="ghost"
        onClick={() => {
          message.info('info thing');
        }}
      >
        info
      </Button>
    </FlexBox>
  );
};
export default Basic;
