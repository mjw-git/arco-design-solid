import { Link, Space } from 'arco-design-solid';
const Test = () => {
  return (
    <Space>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </Space>
  );
};
export default Test;
