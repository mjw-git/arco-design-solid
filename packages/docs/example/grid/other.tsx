import { Grid } from 'arco-design-solid';
const Row = Grid.Row;
const Col = Grid.Col;

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row class="grid-demo">
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Col
        </Col>
      </Row>
    </div>
  );
};

export default App;
