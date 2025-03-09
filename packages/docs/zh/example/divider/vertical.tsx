import { Divider, Typography } from 'arco-design-solid';
const { Text } = Typography;
import './index.less';
const App = () => {
  return (
    <div class="divider-demo">
      <Text>Item 1</Text>
      <Divider type="vertical">11</Divider>
      <Text>Item 2</Text>
      <Divider type="vertical" />
      <Text>Item 3</Text>
    </div>
  );
};

export default App;
