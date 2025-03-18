import { Dropdown, Button, Space } from 'arco-design-solid';
import { IconDown } from 'arco-solid-icon';
import { createSignal } from 'solid-js';
const style = {
  border: '1px solid var(--color-fill-3)',
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  padding: '12px',
  'border-radius': '4px',
};
const Demo = () => {
  const [visible, setVisible] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  return (
    <Space class="dropdown-demo">
      <span
        onClick={() => {
          setLoading(!loading());
        }}
      >
        11
      </span>
      <Button loading={loading()}>111{loading() ? 1 : 2}</Button>
      {/* <Dropdown
        trigger="hover"
        onVisibleChange={v => {
          console.log(v);
          setVisible(v);
        }}
        popupVisible={visible()}
        customRender={
          <div
            onClick={() => {
              setVisible(false);
            }}
            style={style}
          >
            custom Render
          </div>
        }
      >
        <Button type="text">
          Hover <IconDown />
        </Button>
      </Dropdown> */}
      {/* <Dropdown
        items={[
          {
            label: 'Item 1',
            key: '1',

            onClick: () => {
              console.log(9999);
            },
          },
          {
            label: 'Item 2',
            key: '2',
            disabled: true,
            onClick: () => {
              console.log(9999);
            },
          },
        ]}
        trigger="click"
      >
        <Button type="text">
          Click <IconDown />
        </Button>
      </Dropdown> */}
    </Space>
  );
};
export default Demo;
