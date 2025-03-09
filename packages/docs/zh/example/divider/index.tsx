import { Typography, Divider } from 'arco-design-solid';
const { Paragraph } = Typography;
import './index.less';
const Test = () => {
  return (
    <div class="divider-demo">
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider />
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider
        style={{
          'border-bottom-style': 'dashed',
        }}
      />
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider
        style={{
          'border-bottom-width': '2px',
          'border-bottom-style': 'dotted',
        }}
      />
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider class="half-divider" />
    </div>
  );
};
export default Test;
