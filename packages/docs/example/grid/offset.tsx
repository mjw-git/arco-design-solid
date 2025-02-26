import { Grid } from 'arco-design-solid';
import './index.less';

const { Row, Col } = Grid;

const Index = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col offset={6} span={6}>
        <div class="sld-col-demo-container-2">2</div>
      </Col>

      <Col offset={6} span={6}>
        <div class="sld-col-demo-container-2">4</div>
      </Col>
      <Col span={6}>
        <div class="sld-col-demo-container">5</div>
      </Col>
      <Col span={6}>
        <div class="sld-col-demo-container-2">6</div>
      </Col>
      <Col span={6}>
        <div class="sld-col-demo-container">7</div>
      </Col>
      <Col span={6}>
        <div class="sld-col-demo-container-2">8</div>
      </Col>
    </Row>
  );
};
export default Index;
