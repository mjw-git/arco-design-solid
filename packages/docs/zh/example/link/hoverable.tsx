import { Link, Space } from 'arco-design-solid';
const Test = () => {
  return (
    <Space>
      <Link hoverable={false} status="error" href="#">
        Error
      </Link>
      <Link hoverable={false} status="warning" href="#">
        Warning
      </Link>
      <Link hoverable={false} status="success" href="#">
        Success
      </Link>
      <Link hoverable={false} status="error" disabled href="#">
        Error
      </Link>
      <Link hoverable={false} status="warning" disabled href="#">
        Warning
      </Link>
      <Link hoverable={false} status="success" disabled href="#">
        Success
      </Link>
    </Space>
  );
};
export default Test;
