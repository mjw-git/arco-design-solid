import { Link, FlexBox } from 'arco-design-solid';
import { IconCode } from 'arco-solid-icon';
const Test = () => {
  return (
    <FlexBox>
      <Link icon href="#">
        Hyperlinks
      </Link>
      <Link href="#" icon disabled>
        Hyperlinks
      </Link>
      <Link href="#" icon={<IconCode />}>
        Hyperlinks
      </Link>
    </FlexBox>
  );
};
export default Test;
