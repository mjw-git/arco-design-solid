import { Radio, Button, Space, Typography } from 'arco-design-solid';
import './index.less';
const App = () => {
  return (
    <div>
      <div style={{ 'margin-bottom': '20px' }}>
        <Radio.Group defaultValue={'Beijing'} name="button-radio-group">
          {['Beijing', 'Shanghai', 'Guangzhou'].map(item => {
            return (
              <Radio value={item}>
                {props => {
                  return (
                    <Button
                      tabIndex={-1}
                      shape="round"
                      type={props.checked() ? 'primary' : 'secondary'}
                    >
                      {item}
                    </Button>
                  );
                }}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
      <Radio.Group name="card-radio-group">
        {[1, 2].map(item => {
          return (
            <Radio value={item}>
              {({ checked }) => {
                return (
                  <Space
                    align="start"
                    class={`custom-radio-card ${checked() ? 'custom-radio-card-checked' : ''}`}
                  >
                    <div class="custom-radio-card-mask">
                      <div class="custom-radio-card-mask-dot"></div>
                    </div>
                    <div>
                      <div class="custom-radio-card-title">Radio Card {item}</div>
                      <Typography.Text type="secondary">this is a text</Typography.Text>
                    </div>
                  </Space>
                );
              }}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default App;
