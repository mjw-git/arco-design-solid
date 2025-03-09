import { Grid, Typography } from 'arco-design-solid';
const Row = Grid.Row;
const Col = Grid.Col;
const rowStyle = {
  'margin-bottom': '40px',
  'background-color': 'var(--color-fill-2)',
};
const titleStyle = {
  'font-size': '12px',
  color: '#141f33',
};

const App = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <Typography.Text>垂直顶部对齐</Typography.Text>
      </p>
      <Row class="grid-demo" align="start" style={rowStyle}>
        <Col span={6} style={{ height: '90px', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48px', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120px', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60px', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <Typography.Text>垂直居中对齐</Typography.Text>
      </p>
      <Row class="grid-demo" align="center" style={rowStyle}>
        <Col span={6} style={{ height: '90px', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48px', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120px', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60px', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <p style={titleStyle}>
        <Typography.Text>垂直底部对齐</Typography.Text>
      </p>
      <Row class="grid-demo" align="end" style={rowStyle}>
        <Col span={6} style={{ height: '90px', 'line-height': '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '48px', 'line-height': '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '120px', 'line-height': '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: '60px', 'line-height': '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
