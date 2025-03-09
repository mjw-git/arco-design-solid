import { Link, Space } from 'arco-design-solid';
import { IconCode } from 'arco-solid-icon';
const Test = () => {
  return (
    <Space>
      <Link icon href="#">
        Hyperlinks
      </Link>
      <Link href="#" icon disabled>
        Hyperlinks
      </Link>
      <Link href="#" icon={<IconCode />}>
        Hyperlinks
      </Link>
    </Space>
  );
};
export default Test;
