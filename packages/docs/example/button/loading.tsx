import { Button, Space } from 'arco-design-solid';
import { createSignal } from 'solid-js';
const Test = () => {
  const [loading, setLoading] = createSignal(false);
  return (
    <Space align="center">
      <Button
        type="primary"
        loading={loading()}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
      >
        Click it
      </Button>
      <Button loading type="primary">
        Success
      </Button>

      <Button loading type="secondary">
        Warning
      </Button>
      <Button status="success" loading type="secondary">
        Success
      </Button>
      <Button status="danger" loading type="secondary">
        Danger
      </Button>
      <Button status="warning" loading type="outline">
        Warning
      </Button>
      <Button status="success" loading type="outline">
        Warning
      </Button>
      <Button status="danger" loading type="outline">
        Danger
      </Button>
      <Button status="warning" loading type="text">
        Warning
      </Button>
      <Button status="success" loading type="text">
        Success
      </Button>
      <Button status="danger" loading type="text">
        Danger
      </Button>
      <Button status="warning" loading type="dashed">
        Warning
      </Button>
      <Button status="success" loading type="dashed">
        Success
      </Button>
      <Button status="danger" loading type="dashed">
        Danger
      </Button>
      <Button status="danger" loading shape="circle" type="dashed"></Button>
      <Button status="danger" loading shape="circle" type="dashed" size="mini"></Button>
    </Space>
  );
};
export default Test;
