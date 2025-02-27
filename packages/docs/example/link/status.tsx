import { Link, FlexBox } from 'arco-design-solid';
const Test = () => {
  return (
    <FlexBox>
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
    </FlexBox>
  );
};
export default Test;
