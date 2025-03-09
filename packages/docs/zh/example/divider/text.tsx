import { Divider, Typography } from 'arco-design-solid';
const { Paragraph } = Typography;
const orientations = ['left', 'center', 'right'] as const;
import './index.less';
const App = () => {
  return (
    <div class="divider-demo">
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider orientation={orientations[0]}>Text</Divider>
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider orientation={orientations[1]}>Text</Divider>
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider orientation={orientations[2]}>Text</Divider>
    </div>
  );
};

export default App;
