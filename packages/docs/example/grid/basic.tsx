import { Grid } from 'arco-design-solid';
import './index.less';
const { Row, Col } = Grid;
const Index = () => {
  return (
    <Row>
      <Col span={6} class="sld-col-demo-container">
        1
      </Col>
      <Col span={6} class="sld-col-demo-container-2">
        2
      </Col>
      <Col span={6} class="sld-col-demo-container">
        3
      </Col>
      <Col span={6} class="sld-col-demo-container-2">
        4
      </Col>
      <Col span={6} class="sld-col-demo-container">
        5
      </Col>
      <Col span={6} class="sld-col-demo-container-2">
        6
      </Col>
      <Col span={6} class="sld-col-demo-container">
        7
      </Col>
      <Col span={6} class="sld-col-demo-container-2">
        8
      </Col>
    </Row>
  );
};
export default Index;
