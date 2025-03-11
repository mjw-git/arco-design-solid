import { Trigger, Button, Input, Typography, Space } from 'arco-design-solid';

function Popup() {
  return (
    <div class="demo-trigger-popup" style={{ width: '300px' }}>
      1111
    </div>
  );
}

function App() {
  return (
    <Space style={{ width: '1000px', overflow: 'auto' }} size={40}>
      {/* <Trigger
        popup={() => <Popup />}
        mouseEnterDelay={400}
        mouseLeaveDelay={400}
        position="bottom"
      >
        <Typography.Text style={{ 'margin-right': '20px' }}>Hover me</Typography.Text>
      </Trigger> */}
      <Trigger popup={() => <Popup />} trigger="click" position="bottom" classNames="zoomInTop">
        <Button>Click me</Button>
      </Trigger>

      {/* <Trigger popup={() => <Popup />} trigger="focus" position="top" classNames="zoomInBottom">
        <Input style={{ width: '200px' }} placeholder="Focus on me" />
      </Trigger> */}
    </Space>
  );
}

export default App;
