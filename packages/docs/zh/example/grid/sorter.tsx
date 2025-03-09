import { Grid } from 'arco-design-solid';
const Row = Grid.Row;
const Col = Grid.Col;

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row
        class="grid-demo"
        style={{ 'margin-bottom': '16px', 'background-color': 'var(--color-fill-2)' }}
      >
        <Col span={8} push={16}>
          col - 8 | push - 16
        </Col>
        <Col span={16} pull={8}>
          col - 16 | pull - 8
        </Col>
      </Row>
    </div>
  );
};

export default App;
