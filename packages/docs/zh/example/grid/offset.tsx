import { Grid } from 'arco-design-solid';
const Row = Grid.Row;
const Col = Grid.Col;
import './index.less';
const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row
        class="grid-demo"
        style={{ 'margin-bottom': '16px', 'background-color': 'var(--color-fill-2)' }}
      >
        <Col span={8}>col - 8</Col>
        <Col span={8} offset={8}>
          col - 8 | offset - 8
        </Col>
      </Row>
      <Row
        class="grid-demo"
        style={{ 'margin-bottom': '16px', 'background-color': 'var(--color-fill-2)' }}
      >
        <Col span={6} offset={8}>
          col - 6 | offset - 8
        </Col>
        <Col span={6} offset={4}>
          col - 6 | offset - 4
        </Col>
      </Row>
      <Row class="grid-demo" style={{ 'background-color': 'var(--color-fill-2)' }}>
        <Col span={12} offset={8}>
          col - 12 | offset - 8
        </Col>
      </Row>
    </div>
  );
};

export default App;
