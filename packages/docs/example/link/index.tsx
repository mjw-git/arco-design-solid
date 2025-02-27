import { Link, FlexBox } from 'arco-design-solid';
const Test = () => {
  return (
    <FlexBox>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </FlexBox>
  );
};
export default Test;
