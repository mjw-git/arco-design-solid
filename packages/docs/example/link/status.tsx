import { Link, Space } from 'arco-design-solid';
const Test = () => {
  return (
    <Space>
      <Link status="error" href="#">
        Error
      </Link>
      <Link status="warning" href="#">
        Warning
      </Link>
      <Link status="success" href="#">
        Success
      </Link>
      <Link status="error" disabled href="#">
        Error
      </Link>
      <Link status="warning" disabled href="#">
        Warning
      </Link>
      <Link status="success" disabled href="#">
        Success
      </Link>
    </Space>
  );
};
export default Test;
