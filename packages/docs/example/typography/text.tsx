import { Typography } from 'arco-design-solid';

const Test = () => {
  return (
    <Typography>
      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text>Arco Design</Typography.Text>
      </div>
      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="secondary">Secondary</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="primary">Primary</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="success">Success</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="warning">Warning</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text type="error">Error</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text bold>Bold</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text disabled>Disabled</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text mark>Mark</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text underline>Underline</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text delete>Line through</Typography.Text>
      </div>

      <div style={{ 'margin-bottom': '10px' }}>
        <Typography.Text code>Code snippet</Typography.Text>
      </div>
    </Typography>
  );
};
export default Test;
