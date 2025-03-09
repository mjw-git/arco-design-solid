import { Button, Space } from 'arco-design-solid';

const Test = () => {
  return (
    <Space align="center" wrap>
      <Button status="warning" disabled type="primary">
        Warning
      </Button>
      <Button status="success" disabled type="primary">
        Success
      </Button>
      <Button status="danger" disabled type="primary">
        Danger
      </Button>
      <Button status="warning" disabled type="secondary">
        Warning
      </Button>
      <Button status="success" disabled type="secondary">
        Success
      </Button>
      <Button status="danger" disabled type="secondary">
        Danger
      </Button>
      <Button status="warning" disabled type="outline">
        Warning
      </Button>
      <Button status="success" disabled type="outline">
        Warning
      </Button>
      <Button status="danger" disabled type="outline">
        Danger
      </Button>
      <Button status="warning" disabled type="text">
        Warning
      </Button>
      <Button status="success" disabled type="text">
        Success
      </Button>
      <Button status="danger" disabled type="text">
        Danger
      </Button>
      <Button status="warning" disabled type="dashed">
        Warning
      </Button>
      <Button status="success" disabled type="dashed">
        Success
      </Button>
      <Button status="danger" disabled type="dashed">
        Danger
      </Button>
    </Space>
  );
};
export default Test;
