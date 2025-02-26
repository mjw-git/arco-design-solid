import { Button, FlexBox } from 'arco-design-solid';
import { IconDelete } from 'arco-solid-icon';

const Test = () => {
  return (
    <FlexBox align="center">
      <Button status="warning" type="primary">
        Warning
      </Button>
      <Button status="success" type="primary">
        Success
      </Button>
      <Button status="danger" type="primary">
        Danger
      </Button>
      <Button status="warning" type="secondary">
        Warning
      </Button>
      <Button status="success" type="secondary">
        Success
      </Button>
      <Button status="danger" type="secondary">
        Danger
      </Button>
      <Button status="warning" type="outline">
        Warning
      </Button>
      <Button status="success" type="outline">
        Warning
      </Button>
      <Button status="danger" type="outline">
        Danger
      </Button>
      <Button status="warning" type="text">
        Warning
      </Button>
      <Button status="success" type="text">
        Success
      </Button>
      <Button status="danger" type="text">
        Danger
      </Button>
      <Button status="warning" type="dashed">
        Warning
      </Button>
      <Button status="success" type="dashed">
        Success
      </Button>
      <Button status="danger" type="dashed">
        Danger
      </Button>
    </FlexBox>
  );
};
export default Test;
