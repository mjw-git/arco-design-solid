import { Checkbox, Space, Typography } from 'arco-design-solid';
import './index.less';
import { createSignal } from 'solid-js';
const App = () => {
  const [value, setValue] = createSignal([1, 2]);
  return (
    <div>
      <Checkbox.Group value={value()} onChange={e => setValue(e)}>
        {[1, 2].map(item => {
          return (
            <Checkbox value={item}>
              {({ checked }) => {
                return (
                  <Space
                    align="start"
                    class={`custom-checkbox-card ${checked() ? 'custom-checkbox-card-checked' : ''}`}
                  >
                    <div class="custom-checkbox-card-mask">
                      <div class="custom-checkbox-card-mask-dot"></div>
                    </div>
                    <div>
                      <div class="custom-checkbox-card-title">Checkbox Card {item}</div>
                      <Typography.Text type="secondary">this is a text</Typography.Text>
                    </div>
                  </Space>
                );
              }}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    </div>
  );
};

export default App;
